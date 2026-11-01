#!/usr/bin/env node
/**
 * Tonic UI CDN cold-load benchmark.
 * Measures actual browser HTTP requests with Chrome DevTools Protocol (CDP).
 * No guessed request counts or sizes. Uses Node >=20 and playwright.
 *
 * Run from Tonic UI repository root:
 *   node /path/to/benchmark.mjs --bundle ./packages/react/dist/standalone/index.min.js
 * Optional: --repeats 3 --output ./tonic-cdn-benchmark-report.html
 */
import { createServer } from 'node:http';
import { readFile, writeFile, stat } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';

const argv = process.argv.slice(2);
function option(flag, fallback) {
  const i = argv.indexOf(flag);
  return i < 0 ? fallback : (argv[i + 1] ?? fallback);
}
const bundleFile = resolve(option('--bundle', './packages/react/dist/standalone/index.min.js'));
const tonicUrl = option('--tonic-url', '').trim();
const outFile = resolve(option('--output', './tonic-cdn-benchmark-report.html'));
const jsonFile = outFile.replace(/\.html?$/i, '') + '.json';
const repeats = Math.max(1, Math.min(10, Number(option('--repeats', '3')) || 3));
const timeoutMs = Math.max(15000, Number(option('--timeout', '120000')) || 120000);
const reactVersion = option('--react', '19.2.7');
const emotionReact = option('--emotion-react', '11.14.0');
const emotionStyled = option('--emotion-styled', '11.14.1');
const emotionPropValid = option('--emotion-prop-valid', '1.2.2');

// One React instance and one Emotion instance, as the integration guide documents.
const peers = {
  react: `https://esm.sh/react@${reactVersion}`,
  'react/jsx-runtime': `https://esm.sh/react@${reactVersion}/jsx-runtime`,
  'react/jsx-dev-runtime': `https://esm.sh/react@${reactVersion}/jsx-dev-runtime`,
  'react-dom': `https://esm.sh/react-dom@${reactVersion}?external=react`,
  'react-dom/client': `https://esm.sh/react-dom@${reactVersion}/client?external=react`,
  '@emotion/react': `https://esm.sh/@emotion/react@${emotionReact}?external=react`,
  '@emotion/react/jsx-runtime': `https://esm.sh/@emotion/react@${emotionReact}/jsx-runtime?external=react`,
  '@emotion/react/jsx-dev-runtime': `https://esm.sh/@emotion/react@${emotionReact}/jsx-dev-runtime?external=react`,
  '@emotion/styled': `https://esm.sh/@emotion/styled@${emotionStyled}?external=react`,
  '@emotion/styled/base': `https://esm.sh/@emotion/styled@${emotionStyled}/base?external=react`,
  '@emotion/is-prop-valid': `https://esm.sh/@emotion/is-prop-valid@${emotionPropValid}`,
};

// The four approaches documented in
// packages/react-docs/pages/integrations/esm-cdn-with-fallback/index.page.mdx.
// Every page mounts a Box and a Button, so the measured graph is the one an
// application fetches, not only the entry module.
const cases = [
  {
    id: 'esm-default',
    label: 'esm.sh — plain URL, no import map',
    imports: null,
    specs: {
      react: `https://esm.sh/react@${reactVersion}`,
      'react-dom/client': `https://esm.sh/react-dom@${reactVersion}/client`,
      tonic: 'https://esm.sh/@tonic-ui/react@3.0.0-alpha.1',
    },
  },
  {
    id: 'esm-standalone',
    label: 'esm.sh — ?standalone&external=react,react-dom with an import map',
    specs: { react: 'react', 'react-dom/client': 'react-dom/client', tonic: '@tonic-ui/react' },
    imports: {
      ...peers,
      '@tonic-ui/react': 'https://esm.sh/@tonic-ui/react@3.0.0-alpha.1?standalone&external=react,react-dom',
    },
  },
  {
    id: 'jsdelivr',
    label: 'jsDelivr — +esm with an import map',
    specs: { react: 'react', 'react-dom/client': 'react-dom/client', tonic: '@tonic-ui/react' },
    imports: {
      react: `https://cdn.jsdelivr.net/npm/react@${reactVersion}/+esm`,
      'react-dom/client': `https://cdn.jsdelivr.net/npm/react-dom@${reactVersion}/client/+esm`,
      '@tonic-ui/react': 'https://cdn.jsdelivr.net/npm/@tonic-ui/react@3.0.0-alpha.1/+esm',
    },
  },
  {
    id: 'tonic-local',
    label: 'Tonic UI standalone file from the application origin with an import map',
    specs: { react: 'react', 'react-dom/client': 'react-dom/client', tonic: '@tonic-ui/react' },
    imports: { ...peers, '@tonic-ui/react': tonicUrl || '/tonic-standalone.js' },
  },
];

