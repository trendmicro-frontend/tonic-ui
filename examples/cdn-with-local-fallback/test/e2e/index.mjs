// Example apps only. Each preview starts after its production build completes.
export const tests = [
  {
    name: 'cdn-with-local-fallback',
    testMatch: '**/cdn-with-local-fallback.spec.mjs',
    dir: '.',
    build: { command: 'node', args: ['scripts/build.mjs', '.e2e/app'] },
    preview: { command: 'yarn', args: ['vite', 'preview', '--mode', 'app', '--outDir', '.e2e/app'] },
  },
];
