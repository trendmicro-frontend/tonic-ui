// Shared development plugin for the CDN examples.
//
// The development server serves production runtime files (vendor bundles,
// bootstrap, and the generated manifest) from `dist/` while loading the
// application from source. Bare shared imports in the source are kept external
// through synthetic HTTP identifiers; the development manifest maps those
// identifiers to the same selected URLs as the vendor bare imports, so the
// browser loads the exact CDN (or local) runtime the production build would.
// Vite dependency auto-discovery is disabled by the consumer to prevent a
// second prebundled React instance.
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { normalizePath } from 'vite';

// HTTP identifiers survive Vite's development import analysis. The bootstrap
// maps them to the same modules as the bare imports in the vendor bundles.
const runtimePrefix = 'https://runtime.invalid/';

export default function runtimeDev({ root, appEntry, documents, bootstrapFiles, specifiers }) {
  const manifestFile = resolve(root, 'dist/runtime-manifest.json');
  const watched = [manifestFile, ...Object.values(documents), ...Object.values(bootstrapFiles)];
  const watchedPaths = watched.map(normalizePath);
  const aliases = Object.fromEntries(specifiers.map(id => [id, runtimePrefix + encodeURIComponent(id)]));

  return {
    name: 'cdn-runtime-dev',
    apply: 'serve',
    enforce: 'pre',

    config() {
      // Vite otherwise excludes its output directory from the dev watcher,
      // even when the generated manifest is explicitly added to it.
      return { build: { emptyOutDir: false } };
    },

    resolveId(id) {
      if (Object.hasOwn(aliases, id)) {
        return { id: aliases[id], external: true };
      }
      return null;
    },

    configureServer(server) {
      for (const file of watched) {
        server.watcher.add(file);
      }
      const reload = file => {
        const normalized = normalizePath(file);
        if (watchedPaths.some(watchedPath => normalized === watchedPath)) {
          server.ws.send({ type: 'full-reload', path: '*' });
        }
      };
      server.watcher.on('change', reload);
      server.httpServer?.once('close', () => server.watcher.off('change', reload));

      server.middlewares.use(async (request, response, next) => {
        const pathname = new URL(request.url, 'http://localhost').pathname;
        try {
          if (pathname === '/runtime-manifest.json') {
            const runtime = JSON.parse(await readFile(manifestFile, 'utf8'));
            runtime.apps.app = { entry: appEntry, css: [] };
            runtime.aliases = aliases;
            response.setHeader('Content-Type', 'application/json');
            response.setHeader('Cache-Control', 'no-store');
            response.end(JSON.stringify(runtime));
            return;
          }
          for (const [name, file] of Object.entries(documents)) {
            if (pathname === `/${name}` || (pathname === '/' && name === 'index.html')) {
              const html = await readFile(file, 'utf8');
              response.setHeader('Content-Type', 'text/html');
              response.setHeader('Cache-Control', 'no-store');
              // These documents bootstrap their own module graph. Keep their
              // static module scripts intact instead of creating HTML proxies.
              response.end(html.replace('</head>', '<script type="module" src="/@vite/client"></script></head>'));
              return;
            }
          }
          for (const [path, file] of Object.entries(bootstrapFiles)) {
            if (pathname === path) {
              response.setHeader('Content-Type', 'text/javascript');
              response.setHeader('Cache-Control', 'no-store');
              response.end(await readFile(file, 'utf8'));
              return;
            }
          }
          next();
        } catch (error) {
          next(error);
        }
      });
    },

    // Runtime bundles are production builds. Use page reloads rather than
    // React Fast Refresh, which requires a compatible development runtime.
    handleHotUpdate({ file, server }) {
      if (normalizePath(file).startsWith(`${normalizePath(root)}/src/`)) {
        server.ws.send({ type: 'full-reload', path: '*' });
        return [];
      }
      return undefined;
    },
  };
}