let localBytes = null;
let bundlePackageVersion = null;
try {
  localBytes = await readFile(bundleFile);
  const pkg = JSON.parse(await readFile(resolve(dirname(dirname(dirname(bundleFile))), 'package.json'), 'utf8'));
  bundlePackageVersion = pkg.version;
  if (pkg.name !== '@tonic-ui/react' || pkg.version !== '3.0.0-alpha.1') {
    console.warn(`WARNING: local bundle package version is ${pkg.name}@${pkg.version}, not @tonic-ui/react@3.0.0-alpha.1. This is not a version-matched comparison.`);
  }
} catch (e) {
  if (!tonicUrl) {
    console.error(`Missing local Tonic UI bundle: ${bundleFile}`);
    console.error('Build the Tonic UI standalone artifact first, or supply a deployed --tonic-url.');
    process.exit(1);
  }
  console.log('No local standalone file available; using the deployed URL for baseline.');
}

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  try { ({ chromium } = await import('@playwright/test')); }
  catch { try { ({ chromium } = await import('playwright-core')); } catch {
    console.error('Playwright not installed in this script’s module resolution path. Install: npm install -D playwright && npx playwright install chromium');
    process.exit(1);
  } }
}

function htmlFor(test) {
  const importMap = test.imports
    ? `<script type="importmap">${JSON.stringify({ imports: test.imports }).replace(/</g, '\\u003c')}</script>`
    : '';
  return `<!doctype html><html><head><meta charset="utf-8"/>${importMap}</head><body><div id="root"></div>
<script>
  window.__cdnBenchmark = { stage: 'start' };
  window.addEventListener('error', event => {
    window.__cdnBenchmarkError = String(event.message || event.error || 'Unknown error');
  });
</script>
<script type="module">
  const out = { stage: 'start' };
  try {
    const React = await import(${JSON.stringify(test.specs.react)});
    const { createRoot } = await import(${JSON.stringify(test.specs['react-dom/client'])});
    const TonicUI = await import(${JSON.stringify(test.specs.tonic)});
    const h = React.createElement;
    function App() {
      const [colorMode] = TonicUI.useColorMode();
      const [colorStyle] = TonicUI.useColorStyle({ colorMode });
      return h(TonicUI.Box, { p: '6x' },
        h(TonicUI.Button, {}, 'button ' + colorMode),
        h(TonicUI.Text, {}, colorStyle.background.secondary)
      );
    }
    createRoot(document.getElementById('root')).render(
      h(TonicUI.TonicProvider, { colorMode: { defaultValue: 'light' }, useCSSBaseline: true }, h(App))
    );
    await new Promise(resolve => setTimeout(resolve, 250));
    const root = document.getElementById('root');
    const box = root.firstElementChild;
    const button = root.querySelector('button');
    out.stage = root.childElementCount ? 'rendered' : 'mounted-without-dom';
    out.reactVersion = React.version;
    out.exports = Object.keys(TonicUI).length;
    out.boxPadding = box ? getComputedStyle(box).padding : null;
    out.buttonPadding = button ? getComputedStyle(button).padding : null;
  } catch (error) {
    out.stage = 'failed';
    out.error = String(error && error.message ? error.message : error);
  }
  window.__cdnBenchmark = out;
</script>
</body></html>`;
}

