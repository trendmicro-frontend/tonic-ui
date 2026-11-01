// Example apps only. Each preview starts after its production build completes.
export const tests = [
  {
    name: 'cdn-with-fallback',
    testMatch: '**/cdn-with-fallback.spec.mjs',
    dir: 'examples/cdn-with-fallback',
    build: { command: 'yarn', args: ['build'] },
    preview: { command: 'yarn', args: ['preview'] },
  },
];
