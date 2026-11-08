// Production build for the "Use your application's bundler" strategy.
//
// Unlike `vite.config.mjs` (which builds the CDN runtime bundles with explicit
// externals and an import map), this build resolves every package specifier the
// way a normal application does: React, React DOM, Tonic UI, and Emotion end up
// in the application's own chunks. `build-meta.json` records which modules each
// chunk contains, so the measurement can report bundled dependencies without
// guessing from file names or source maps.
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import reactPlugin from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const root = dirname(fileURLToPath(import.meta.url));

const buildMeta = () => ({
  name: 'cdn-app-build-meta',
  generateBundle(options, bundle) {
    const family = (id) => {
      if (/node_modules\/react-dom\//.test(id)) {
        return 'reactDom';
      }
      if (/node_modules\/react\//.test(id)) {
        return 'react';
      }
      if (/@emotion\//.test(id)) {
        return 'emotion';
      }
      if (/packages\/react\/|@tonic-ui\//.test(id)) {
        return 'tonic';
      }
      if (/entries\/app-bundled/.test(id)) {
        return 'app';
      }
      return 'other';
    };
    // Per-family rendered length, before minification. The measurement scales
    // these shares to the chunk's measured size.
    const composition = {};
    const chunks = Object.values(bundle)
      .filter((output) => output.type === 'chunk')
      .map((chunk) => {
        for (const [id, info] of Object.entries(chunk.modules)) {
          const key = family(id);
          composition[key] = (composition[key] ?? 0) + (info.renderedLength ?? 0);
        }
        return {
          file: chunk.fileName,
          isEntry: chunk.isEntry,
          modules: Object.keys(chunk.modules),
          imports: chunk.imports,
        };
      });
    this.emitFile({
      type: 'asset',
      fileName: 'build-meta.json',
      source: JSON.stringify({ chunks, composition }, null, 2),
    });
  },
});

export default defineConfig({
  root,
  base: './',
  publicDir: false,
  plugins: [reactPlugin({ jsxRuntime: 'automatic' }), buildMeta()],
  build: {
    outDir: process.env.APP_BUILD_OUTDIR || resolve(root, 'dist-app'),
    emptyOutDir: true,
    manifest: false,
    target: 'es2022',
    // Keep the browser's own behavior: only chunks the application requests are
    // fetched. Nothing is preloaded beyond what the entry imports.
    modulePreload: false,
    rollupOptions: {
      input: { app: resolve(root, 'entries/app-bundled.jsx') },
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
});
