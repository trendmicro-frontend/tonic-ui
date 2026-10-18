import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ensureString } from 'ensure-type';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const basePath = ensureString(process.env.TONIC_UI_REACT_DOCS_BASE_PATH);

// Wujie HOST build. Outputs to packages/react-docs/public/demos/mfe-wujie/ (the root).
// Does NOT use emptyOutDir so the app subdirs built separately are preserved.
export default defineConfig({
  root: dirname,
  base: `${basePath}/demos/mfe-wujie/`,
  plugins: [react()],
  define: {
    __BASE_PATH__: JSON.stringify(basePath),
  },
  build: {
    outDir: path.resolve(dirname, '../../../packages/react-docs/public/demos/mfe-wujie'),
    emptyOutDir: false,
  },
});
