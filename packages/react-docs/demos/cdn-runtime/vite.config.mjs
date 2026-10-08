import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { localEntries, isReact, isEmotion, isTonic } from './entries.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

export default defineConfig(({ mode }) => {
  const vendor = localEntries[mode];
  if (!vendor && mode !== 'tonic-cdn' && mode !== 'tonic-local') {
    throw new Error(`Unknown runtime build: ${mode}`);
  }
  const input = vendor
    ? Object.fromEntries(Object.entries(vendor).map(([name, entry]) => [name, resolve(root, entry.file)]))
    : { app: resolve(root, 'src/app.js') };
  const external = mode === 'react'
    ? undefined
    : mode === 'emotion'
      ? isReact
      : id => isReact(id) || isEmotion(id) || (mode === 'tonic-cdn' && isTonic(id));
  return {
    root,
    base: './',
    publicDir: false,
    plugins: mode === 'react'
      ? [{
          name: 'react-commonjs-named-exports',
          transform(code, id) {
            const entry = Object.values(localEntries.react).find(item => resolve(root, item.file) === id);
            if (!entry) {
              return null;
            }
            // React's CJS index forwards module.exports. export * alone loses its names.
            const names = Object.keys(require(entry.specifier)).filter(name => name !== 'default' && name !== '__esModule');
            return `${code}\nexport { ${names.join(', ')} } from '${entry.specifier}';\n`;
          },
        }]
      : [],
    build: {
      outDir: resolve(root, `../../public/demos/cdn-runtime/${mode}`),
      emptyOutDir: true,
      manifest: true,
      target: 'es2022',
      modulePreload: false,
      rollupOptions: {
        input, external, preserveEntrySignatures: 'strict', output: { inlineDynamicImports: !vendor },
      },
    },
  };
});
