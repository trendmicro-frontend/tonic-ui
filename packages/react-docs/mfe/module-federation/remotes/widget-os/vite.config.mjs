import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';
import { ensureString } from 'ensure-type';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const basePath = ensureString(process.env.TONIC_UI_REACT_DOCS_BASE_PATH);

// OSDistributionWidget REMOTE. Built statically (no dev server) into
// public/mfe/module-federation/widget-os/. `base` is the same-origin path Next
// serves it from, so the emitted mf-manifest.json + remoteEntry resolve via
// relative URLs when the shell fetches them.
export default defineConfig({
  root: dirname,
  base: `${basePath}/mfe/module-federation/widget-os/`,
  plugins: [
    federation({
      name: 'widget_os',
      filename: 'remoteEntry.js',
      manifest: true,
      dev: false,
      dts: false,
      exposes: {
        './main': path.resolve(dirname, 'main.jsx'),
      },
      // Share ONLY react / react-dom as singletons so there is ONE React across
      // shell + remotes. The component libraries (@tonic-ui/react,
      // @tonic-ui/react-data-grid) are intentionally NOT shared — this remote
      // BUNDLES them. Sharing them as singletons made a binding (DataGridCell)
      // resolve to undefined at synchronous import time, crashing module-eval with
      // "Cannot set properties of undefined (setting 'displayName')".
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
    react(),
  ],
  build: {
    outDir: path.resolve(dirname, '../../../../public/mfe/module-federation/widget-os'),
    emptyOutDir: true,
    target: 'esnext',
    minify: false,
    rollupOptions: {
      // See inventory remote: externalize the Vite 8+ subpath the MF runtime plugin
      // statically references but never loads on Vite 5.
      external: ['vite/module-runner'],
    },
  },
});
