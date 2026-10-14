(() => {
  const script = document.currentScript;
  const manifestUrl = new URL(script.dataset.manifest, location.href);
  const nonce = script.nonce;
  const groupNames = ['react', 'tonic'];
  const url = new URL(location.href);
  const forced = new Set((url.searchParams.get('__local') || '').split(',').filter(group => groupNames.includes(group)));
  const failed = new Set((url.searchParams.get('__failed') || '').split(',').filter(group => groupNames.includes(group)));
  const status = document.getElementById('bootstrap-status');
  const error = document.getElementById('startup-error');

  function note(message) {
    console.info(`[cdn-runtime] ${message}`);
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
    const runtime = JSON.parse(await response.text());
    for (const group of failed) {
      note(`x ${group}: cdn (failed)`);
    }
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

    // Probe complete families in order. The Tonic bundle imports the chosen
    // React through this one immutable map, so both families share one instance.
    for (const group of groupNames) {
      const candidate = runtime.groups[group][selected[group]];
      try {
        const loading = Promise.all(candidate.probes.map(specifier => import(specifier)));
        await (selected[group] === 'cdn' ? withBudget(loading) : loading);
      } catch (loadError) {
        note(`x ${group}: ${selected[group]} (failed)`);
        console.error(`Cannot load ${selected[group]} ${group} runtime`, loadError);
        if (selected[group] === 'local') {
          throw loadError;
        }
        forced.add(group);
        const next = new URL(location.href);
        next.searchParams.set('__local', groupNames.filter(name => forced.has(name)).join(','));
        next.searchParams.set('__failed', [...new Set([...failed, group])].join(','));
        // Native imports cannot be cancelled or safely rebound. Discard this realm.
        location.replace(next);
        return;
      }
      note(`ok ${group}: ${selected[group]}`);
    }
    const assets = runtime.apps.app;
    await loadCss(assets.css);
    const app = await import(new URL(assets.entry, manifestUrl).href);
    // App/CSS/mount failures are not evidence that a runtime family is unavailable.
    await app.mount(document.getElementById('root'), { selected, versions: runtime.versions });
    document.body.dataset.stage = 'mounted';
  }

  run().catch(startupError => {
    console.error(startupError);
    document.body.dataset.stage = 'error';
    status.hidden = true;
    error.hidden = false;
  });
})();
