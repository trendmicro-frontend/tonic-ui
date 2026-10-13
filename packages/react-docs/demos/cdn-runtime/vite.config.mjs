import { createRequire } from 'node:module';
import react from '@vitejs/plugin-react';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { localEntries, isReact, isEmotion, isTonic } from './entries.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

export default defineConfig(({ mode }) => {
  const vendor = localEntries[mode];
  if (!vendor && mode !== 'tonic-cdn' && mode !== 'tonic-local' && mode !== 'shell') {
    throw new Error(`Unknown runtime build: ${mode}`);
  }
  const input = vendor
    ? Object.fromEntries(Object.entries(vendor).map(([name, entry]) => [name, resolve(root, entry.file)]))
    : { [mode === 'shell' ? 'shell' : 'app']: resolve(root, mode === 'shell' ? 'src/shell.js' : 'src/app.js') };
  const external = mode === 'react'
    ? undefined
    : mode === 'emotion'
      ? isReact
      : mode === 'shell'
        ? undefined
        : id => isReact(id) || isEmotion(id) || (mode === 'tonic-cdn' && isTonic(id));
  const reactCommonJsNamedExports = {
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
  };
  return {
    root,
    base: './',
    publicDir: false,
    plugins: [
      // The automatic JSX runtime compiles to `react/jsx-runtime` imports,
      // which the import map resolves like every other React family member.
      react({ jsxRuntime: 'automatic' }),
      ...(mode === 'react' ? [reactCommonJsNamedExports] : []),
    ],
    // The demo writes JSX in `.js` files; esbuild must parse them as JSX.
    esbuild: {
      loader: 'jsx',
      include: /src\/.*\.jsx?$/,
      exclude: [],
    },
    build: {
      outDir: resolve(root, `dist/${mode}`),
      emptyOutDir: true,
      manifest: true,
      target: 'es2022',
      modulePreload: false,
      rollupOptions: {
        input,
        external,
        preserveEntrySignatures: 'strict',
        output: {
          inlineDynamicImports: !vendor,
          // The shell document is static HTML, so its bundled entry keeps a
          // stable file name instead of a content hash.
          entryFileNames: mode === 'shell' ? 'assets/[name].js' : 'assets/[name]-[hash].js',
        },
      },
    },
  };
});
