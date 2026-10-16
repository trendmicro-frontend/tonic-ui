import { createRequire } from 'node:module';
import reactPlugin from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const require = createRequire(import.meta.url);
const versionMap = new Map([
  ['react', require('react/package.json').version],
  ['react-dom', require('react-dom/package.json').version],
  ['@tonic-ui/react', require('@tonic-ui/react/package.json').version],
]);
const imports = {
  react: `https://esm.sh/react@${versionMap.get('react')}?target=es2022`,
  'react-dom': `https://esm.sh/react-dom@${versionMap.get('react-dom')}?external=react&target=es2022`,
  'react-dom/client': `https://esm.sh/react-dom@${versionMap.get('react-dom')}/client?external=react&target=es2022`,
  'react/jsx-runtime': `https://esm.sh/react@${versionMap.get('react')}/jsx-runtime?external=react&target=es2022`,
  '@tonic-ui/react': `https://esm.sh/@tonic-ui/react@${versionMap.get('@tonic-ui/react')}?standalone&external=react,react-dom&target=es2022`,
};

const shared = id =>
  id === '@tonic-ui/react' || /^(react|react-dom)(\/|$)/.test(id);

export default defineConfig({
  plugins: [
    reactPlugin({ jsxRuntime: 'automatic' }),
    {
      name: 'cdn-import-map',
      transformIndexHtml() {
        return [{
          tag: 'script',
          attrs: { type: 'importmap' },
          children: JSON.stringify({ imports }, null, 2),
          injectTo: 'head-pre',
        }];
      },
    },
  ],
  build: {
    target: 'es2022',
    rollupOptions: { external: shared },
  },
});
