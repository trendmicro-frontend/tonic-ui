import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';
import { ensureString } from 'ensure-type';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const basePath = ensureString(process.env.TONIC_UI_REACT_DOCS_BASE_PATH);

// Module Federation SHELL (host). Built statically into
// public/mfe/module-federation/shell/. All remotes are resolved at RUNTIME from
// same-origin relative mf-manifest.json URLs — no dev server, no host:port. `base`
// is the path Next serves the shell's own assets from.
export default defineConfig({
  root: dirname,
  base: `${basePath}/mfe/module-federation/shell/`,
  plugins: [
    federation({
      name: 'mfe_shell',
      dev: false,
      dts: false,
      remotes: {
        widget_updates: {
          name: 'widget_updates',
          entry: `${basePath}/mfe/module-federation/widget-updates/mf-manifest.json`,
        },
        widget_os: {
          name: 'widget_os',
          entry: `${basePath}/mfe/module-federation/widget-os/mf-manifest.json`,
        },
        inventory: {
          name: 'inventory',
          entry: `${basePath}/mfe/module-federation/inventory/mf-manifest.json`,
        },
      },
      // Share ONLY react + react-dom as singletons so there is ONE React across
      // shell + remotes. The component libraries (@tonic-ui/react,
      // @tonic-ui/react-data-grid) are intentionally NOT shared — each remote
      // BUNDLES them. Sharing them as singletons made a binding (DataGridCell)
      // resolve to undefined at synchronous import time, crashing module-eval with
      // "Cannot set properties of undefined (setting 'displayName')". There is no
      // cross-remote requirement that the component libs be one instance.
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
    react(),
  ],
  build: {
    outDir: path.resolve(dirname, '../../../public/mfe/module-federation/shell'),
    emptyOutDir: true,
    target: 'esnext',
    minify: false,
    rollupOptions: {
      // See remotes: externalize the Vite 8+ subpath the MF runtime plugin
      // statically references but never loads on Vite 5.
      external: ['vite/module-runner'],
    },
  },
});
