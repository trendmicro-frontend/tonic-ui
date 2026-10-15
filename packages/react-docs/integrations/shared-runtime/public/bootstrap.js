(() => {
  const script = document.currentScript;
  const manifestUrl = new URL(script.dataset.manifest, location.href);
  const nonce = script.nonce;
  const groupNames = ['react', 'tonic'];
  const url = new URL(location.href);
  const forced = new Set((url.searchParams.get('__local') || '').split(',').filter(group => groupNames.includes(group)));
  const scenario = url.searchParams.get('scenario') || 'cdn-first';
  const scenarioDescriptions = {
    'react-package': 'Test scenario: React family CDN failure. A missing module is requested intentionally to verify that fallback works.',
    'tonic-package': 'Test scenario: Tonic UI CDN failure. A missing module is requested intentionally to verify that fallback works.',
    'all-cdn-fail': 'Test scenario: All CDN runtime families fail. Missing modules are requested intentionally to verify that every fallback works.',
    'no-tonic-cdn': 'Test scenario: No Tonic UI CDN configuration. The runtime uses the local Tonic UI package.',
    'all-local': 'Test scenario: Local-only runtime. React and Tonic UI load from same-origin packages.',
  };
  const log = document.getElementById('bootstrap-log');

  function note(message) {
    log.textContent += `${message}\n`;
    if (window.parent !== window) {
      window.parent.postMessage({
        type: 'tonic-cdn-runtime:log',
        value: log.textContent,
      }, location.origin);
    }
  }

  function reportProgress(value) {
    if (window.parent !== window) {
      window.parent.postMessage({
        type: 'tonic-cdn-runtime:progress',
        value,
      }, location.origin);
    }
  }
  const failed = (url.searchParams.get('__failed') || '').split(',').filter(group => groupNames.includes(group));

  function injectFailure(runtime) {
    const missing = new URL('./deliberately-missing-module.js', manifestUrl).href;
    const fail = (group, specifier) => {
      runtime.groups[group].cdn.imports[specifier] = missing;
    };
    if (scenario === 'react-package') {
      fail('react', 'react');
    }
    if (scenario === 'tonic-package') {
      fail('tonic', '@tonic-ui/react');
    }
    if (scenario === 'all-cdn-fail') {
      fail('react', 'react');
      fail('tonic', '@tonic-ui/react');
    }
    if (scenario === 'no-tonic-cdn') {
      runtime.groups.tonic.cdn = null;
    }
    if (scenario === 'all-local') {
      groupNames.forEach(group => forced.add(group));
    }
    if (scenarioDescriptions[scenario]) {
      note(scenarioDescriptions[scenario]);
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
    const manifestText = await response.text();
    const runtime = JSON.parse(manifestText);
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
    // The Tonic bundle imports the Emotion family; the manifest maps each one
    // at its single-file `?standalone` build (bare specifiers for the
    // standalone artifact, live esm.sh URLs for the CDN build) so the CDN
    // load skips the small-file graph.
    if (selected.tonic === 'cdn' && runtime.shared?.imports) {
      for (const [specifier, target] of Object.entries(runtime.shared.imports)) {
        if (Object.hasOwn(imports, specifier)) {
          throw new Error(`Conflicting import map entry: ${specifier}`);
        }
        imports[specifier] = new URL(target, manifestUrl).href;
      }
    }
    const map = document.createElement('script');
    map.type = 'importmap';
    if (nonce) {
      map.nonce = nonce;
    }
    map.textContent = JSON.stringify({ imports });
    document.head.append(map);

    // Probe complete families in order. The Tonic bundle imports the chosen
    // React through this one immutable map, so both families share one instance.
    for (const group of groupNames) {
      const candidate = runtime.groups[group][selected[group]];
      if (failed.includes(group)) {
        note(`✘ ${group}: cdn (failed)`);
      }
      document.body.dataset.stage = group;
      reportProgress({ group, source: selected[group] });
      try {
        const loading = Promise.all(candidate.probes.map(specifier => import(specifier)));
        await (selected[group] === 'cdn' ? withBudget(loading) : loading);
      } catch (error) {
        reportProgress(null);
        note(`✘ ${group}: ${selected[group]} (failed)`);
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
      reportProgress(null);
      note(`✔ ${group}: ${selected[group]}`);
    }
    const assets = runtime.apps.app;
    document.body.dataset.stage = 'app';
    await loadCss(assets.css);
    const app = await import(new URL(assets.entry, manifestUrl).href);
    // App/CSS/mount failures are not evidence that a runtime family is unavailable.
    await app.mount(document.getElementById('root'), {
      scenario, selected, manifestText, log: log.textContent,
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