const server = createServer((req,res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  if (pathname === '/tonic-standalone.js') {
    res.writeHead(200, { 'Content-Type': 'text/javascript; charset=utf-8', 'Cache-Control': 'no-store', 'Access-Control-Allow-Origin': '*' });
    return localBytes ? res.end(localBytes) : res.end('No local bundle');
  }
  const test = cases.find(t => pathname === '/case/' + t.id);
  if (test) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
    return res.end(htmlFor(test));
  }
  res.writeHead(404);res.end('Not found');
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const origin = `http://127.0.0.1:${server.address().port}`;
let browser;
function isScript(req) {
  if (req.type === 'Script') return true;
  if (/javascript|ecmascript/i.test(req.mime || '')) return true;
  if (/\.(?:m?js)(?:[?#]|$)|\/\+esm(?:[?#]|$)|(?:esm\.sh|jsdelivr\.net)\//i.test(req.url || '')) return true;
  return false;
}
function classify(url) {
  if (/\/(@tonic-ui|npm\/@tonic-ui)\//.test(url) || /@tonic-ui\//.test(url) || url.includes('tonic-standalone.js')) return 'Tonic UI';
  if (/\/(?:react-dom|react)(?:@|\/)/.test(url) || /\/(?:npm\/)?(?:react-dom|react)@/.test(url)) return 'React';
  if (url.includes('@emotion/')) return 'Emotion';
  return 'Other dependencies';
}
function mean(xs) { return xs.reduce((a,b)=>a+b,0) / (xs.length||1); }
function median(xs) { const a=[...xs].sort((a,b)=>a-b); return a.length? a[Math.floor(a.length/2)]:0; }

async function benchmarkOne(test, index) {
  const context = await browser.newContext({ serviceWorkers:'block', ignoreHTTPSErrors:false });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send('Network.enable');
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
  await cdp.send('Network.setBypassServiceWorker', { bypass: true });
  const requests = [];
  const active = new Map();
  const bodies = [];
  const errors = [];
  page.on('pageerror', e => errors.push(String(e.message)));
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  cdp.on('Network.requestWillBeSent', ev => {
    if (ev.redirectResponse && active.has(ev.requestId)) {
      const prev = active.get(ev.requestId);
      prev.status = ev.redirectResponse.status;
      prev.mime = ev.redirectResponse.mimeType;
      prev.redirect = true;
      prev.end = ev.timestamp;
    }
    const record = {
      url: ev.request.url, method: ev.request.method, type: ev.type || '',
      start: ev.timestamp, end: null, status: null, mime: '', protocol: '',
      transferred: 0, decoded: null, failed: false,
      initiator: ev.initiator?.url || ev.initiator?.stack?.callFrames?.[0]?.url || '',
      fromCache: false, redirect: false,
    };
    requests.push(record);
    active.set(ev.requestId, record);
  });
  cdp.on('Network.responseReceived', ev => {
    const rec = active.get(ev.requestId);
    if (!rec) return;
    rec.status = ev.response.status;
    rec.mime = ev.response.mimeType;
    rec.protocol = ev.response.protocol;
    rec.fromCache = !!(ev.response.fromDiskCache || ev.response.fromPrefetchCache || ev.response.fromServiceWorker);
  });
  cdp.on('Network.loadingFinished', ev => {
    const rec = active.get(ev.requestId);
    if (!rec) return;
    rec.end = ev.timestamp;
    rec.transferred = ev.encodedDataLength || 0;
    if (isScript(rec)) {
      // Decoded body bytes represent full uncompressed module size, not network bytes.
      const task = cdp.send('Network.getResponseBody', { requestId: ev.requestId }).then(reply => {
        rec.decoded = reply.base64Encoded ? Buffer.from(reply.body, 'base64').length : Buffer.byteLength(reply.body, 'utf8');
      }).catch(() => {});
      bodies.push(task);
    }
  });
  cdp.on('Network.loadingFailed', ev => {
    const rec = active.get(ev.requestId);
    if (rec) { rec.failed = true; rec.failureText = ev.errorText; rec.end = ev.timestamp; }
  });

  const started = Date.now();
  try {
    await page.goto(`${origin}/case/${test.id}?run=${index}`, { waitUntil:'domcontentloaded', timeout: timeoutMs });
    await page.waitForFunction(() => window.__cdnBenchmark?.stage !== 'start' || window.__cdnBenchmarkError, null, { timeout: timeoutMs });
    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(()=>{});
    await page.waitForTimeout(500);
  } catch (e) {
    errors.push('Benchmark timed out or navigation failed: ' + e.message);
  }
  const state = await page.evaluate(() => ({ ...window.__cdnBenchmark, moduleError:window.__cdnBenchmarkError || '' })).catch(()=>({state:'error'}));
  await Promise.allSettled(bodies);
  const js = requests.filter(isScript);
  const mainArtifact = js.find(r => test.id === 'esm-default' ? /\/react\.mjs(?:[?#]|$)/.test(r.url) : test.id === 'esm-standalone' ? /\/react\.bundle\.mjs(?:[?#]|$)/.test(r.url) : test.id === 'jsdelivr' ? /\/\+esm(?:[?#]|$)/.test(r.url) && r.url.includes('@tonic-ui/react@3.0.0-alpha.1') : (r.url === tonicUrl || r.url.includes('tonic-standalone.js') || /\/dist\/standalone\/index\.min\.js(?:[?#]|$)/.test(r.url)));
  const startTs = Math.min(...js.map(r=>r.start).filter(Number.isFinite));
  const endTs = Math.max(...js.map(r=>r.end ?? r.start).filter(Number.isFinite));
  const result = {
    caseId: test.id, label: test.label, run: index + 1,
    state, errors: [...new Set(errors)],
    durationMs: Date.now() - started,
    moduleSpanMs: Number.isFinite(startTs) && Number.isFinite(endTs) ? Math.round((endTs - startTs)*1000) : null,
    // A completed request URL counts once; redirects count as separate HTTP requests.
    requestCount: js.length,
    uniqueModuleUrls: new Set(js.map(r => r.url)).size,
    transferredBytes: js.reduce((n,r)=>n+r.transferred,0),
    mainBundleUrl: mainArtifact?.url ?? null,
    mainBundleTransferredBytes: mainArtifact?.transferred ?? null,
    mainBundleDecodedBytes: mainArtifact?.decoded ?? null,
    decodedBytes: js.reduce((n,r)=>n+(r.decoded ?? 0),0),
    missingDecodedCount: js.filter(r => r.decoded === null).length,
    groups: Object.fromEntries(['Tonic UI','React','Emotion','Other dependencies'].map(g => {
      const a=js.filter(r=>classify(r.url)===g);
      return [g,{requests:a.length,transferredBytes:a.reduce((n,r)=>n+r.transferred,0),decodedBytes:a.reduce((n,r)=>n+(r.decoded??0),0)}];
    })),
    requests: js.map(r => ({...r, startMs:Number.isFinite(startTs)?Math.round((r.start-startTs)*1000):0, durationMs:r.end == null?null:Math.max(0,Math.round((r.end-r.start)*1000)), group:classify(r.url)}))
  };
  console.log(`${test.label} #${index+1}: ${result.requestCount} JS requests (${result.uniqueModuleUrls} unique files); ${(result.transferredBytes/1024).toFixed(1)} KiB transferred; ${(result.decodedBytes/1024).toFixed(1)} KiB decoded; ${state.stage}${state.boxPadding ? ` (Box padding ${state.boxPadding})` : ''}; react ${state.reactVersion ?? '-'}; ${result.moduleSpanMs}ms module span`);
  await context.close();
  return result;
}

try {
  browser = await chromium.launch({ headless:true });
  const samples = [];
  // Alternate run order across repeats to reduce CDN edge warmup bias.
  for (let k=0; k<repeats; k++) {
    const ordered = k % 2 ? [...cases].reverse() : cases;
    for (const test of ordered) samples.push(await benchmarkOne(test, k));
  }
  const summary = cases.map(test => {
    const runs = samples.filter(s=>s.caseId===test.id);
    const valid = runs.filter(s => s.state.stage === 'rendered' && s.state.boxPadding && s.state.buttonPadding);
    const base = valid.length ? valid : runs;
    const med = key => median(base.map(r=>r[key]).filter(Number.isFinite));
    return {
      id:test.id,label:test.label,source:test.specs.tonic,okRuns:valid.length,totalRuns:runs.length,
      renders: valid.length ? 'yes' : 'no',
      renderError: valid.length ? null : [...new Set(runs.map(r => r.state.error || r.errors[0] || r.state.stage))].join(' | '),
      requests:med('requestCount'), uniqueUrls:med('uniqueModuleUrls'),
      transferredBytes:med('transferredBytes'),decodedBytes:med('decodedBytes'),
      mainBundleTransferredBytes:med('mainBundleTransferredBytes'),
      mainBundleDecodedBytes:med('mainBundleDecodedBytes'),
      moduleSpanMs:med('moduleSpanMs'),
      missingDecodedCount:med('missingDecodedCount'),
    };
  });
  const report = {
    metadata: { date:new Date().toISOString(), browser:browser.version(), repeats, origin,
      originalLocalBundle: bundleFile, baselineUrl:tonicUrl || null, bundlePackageVersion, localBundleFileBytes:localBytes?.length ?? null,
      reactVersion,emotionReact,emotionStyled,
      methodology: 'Isolated Chromium browser context per run; Chrome cache disabled + bypass service workers; HTML document excluded from JS counts; browser network includes all recursively fetched module requests and redirects. Transfer is CDP Network.loadingFinished.encodedDataLength, decoded is browser response-body byte length, module span is earliest request start to latest completion. No HTTP/2/H3 connection setup overhead accounted beyond transferred bytes.' },
    summary, samples,
  };
  await writeFile(jsonFile, JSON.stringify(report,null,2));
  await writeFile(outFile, await makeReport(report));
  console.log(`\nReport: ${outFile}\nRaw evidence: ${jsonFile}`);
} finally {
  await browser?.close();
  await new Promise(r=>server.close(r));
}

async function makeReport(report) {
  const template = await readFile(new URL('./comparison.html', import.meta.url), 'utf8');
  const evidence = JSON.stringify(report)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
  const marker = '/*__BENCHMARK_DATA__*/ null';
  if (!template.includes(marker)) throw Error('comparison.html: embedded-data marker not found');
  return template.replace(marker, evidence);
}
