// Example apps only. Each preview starts after its production build completes.
export const tests = [
  {
    name: 'cdn-with-local-fallback',
    testMatch: '**/cdn-with-local-fallback.spec.mjs',
    dir: 'examples/cdn-with-local-fallback',
    build: { command: 'yarn', args: ['build'] },
    preview: { command: 'yarn', args: ['preview'] },
  },
];
