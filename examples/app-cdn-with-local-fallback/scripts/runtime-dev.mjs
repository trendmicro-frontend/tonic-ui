import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { normalizePath } from 'vite';
import { reactSpecifiers, tonicSpecifiers } from '../entries.mjs';

// HTTP identifiers survive Vite's development import analysis. The bootstrap
// maps them to the same modules as the bare imports in the vendor bundles.
const runtimePrefix = 'https://runtime.invalid/';
const specifiers = [...reactSpecifiers, ...tonicSpecifiers];
const aliases = Object.fromEntries(specifiers.map(id => [id, runtimePrefix + encodeURIComponent(id)]));

export default function runtimeDev({ root, appEntry, documents }) {
  const manifestFile = resolve(root, 'dist/runtime-manifest.json');
  const publicRoot = resolve(root, 'public');

  return {
    name: 'cdn-with-local-fallback-dev',
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
      server.watcher.add([manifestFile, publicRoot]);
      const reload = file => {
        const normalized = normalizePath(file);
        if (normalized === normalizePath(manifestFile) || normalized.startsWith(`${normalizePath(publicRoot)}/`)) {
          server.ws.send({ type: 'full-reload', path: '*' });
        }
      };
      server.watcher.on('change', reload);
      server.httpServer?.once('close', () => server.watcher.off('change', reload));

      server.middlewares.use(async (request, response, next) => {
        const pathname = new URL(request.url, 'http://localhost').pathname;
        const document = pathname === '/' ? 'index.html' : pathname.slice(1);
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
          if (documents.includes(document)) {
            const html = await readFile(resolve(publicRoot, document), 'utf8');
            response.setHeader('Content-Type', 'text/html');
            response.setHeader('Cache-Control', 'no-store');
            // These documents bootstrap their own module graph. Keep their
            // static module scripts intact instead of creating HTML proxies.
            response.end(html.replace('</head>', '<script type="module" src="/@vite/client"></script></head>'));
            return;
          }
          if (pathname === '/bootstrap.js') {
            response.setHeader('Content-Type', 'text/javascript');
            response.setHeader('Cache-Control', 'no-store');
            response.end(await readFile(resolve(publicRoot, 'bootstrap.js'), 'utf8'));
            return;
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
