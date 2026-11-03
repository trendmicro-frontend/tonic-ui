// Scenario layer for the runtime inspector frame.
//
// The bootstrap shared with the application (loaded first from `./bootstrap.js`)
// contains no scenario logic and no presentation logic. It reports startup
// state as structured JSON events through `onStatus`; this script decides how
// to present them in this document: it renders the load log, streams it to
// the visible shell, and derives the shell's loading progress.
//
// Scenario presets mutate the manifest before the bootstrap runs: a missing
// module URL makes the CDN probe fail for real, and clearing a CDN source
// (`cdn: null`) selects the local candidate through the bootstrap's own
// selection rules.
(() => {
  const script = document.currentScript;
  const manifestUrl = new URL(
    script.dataset.manifest || './runtime-manifest.json',
    location.href,
  );
  const url = new URL(location.href);
  const scenario = url.searchParams.get('scenario') || 'cdn-first';
  const groupNames = ['react', 'react-dom', '@tonic-ui/react'];
  const scenarioDescriptions = {
    'react-package': 'Test scenario: React family CDN failure. A missing module is requested intentionally to verify that fallback works.',
    'tonic-ui-react-package': 'Test scenario: @tonic-ui/react CDN failure. A missing module is requested intentionally to verify that fallback works.',
    'all-cdn-fail': 'Test scenario: All CDN runtime families fail. Missing modules are requested intentionally to verify that every fallback works.',
    'no-tonic-ui-react-cdn': 'Test scenario: No @tonic-ui/react CDN configuration. The runtime uses the local package.',
    'all-local': 'Test scenario: Local-only runtime. React, React DOM, and @tonic-ui/react load from same-origin packages.',
  };
  const log = document.getElementById('bootstrap-log');
  let cdnSourceNames = {};
  const sourceName = (group, source) => source === 'cdn' ? cdnSourceNames[group] : source;

  function send(type, value) {
    if (window.parent !== window) {
      window.parent.postMessage({ type, value }, location.origin);
    }
  }

  function line(message) {
    log.textContent += `${message}\n`;
    send('cdn-runtime:log', log.textContent);
  }

  // Presentation for this document: render the load log and derive the shell's
  // loading progress from the bootstrap's structured events.
  function onStatus(event) {
    switch (event.type) {
      case 'cdn-failed':
        line(`✘ ${event.group}: ${sourceName(event.group, event.source)} (failed)`);
        break;
      case 'probe-start':
        send('cdn-runtime:progress', {
          group: event.group,
          source: sourceName(event.group, event.source),
        });
        break;
      case 'probe-failed':
        send('cdn-runtime:progress', null);
        line(`✘ ${event.group}: ${sourceName(event.group, event.source)} (failed)`);
        break;
      case 'fallback':
        send('cdn-runtime:progress', null);
        line(`Reloading with the local ${event.group} runtime`);
        break;
      case 'probe-ok':
        send('cdn-runtime:progress', null);
        line(`✔ ${event.group}: ${sourceName(event.group, event.source)}`);
        break;
      default:
        break;
    }
  }

  function injectScenario(runtime) {
    const missing = new URL('./deliberately-missing-module.js', manifestUrl).href;
    const fail = (group, specifier) => {
      runtime.groups[group].cdn.imports[specifier] = missing;
    };
    if (scenario === 'react-package') {
      fail('react', 'react');
    }
    if (scenario === 'tonic-ui-react-package') {
      fail('@tonic-ui/react', '@tonic-ui/react');
    }
    if (scenario === 'all-cdn-fail') {
      fail('react', 'react');
      fail('react-dom', 'react-dom');
      fail('@tonic-ui/react', '@tonic-ui/react');
    }
    // Clearing every CDN source selects the local candidate through the
    // bootstrap's own selection rules.
    if (scenario === 'no-tonic-ui-react-cdn' || scenario === 'all-local') {
      const groups = scenario === 'all-local' ? groupNames : ['@tonic-ui/react'];
      for (const group of groups) {
        runtime.groups[group].cdn = null;
      }
    }
    if (scenarioDescriptions[scenario]) {
      line(scenarioDescriptions[scenario]);
    }
  }

  async function run() {
    const response = await fetch(manifestUrl);
    if (!response.ok) {
      throw new Error(`Cannot load runtime manifest: ${response.status}`);
    }
    const manifestText = await response.text();
    const runtime = JSON.parse(manifestText);
    cdnSourceNames = Object.fromEntries(Object.entries(runtime.groups).map(([group, sources]) => {
      const firstCdnUrl = Object.values(sources.cdn?.imports ?? {})[0];
      return [group, firstCdnUrl ? new URL(firstCdnUrl, manifestUrl).hostname : 'CDN'];
    }));
    injectScenario(runtime);
    await window.CdnRuntime.start({
      manifest: runtime,
      onStatus,
      // The application posts the complete runtime to the shell; scenario and
      // manifest are the inspector-specific additions.
      mountOptions: { scenario, manifestText, cdnSourceNames },
    });
  }

  run().catch(error => {
    console.error(error);
    document.body.dataset.stage = 'error';
    onStatus({ type: 'error', message: error.message });
    line(`Startup error: ${error.message}`);
    send('cdn-runtime:progress', null);
    document.getElementById('startup-error').hidden = false;
  });
})();
