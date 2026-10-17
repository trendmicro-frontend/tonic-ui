// Shared runtime bootstrap for the CDN examples.
//
// One loader serves both CDN example shapes. It reads a runtime manifest,
// selects one source per runtime group, installs one import map, probes each
// group, and mounts the application:
//
// - A group whose CDN probe fails falls back to its local source by reloading
//   the document with that group forced local. Native imports cannot be
//   cancelled or safely rebound, so the partially loaded realm is discarded.
// - A group with no local source has no fallback: a CDN failure (or a local
//   failure) is a terminal startup error shown in the document.
//
// The bootstrap reports startup state as structured JSON events through a
// single `onStatus` callback. It never formats text: the consumer (the
// application, the inspector, or the shell behind it) decides how to present
// each event. Scenarios and shell reporting are not part of the bootstrap;
// they belong to the consumers that call `start` with a prepared manifest.
(() => {
  const script = document.currentScript;
  const manifestUrl = new URL(
    script?.dataset?.manifest || './runtime-manifest.json',
    location.href,
  );
  const nonce = script?.nonce;
  const url = new URL(location.href);

  const logStatus = event => console.info('[cdn-runtime]', event);

  // Probes run on a budget only for CDN sources: a local file that does not
  // resolve is a deployment error, not a slow network.
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

  function reportError(message) {
    console.error(message);
    document.body.setAttribute('data-stage', 'error');
    const error = document.getElementById('startup-error');
    if (error) {
      error.hidden = false;
    }
  }

  async function run({ manifest, onStatus, mountOptions }) {
    const runtime = manifest;
    const groupNames = Object.keys(runtime.groups);
    const parseGroups = name => (url.searchParams.get(name) || '')
      .split(',')
      .filter(group => groupNames.includes(group));
    const forced = new Set(parseGroups('__local'));
    const failed = new Set(parseGroups('__failed'));
    for (const group of failed) {
      // This group failed in the discarded document; the fresh document
      // records the carry-over before selecting sources.
      onStatus({ type: 'cdn-failed', group, source: 'cdn' });
    }

    // One source per group: forced groups use local, everything else prefers
    // the CDN. A source that is absent from the manifest yields to the other;
    // a group absent on both sides cannot start.
    const selected = {};
    for (const group of groupNames) {
      let source = forced.has(group) ? 'local' : 'cdn';
      if (runtime.groups[group][source] === null) {
        source = source === 'cdn' ? 'local' : 'cdn';
      }
      if (runtime.groups[group][source] === null) {
        throw new Error(`No available source for runtime group: ${group}`);
      }
      selected[group] = source;
      // `dataset[...]` rejects hyphenated names, so hyphenated group keys
      // like `react-dom` must be written as attributes.
      document.body.setAttribute(`data-${group}`, source);
      onStatus({ type: 'selected', group, source });
    }

    // Every consumer resolves its family through this one immutable map, so
    // all loaded modules share one React and one Emotion instance.
    const imports = {};
    const addEntries = candidate => {
      for (const [specifier, target] of Object.entries(candidate.imports)) {
        if (Object.hasOwn(imports, specifier)) {
          throw new Error(`Conflicting import map entry: ${specifier}`);
        }
        imports[specifier] = new URL(target, manifestUrl).href;
      }
    };
    for (const group of groupNames) {
      addEntries(runtime.groups[group][selected[group]]);
    }
    // The Tonic UI bundle imports the Emotion family; the manifest maps each one
    // at its single-file `?standalone` build (bare specifiers for the
    // standalone artifact, live esm.sh URLs for the CDN build) so the CDN
    // load skips the small-file graph.
    if (runtime.shared?.imports) {
      addEntries({ imports: runtime.shared.imports });
    }
    for (const [specifier, alias] of Object.entries(runtime.aliases || {})) {
      if (!Object.hasOwn(imports, specifier)) {
        throw new Error(`Unmapped development runtime import: ${specifier}`);
      }
      imports[alias] = imports[specifier];
    }
    const map = document.createElement('script');
    map.type = 'importmap';
    if (nonce) {
      map.nonce = nonce;
    }
    map.textContent = JSON.stringify({ imports });
    document.head.append(map);

    // Probe complete families in order. The Tonic UI bundle imports the chosen
    // React through this one immutable map, so all groups share one
    // instance.
    for (const group of groupNames) {
      const candidate = runtime.groups[group][selected[group]];
      document.body.setAttribute('data-stage', group);
      onStatus({ type: 'probe-start', group, source: selected[group] });
      try {
        const loading = Promise.all(candidate.probes.map(specifier => import(specifier)));
        await (selected[group] === 'cdn' ? withBudget(loading) : loading);
      } catch (loadError) {
        onStatus({ type: 'probe-failed', group, source: selected[group], message: loadError.message });
        console.error(`Cannot load the ${selected[group]} ${group} runtime`, loadError);
        if (selected[group] === 'local') {
          // Local is the last resort; a local failure cannot be retried.
          throw loadError;
        }
        if (runtime.groups[group].local === null) {
          // No local source exists for this group: the CDN is the only
          // runtime, so a CDN failure ends startup with a visible error.
          throw new Error(`The ${group} CDN is unavailable and no local source exists`);
        }
        forced.add(group);
        const next = new URL(location.href);
        next.searchParams.set('__local', groupNames.filter(name => forced.has(name)).join(','));
        next.searchParams.set('__failed', [...new Set([...failed, group])].join(','));
        onStatus({ type: 'fallback', group, source: 'local', url: next.href });
        // Native imports cannot be cancelled or safely rebound. Discard this
        // realm; the fresh document selects the local source directly.
        location.replace(next);
        return;
      }
      onStatus({ type: 'probe-ok', group, source: selected[group] });
    }

    const assets = runtime.apps.app;
    document.body.setAttribute('data-stage', 'app');
    onStatus({ type: 'app-load' });
    await loadCss(assets.css);
    const app = await import(new URL(assets.entry, manifestUrl).href);
    // App/CSS/mount failures are not evidence that a runtime family is
    // unavailable; they are terminal startup errors, not retry triggers.
    await app.mount(document.getElementById('root'), {
      selected,
      versions: runtime.versions,
      ...mountOptions,
    });
    document.body.setAttribute('data-stage', 'mounted');
    onStatus({ type: 'mounted' });
  }

  const start = ({ manifest, onStatus = logStatus, mountOptions = {} }) =>
    run({ manifest, onStatus, mountOptions }).catch(error => {
      onStatus({ type: 'error', message: error.message });
      reportError(`Cannot start the application. Check the browser console.`);
    });

  window.CdnRuntime = { start };

  // Auto-start when the document names a manifest; consumers that prepare the
  // manifest themselves (the inspector) load the same file and call start.
  if (script?.dataset?.manifest) {
    fetch(manifestUrl.href)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Cannot load runtime manifest: ${response.status}`);
        }
        return response.text();
      })
      .then(text => start({ manifest: JSON.parse(text) }));
  }
})();
