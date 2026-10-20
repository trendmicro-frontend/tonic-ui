import { createRequire } from 'node:module';
import reactPlugin from '@vitejs/plugin-react';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import {
  isReact,
  isTonicUI,
  localEntries,
  runtimeSpecifiers,
} from './entries.mjs';
import runtimeDev from './scripts/runtime-dev.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
// npm package runtime bundles emit under assets/npm/<package>@<version>/ so
// manifest paths name their package, like CDN URLs do, and stay distinct
// from the workspace's own app bundle.
const bundleDirs = {
  react: `assets/npm/react@${require('react/package.json').version}`,
  'react-dom': `assets/npm/react-dom@${require('react-dom/package.json').version}`,
  'tonic-ui-react': `assets/npm/@tonic-ui/react@${require('@tonic-ui/react/package.json').version}`,
  app: 'assets/app',
  shell: 'assets/shell',
};

export default defineConfig(({ command, mode }) => {
  // The inspector is opt-in: `vite --mode inspector` (run by `dev:inspector`)
  // serves the shell and frame documents alongside the application document.
  const inspector = mode === 'inspector';
  if (command === 'serve' && (mode === 'development' || inspector)) {
    return {
      root,
      server: { host: process.env.HOST || undefined },
      publicDir: 'dist',
      plugins: [
        runtimeDev({
          root,
          appEntry: '/src/app.jsx',
          documents: {
            'index.html': resolve(root, 'public/index.html'),
            ...(inspector ? {
              'inspector.html': resolve(root, 'public/inspector.html'),
              'runtime.html': resolve(root, 'public/runtime.html'),
            } : {}),
          },
          bootstrapFiles: {
            '/bootstrap.js': resolve(root, 'public/bootstrap.js'),
            ...(inspector ? { '/inspector-bootstrap.js': resolve(root, 'public/inspector-bootstrap.js') } : {}),
          },
          specifiers: [...runtimeSpecifiers],
        }),
      ],
      esbuild: { jsx: 'automatic', jsxImportSource: 'react', jsxDev: false },
      optimizeDeps: { noDiscovery: true, include: [] },
    };
  }
  // Vite's `mode` option selects the configuration; here the value names the
  // bundle being built. Each bundle is one output directory (dist/assets/…)
  // with its own external boundary.
  const bundle = mode;
  const vendor = localEntries[bundle];
  if (!vendor && bundle !== 'app' && bundle !== 'shell') {
    throw new Error(`Unknown runtime build: ${bundle}`);
  }
  const input = vendor
    ? Object.fromEntries(Object.entries(vendor).map(([name, entry]) => [name, resolve(root, entry.file)]))
    : { [bundle]: resolve(root, `src/${bundle}.jsx`) };
  const external = bundle === 'react'
    ? undefined
    // React DOM root stays inlined, but `react` remains external so the
    // inlined code resolves the shared React instance from the combined entry.
    : bundle === 'react-dom'
      ? id => id === 'react' || id.startsWith('react/')
      : bundle === 'tonic-ui-react'
        ? isReact
        // The inspector shell bundles its own React and @tonic-ui/react
        // instances for the visible control surface.
        : bundle === 'shell'
          ? undefined
          : id => isReact(id) || isTonicUI(id);
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
      outDir: resolve(root, `dist/${bundleDirs[bundle]}`),
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
          entryFileNames: bundle === 'shell' ? '[name].js' : '[name]-[hash].js',
        },
      },
    },
  };
});
