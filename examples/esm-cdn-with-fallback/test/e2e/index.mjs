// Example apps only. Each preview starts after its production build completes.
export const tests = [
  {
    name: 'esm-cdn-with-fallback',
    testMatch: '**/esm-cdn-with-fallback.spec.mjs',
    dir: 'examples/esm-cdn-with-fallback',
    build: { command: 'yarn', args: ['build'] },
    preview: { command: 'yarn', args: ['preview'] },
  },
];
