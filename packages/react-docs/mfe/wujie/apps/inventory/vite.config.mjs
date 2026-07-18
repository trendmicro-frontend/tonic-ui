import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ensureString } from 'ensure-type';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const basePath = ensureString(process.env.TONIC_UI_REACT_DOCS_BASE_PATH);

// Inventory Wujie sub-app. Built into public/mfe/wujie/apps/inventory/.
// Loaded by URL by the Wujie host; projects its DOM into a shadow root.
export default defineConfig({
  root: dirname,
  base: `${basePath}/mfe/wujie/apps/inventory/`,
  plugins: [react()],
  build: {
    outDir: path.resolve(dirname, '../../../../public/mfe/wujie/apps/inventory'),
    emptyOutDir: true,
  },
});
