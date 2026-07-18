import { _ as __vitePreload } from './preload-helper-B0aoDf8_.js';

const importCache = /* @__PURE__ */ new Map();
async function nodeImport(id) {
  if (!importCache.has(id)) importCache.set(id, import(
    /* @vite-ignore */
    id
  ));
  return importCache.get(id);
}
const runnerCache = /* @__PURE__ */ new Map();
async function getModuleRunnerModule() {
  try {
    return await __vitePreload(() => import('vite/module-runner'),true              ?[]:void 0);
  } catch {
    return null;
  }
}
async function getOrCreateRunner(remoteOrigin) {
  if (runnerCache.has(remoteOrigin)) return runnerCache.get(remoteOrigin);
  const promise = (async () => {
    const viteRunner = await getModuleRunnerModule();
    if (!viteRunner) return null;
    const { ModuleRunner, ESModulesEvaluator } = viteRunner;
    const runnerEndpoint = `${remoteOrigin}/__mf_runner__`;
    try {
      return new ModuleRunner({
        hmr: false,
        transport: { async invoke(payload) {
          return await (await fetch(runnerEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: payload.data.name,
              data: payload.data.data
            })
          })).json();
        } }
      }, new ESModulesEvaluator());
    } catch {
      return null;
    }
  })();
  runnerCache.set(remoteOrigin, promise);
  return promise;
}
const _path = () => nodeImport("path");
const _fs = () => nodeImport("fs");
const _crypto = () => nodeImport("crypto");
const _module = () => nodeImport("module");
const ssrEntryCache = /* @__PURE__ */ new Map();
const manifestFetchCache = /* @__PURE__ */ new Map();
var SsrEntryHttpError = class extends Error {
  constructor(url, status, statusText, bodyPreview) {
    super(`Failed to fetch SSR module "${url}": ${status} ${statusText}` + (bodyPreview ? `
preview: ${bodyPreview}` : ""));
    this.url = url;
    this.status = status;
    this.statusText = statusText;
    this.bodyPreview = bodyPreview;
    this.name = "SsrEntryHttpError";
  }
};
function getBodyPreview(body) {
  return body.slice(0, 240).replace(/\s+/g, " ").trim();
}
function isSsrEntryHttpError(error) {
  return error instanceof SsrEntryHttpError;
}
async function fetchManifest(manifestUrl) {
  try {
    const res = await fetch(manifestUrl);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
async function fetchManifestCached(manifestUrl) {
  if (!manifestFetchCache.has(manifestUrl)) manifestFetchCache.set(manifestUrl, fetchManifest(manifestUrl));
  return manifestFetchCache.get(manifestUrl);
}
function isManifestEntry(remoteEntryUrl) {
  try {
    const { pathname } = new URL(remoteEntryUrl);
    return /\.json$/i.test(pathname);
  } catch {
    return /\.json(?:[?#]|$)/i.test(remoteEntryUrl);
  }
}
function isSsrEntry(remoteEntryUrl) {
  return /\.ssr\.js(?:[?#].*)?$/.test(remoteEntryUrl);
}
function getManifestUrl(remoteEntryUrl) {
  if (isManifestEntry(remoteEntryUrl)) return remoteEntryUrl;
  return remoteEntryUrl.replace(/\/[^/]+$/, "/mf-manifest.json");
}
function getEntryFilename(entryUrl) {
  return entryUrl.split("/").pop()?.replace(/[?#].*$/, "").replace(/\.[^.]+$/, "") ?? "remoteEntry";
}
function resolveEntryAssetUrl(entry, manifestUrl) {
  const base = manifestUrl.replace(/\/[^/]+$/, "/");
  return new URL(`${entry.path || ""}${entry.name}`, base).href;
}
function resolveSSREntryUrl(manifest, manifestUrl) {
  const meta = manifest?.metaData;
  if (!meta?.ssrRemoteEntry?.name) return null;
  const base = manifestUrl.replace(/\/[^/]+$/, "/");
  const entryPath = (meta.ssrRemoteEntry.path || "") + meta.ssrRemoteEntry.name;
  return {
    url: new URL(entryPath, base).href,
    type: meta.ssrRemoteEntry.type || "module"
  };
}
async function headCheckSsrEntry(candidate) {
  try {
    const res = await fetch(candidate.url, { method: "HEAD" });
    const ct = res.headers.get("content-type") ?? "";
    if (res.ok && !ct.includes("text/html")) return candidate;
  } catch {
  }
  return null;
}
function resolveAssetBaseUrl(entryUrl, manifest, manifestUrl) {
  const remoteEntry = manifest?.metaData?.remoteEntry;
  if (remoteEntry?.name) return resolveEntryAssetUrl(remoteEntry, manifestUrl);
  if (!isManifestEntry(entryUrl)) return entryUrl;
  return new URL("remoteEntry.js", manifestUrl.replace(/\/[^/]+$/, "/")).href;
}
async function buildEntryContext(entryUrl) {
  const manifestUrl = getManifestUrl(entryUrl);
  const manifest = await fetchManifestCached(manifestUrl);
  const assetBaseUrl = resolveAssetBaseUrl(entryUrl, manifest, manifestUrl);
  return {
    entryUrl,
    manifestUrl,
    manifest,
    assetBaseUrl,
    filename: getEntryFilename(assetBaseUrl),
    remoteOrigin: assetBaseUrl.replace(/\/[^/]+$/, "")
  };
}
function buildSsrEntryCandidates(ctx, options = {}) {
  const { assetBaseUrl, filename, remoteOrigin } = ctx;
  const base = assetBaseUrl.replace(/\.[^.]+$/, "");
  const candidates = [];
  if (!options.skipServerBuild) candidates.push({
    url: `${remoteOrigin}/__mf_server__/${filename}.ssr.js`,
    type: "module"
  });
  candidates.push({
    url: `${base}.ssr.js`,
    type: "module"
  }, {
    url: `${remoteOrigin}/__mf_ssr__/${filename}.ssr.js`,
    type: "module"
  });
  return candidates;
}
async function resolveFirstReachableCandidate(candidates) {
  for (const candidate of candidates) {
    const hit = await headCheckSsrEntry(candidate);
    if (hit) return hit;
  }
  return null;
}
async function resolveSSREntryImpl(remoteEntryUrl) {
  if (isSsrEntry(remoteEntryUrl)) return {
    url: remoteEntryUrl,
    type: "module"
  };
  if (!isManifestEntry(remoteEntryUrl)) {
    const filename = getEntryFilename(remoteEntryUrl);
    const fromServerBuild = await headCheckSsrEntry({
      url: `${remoteEntryUrl.replace(/\/[^/]+$/, "")}/__mf_server__/${filename}.ssr.js`,
      type: "module"
    });
    if (fromServerBuild) return fromServerBuild;
  }
  const ctx = await buildEntryContext(remoteEntryUrl);
  if (ctx.manifest) {
    const fromManifest = resolveSSREntryUrl(ctx.manifest, ctx.manifestUrl);
    if (fromManifest) return fromManifest;
  }
  return resolveFirstReachableCandidate(buildSsrEntryCandidates(ctx, { skipServerBuild: !isManifestEntry(remoteEntryUrl) }));
}
async function getSSREntry(remoteEntryUrl) {
  if (!ssrEntryCache.has(remoteEntryUrl)) ssrEntryCache.set(remoteEntryUrl, resolveSSREntryImpl(remoteEntryUrl));
  return ssrEntryCache.get(remoteEntryUrl);
}
const tempFileCache = /* @__PURE__ */ new Map();
let ssrCacheDirPromise;
async function getSSRCacheDir() {
  if (!ssrCacheDirPromise) ssrCacheDirPromise = (async () => {
    const { join } = await _path();
    const { rmSync } = await _fs();
    const dir = join(process.cwd(), "node_modules", ".ssr-cache");
    process.once("exit", () => {
      try {
        rmSync(dir, {
          recursive: true,
          force: true
        });
      } catch {
      }
    });
    return dir;
  })();
  return ssrCacheDirPromise;
}
function transformSsrCode(code, base, sharedPkgMap) {
  code = code.replace(/((?:from|export\s*\*\s*from)\s*)(["'`])(\.\.?\/[^"'`\s][^"'`]*)["'`]/g, (_m, prefix, _q, specifier) => `${prefix}"${new URL(specifier, base).href}"`);
  code = code.replace(/(import\s*)(["'`])(\.\.?\/[^"'`\s][^"'`]*)["'`]/g, (_m, prefix, _q, specifier) => `${prefix}"${new URL(specifier, base).href}"`);
  code = code.replace(/(import\s*\(\s*)(["'`])(\.\.?\/[^"'`\s][^"'`]*)["'`](\s*\))/g, (_m, prefix, _q, specifier, suffix) => `${prefix}"${new URL(specifier, base).href}"${suffix}`);
  if (sharedPkgMap && sharedPkgMap.size > 0) code = code.replace(/(?:from|import\s*\()\s*(["'`])([^"'`./][^"'`]*)["'`]/g, (m, _q, specifier) => {
    const resolved = sharedPkgMap.get(specifier);
    return resolved ? m.replace(specifier, `file://${resolved}`) : m;
  });
  code = code.replace(/import\s*\{([^}]*)\}\s*from\s*["'][^"']*preload-helper[^"']*["'];?/g, (_m, bindings) => {
    return bindings.split(",").map((b) => {
      const parts = b.trim().split(/\s+as\s+/);
      return (parts[1] ?? parts[0]).trim();
    }).filter(Boolean).map((l) => `const ${l} = (fn) => fn();`).join("\n");
  });
  code = code.replace(/__vite__mapDeps\([^)]+\)/g, "[]");
  code = code.replace(/\b([A-Za-z_$][\w$]*)\s*\(\s*\(\s*\)\s*=>\s*import\(([^)]*)\)\s*,\s*\[\]\s*\)/g, "import($2)");
  return code;
}
function isVitePreloadHelperSpecifier(specifier) {
  return specifier.includes("preload-helper");
}
async function fetchEsmToTempFile(url, tmpDir, visited, sharedPkgMap) {
  if (visited.has(url)) return visited.get(url);
  if (tempFileCache.has(url)) return tempFileCache.get(url);
  const promise = (async () => {
    const res = await fetch(url);
    let code = await res.text();
    if (!res.ok) throw new SsrEntryHttpError(url, res.status, res.statusText, getBodyPreview(code));
    const base = url.replace(/\/[^/]*$/, "/");
    const relImports = [];
    const relRegex = /(?:from|export\s*\*\s*from|import\s*(?:\(|\s))\s*["'`]([^"'`\s]+)["'`]/g;
    let m;
    while ((m = relRegex.exec(code)) !== null) if ((m[1].startsWith("./") || m[1].startsWith("../")) && !isVitePreloadHelperSpecifier(m[1])) relImports.push(new URL(m[1], base).href);
    const subMap = /* @__PURE__ */ new Map();
    await Promise.all([...new Set(relImports)].filter((u) => u.startsWith("http://") || u.startsWith("https://")).map(async (u) => {
      const tmpPath = await fetchEsmToTempFile(u, tmpDir, visited, sharedPkgMap);
      subMap.set(u, `file://${tmpPath}`);
    }));
    code = transformSsrCode(code, base, sharedPkgMap);
    for (const [httpUrl, fileUrl] of subMap) code = code.split(httpUrl).join(fileUrl);
    const { createHash } = await _crypto();
    const { join } = await _path();
    const { writeFileSync } = await _fs();
    const tmpFile = join(tmpDir, `${createHash("sha1").update(url).digest("hex").slice(0, 12)}.js`);
    writeFileSync(tmpFile, code, "utf8");
    visited.set(url, tmpFile);
    return tmpFile;
  })();
  tempFileCache.set(url, promise);
  return promise;
}
async function importTempModule(filePath) {
  return await import(
    /* @vite-ignore */
    filePath
  );
}
async function loadSSRRemoteEntry(ssrEntry, resolvedShared = {}) {
  const { url, type } = ssrEntry;
  if (type === "commonjs-module" || type === "commonjs") {
    const { createRequire } = await _module();
    const req = createRequire(import.meta.url);
    try {
      return req(url);
    } catch {
    }
  }
  if (url.startsWith("http://") || url.startsWith("https://")) {
    const urlObj = new URL(url);
    if (urlObj.pathname.includes("/__mf_ssr__/")) {
      const remoteOrigin = urlObj.origin;
      const runner = await getOrCreateRunner(remoteOrigin);
      if (!runner) ; else try {
        const mod = await runner.import(urlObj.pathname);
        if (mod && typeof mod === "object" && "init" in mod) return mod;
        if (false) ;
      } catch {
      }
    }
    const { mkdirSync } = await _fs();
    const cacheDir = await getSSRCacheDir();
    mkdirSync(cacheDir, { recursive: true });
    const sharedPkgMap = new Map(Object.entries(resolvedShared));
    try {
      return await importTempModule(await fetchEsmToTempFile(url, cacheDir, /* @__PURE__ */ new Map(), sharedPkgMap));
    } catch (error) {
      if (isSsrEntryHttpError(error)) throw error;
      return null;
    }
  }
  try {
    return await import(
      /* @vite-ignore */
      url
    );
  } catch {
    return null;
  }
}
function ssrEntryLoaderPlugin(options = {}) {
  const resolvedShared = options.resolvedShared ?? {};
  return {
    name: "mf-vite:ssr-entry-loader",
    async loadEntry({ remoteInfo }) {
      if (typeof globalThis.window !== "undefined") return;
      const ssrEntry = await getSSREntry(remoteInfo.entry);
      if (!ssrEntry) return;
      const mod = await loadSSRRemoteEntry(ssrEntry, resolvedShared);
      if (!mod) return;
      return mod;
    }
  };
}

export { ssrEntryLoaderPlugin as default };
