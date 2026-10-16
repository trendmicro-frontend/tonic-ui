import { createRequire } from 'node:module';
import reactPlugin from '@vitejs/plugin-react';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { localEntries, isReact, isTonic } from './entries.mjs';
import runtimeDev from './scripts/runtime-dev.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

export default defineConfig(({ command, mode }) => {
  if (command === 'serve' && mode === 'development') {
    return {
      root,
      server: { host: process.env.HOST || undefined },
      publicDir: 'dist',
      plugins: [runtimeDev({ root, appEntry: '/src/app.jsx', documents: ['index.html'] })],
      esbuild: { jsx: 'automatic', jsxImportSource: 'react', jsxDev: false },
      optimizeDeps: { noDiscovery: true, include: [] },
    };
  }
  // Vite's `mode` option selects the configuration; here the value names the
  // bundle being built. Each bundle is one output directory (dist/<bundle>/)
  // with its own external boundary.
  const bundle = mode;
  const vendor = localEntries[bundle];
  if (!vendor && bundle !== 'app') {
    throw new Error(`Unknown runtime build: ${bundle}`);
  }
  const input = vendor
    ? Object.fromEntries(Object.entries(vendor).map(([name, entry]) => [name, resolve(root, entry.file)]))
    : { app: resolve(root, 'src/app.jsx') };
  const external = bundle === 'react'
    ? undefined
    // React DOM root stays inlined, but `react` remains external so the
    // inlined code resolves the shared React instance from the combined entry.
    : bundle === 'react-dom'
      ? id => id === 'react' || id.startsWith('react/')
      : bundle === 'tonic'
        ? isReact
        : id => isReact(id) || isTonic(id);
  // React 19's npm package is CJS-only, so `export *` from it loses every
  // name. Re-list the names of each re-exported bare specifier explicitly,
  // skipping names the entry already exports (which would collide).
  const reactCommonJsNamedExports = {
    name: 'react-commonjs-named-exports',
    transform(code, id) {
      const entry = Object.values(localEntries[bundle] || {}).find(item => resolve(root, item.file) === id);
      if (!entry) {
        return null;
      }
      const explicit = new Set(
        [...code.matchAll(/export \{([^}]*)\}/g)]
          .flatMap(match => match[1].split(','))
          .map(name => name.trim().split(/\s+as\s+/)[0].trim())
          .filter(name => name && name !== 'default'),
      );
      const added = new Set();
      const lines = [];
      for (const specifier of [...new Set([...code.matchAll(/from '([^']+)'/g)].map(match => match[1]))]) {
        if (specifier.startsWith('.') || specifier.startsWith('node:')) {
          continue;
        }
        const names = Object.keys(require(specifier)).filter(name =>
          name !== 'default' && name !== '__esModule' && !explicit.has(name) && !added.has(name));
        if (names.length) {
          names.forEach(name => added.add(name));
          lines.push(`export { ${names.join(', ')} } from '${specifier}';`);
        }
      }
      return lines.length ? `${code}\n${lines.join('\n')}\n` : null;
    },
  };
  return {
    root,
    preview: { host: process.env.HOST || undefined },
    base: './',
    publicDir: false,
    plugins: [
      // The automatic JSX runtime compiles to `react/jsx-runtime` imports,
      // which the import map resolves like every other React family member.
      reactPlugin({ jsxRuntime: 'automatic' }),
      ...(bundle === 'react' || bundle === 'react-dom' ? [reactCommonJsNamedExports] : []),
    ],
    build: {
      outDir: resolve(root, `dist/${bundle}`),
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
          entryFileNames: 'assets/[name]-[hash].js',
        },
      },
    },
  };
});
