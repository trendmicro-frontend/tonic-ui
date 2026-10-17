import reactPlugin from '@vitejs/plugin-react';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { isReact, isTonicUI, runtimeSpecifiers } from '../cdn-shared/manifest.mjs';
import runtimeDev from '../cdn-shared/runtime-dev.mjs';
const root = dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ command, mode }) => {
  if (command === 'serve' && mode === 'development') {
    return {
      root,
      server: { host: process.env.HOST || undefined },
      publicDir: 'dist',
      plugins: [
        reactPlugin({ jsxRuntime: 'automatic' }),
        // Serves the production runtime (manifest, bootstrap) from dist/ and
        // the application from source. The root document is served by Vite
        // itself, with the development client injected.
        runtimeDev({
          root,
          appEntry: '/src/app.jsx',
          documents: {},
          bootstrapFiles: { '/bootstrap.js': resolve(root, '../cdn-shared/bootstrap.js') },
          specifiers: [...runtimeSpecifiers],
        }),
      ],
      optimizeDeps: { noDiscovery: true, include: [] },
    };
  }
  return {
    root,
    preview: { host: process.env.HOST || undefined },
    base: './',
    publicDir: false,
    plugins: [reactPlugin({ jsxRuntime: 'automatic' })],
    build: {
      target: 'es2022',
      rollupOptions: {
        // Match the other CDN examples: the app bundle emits under assets/app/.
        input: { app: resolve(root, 'src/app.jsx') },
        // The bootstrap imports the entry and calls its exported `mount`;
        // nothing references it at build time, so keep the signature.
        preserveEntrySignatures: 'strict',
        // The runtime bootstrap installs the import map at startup, so the
        // built application keeps every runtime import external.
        external: id => isReact(id) || isTonicUI(id),
        output: {
          entryFileNames: 'assets/app/[name]-[hash].js',
          chunkFileNames: 'assets/app/[name]-[hash].js',
          assetFileNames: 'assets/app/[name][extQuery]',
        },
      },
    },
  };
});
