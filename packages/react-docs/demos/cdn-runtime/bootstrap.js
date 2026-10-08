(() => {
  const script = document.currentScript;
  const manifestUrl = new URL(script.dataset.manifest, location.href);
  const nonce = script.nonce;
  const groupNames = ['react', 'emotion', 'tonic'];
  const url = new URL(location.href);
  const forced = new Set((url.searchParams.get('__local') || '').split(',').filter(group => groupNames.includes(group)));
  const scenario = url.searchParams.get('scenario') || 'cdn-first';
  const log = document.getElementById('bootstrap-log');

  function note(message) {
    log.textContent += `${message}\n`;
  }
  const failed = (url.searchParams.get('__failed') || '').split(',').filter(group => groupNames.includes(group));
  if (failed.length) {
    note(`Previous document: CDN load failed for ${failed.join(', ')}. Reloaded before mounting.`);
  }

  function injectFailure(runtime) {
    const missing = new URL('./deliberately-missing-module.js', manifestUrl).href;
    const fail = (group, specifier) => {
      runtime.groups[group].cdn.imports[specifier] = missing;
    };
    if (scenario === 'tonic-package') {
      fail('tonic', '@tonic-ui/react');
    }
    if (scenario === 'react-package') {
      fail('react', 'react-dom/client');
    }
    if (scenario === 'emotion-package') {
      fail('emotion', '@emotion/styled/base');
    }
    if (scenario === 'all-cdn-fail') {
      fail('react', 'react-dom/client');
      fail('emotion', '@emotion/styled/base');
      fail('tonic', '@tonic-ui/react');
    }
    if (scenario === 'no-tonic-cdn') {
      runtime.groups.tonic.cdn = null;
    }
    if (scenario === 'all-local') {
      groupNames.forEach(group => forced.add(group));
    }
    if (scenario !== 'cdn-first') {
      note(`Demonstration scenario: ${scenario}. Missing-module scenarios inject a real same-origin module 404, not a simulated successful import.`);
    }
  }

  function withBudget(promise) {
    let timer;
    const timeout = new Promise((resolve, reject) => {
      timer = setTimeout(() => reject(new Error('CDN load budget exceeded (8 seconds)')), 8000);
    });
    return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
  }

  function loadCss(files) {
    return Promise.all(files.map(file => new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = new URL(file, manifestUrl).href;
      link.onload = resolve;
      link.onerror = () => reject(new Error(`Cannot load ${link.href}`));
      document.head.append(link);
    })));
  }

  async function run() {
    const response = await fetch(manifestUrl);
    if (!response.ok) {
      throw new Error(`Cannot load runtime manifest: ${response.status}`);
    }
    const runtime = await response.json();
    injectFailure(runtime);
    const selected = Object.fromEntries(groupNames.map(group => [group,
      !forced.has(group) && runtime.groups[group].cdn !== null ? 'cdn' : 'local',
    ]));
    const imports = {};
    for (const group of groupNames) {
      const candidate = runtime.groups[group][selected[group]];
      for (const [specifier, target] of Object.entries(candidate.imports)) {
        if (Object.hasOwn(imports, specifier)) {
          throw new Error(`Conflicting import map entry: ${specifier}`);
        }
        imports[specifier] = new URL(target, manifestUrl).href;
      }
      document.body.dataset[group] = selected[group];
    }
    const map = document.createElement('script');
    map.type = 'importmap';
    if (nonce) {
      map.nonce = nonce;
    }
    map.textContent = JSON.stringify({ imports });
    document.head.append(map);

    // Probe complete families in order. Emotion/Tonic imports use the chosen React,
    // and Tonic imports use the chosen Emotion through this one immutable map.
    for (const group of groupNames) {
      const candidate = runtime.groups[group][selected[group]];
      document.body.dataset.stage = group;
      note(`Loading ${group}: ${selected[group]}...`);
      try {
        const loading = Promise.all(candidate.probes.map(specifier => import(specifier)));
        await (selected[group] === 'cdn' ? withBudget(loading) : loading);
      } catch (error) {
        console.error(`Cannot load ${selected[group]} ${group} runtime`, error);
        if (selected[group] === 'local') {
          throw error;
        }
        forced.add(group);
        const next = new URL(location.href);
        next.searchParams.set('__local', groupNames.filter(name => forced.has(name)).join(','));
        next.searchParams.set('__failed', [...new Set([...failed, group])].join(','));
        // Native imports cannot be cancelled or safely rebound. Discard this realm.
        location.replace(next);
        return;
      }
      note(`Ready: ${group} (${selected[group]}).`);
    }
    const assets = runtime.apps[selected.tonic];
    document.body.dataset.stage = 'app';
    await loadCss(assets.css);
    const app = await import(new URL(assets.entry, manifestUrl).href);
    // App/CSS/mount failures are not evidence that a runtime family is unavailable.
    note('Local app loaded with the selected React, Emotion and Tonic runtime.');
    await app.mount(document.getElementById('root'), {
      scenario, selected, versions: runtime.versions, manifestUrl: manifestUrl.href, log: log.textContent,
    });
    document.body.dataset.stage = 'mounted';
  }

  run().catch(error => {
    console.error(error);
    document.body.dataset.stage = 'error';
    note(`Startup error: ${error.message}`);
    document.getElementById('startup-error').hidden = false;
  });
})();
