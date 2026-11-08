// Standalone bundles for the Emotion specifiers the Tonic UI artifact leaves
// external, so a CDN can serve React, React DOM, Emotion, and the artifact from
// one origin. React stays external: every bundle shares the one React instance
// the import map supplies.
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const root = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root,
  base: './',
  publicDir: false,
  build: {
    outDir: process.env.EMOTION_BUILD_OUTDIR || resolve(root, 'dist-emotion'),
    emptyOutDir: true,
    target: 'es2022',
    modulePreload: false,
    rollupOptions: {
      input: {
        'emotion-react': resolve(root, 'entries/@emotion/react.js'),
        'emotion-styled-base': resolve(root, 'entries/@emotion/styled-base.js'),
        'emotion-is-prop-valid': resolve(root, 'entries/@emotion/is-prop-valid.js'),
      },
      external: id => id === 'react' || id.startsWith('react/'),
      // Keep the re-export entries intact; otherwise Rollup emits empty chunks.
      preserveEntrySignatures: 'strict',
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
      },
    },
  },
});
