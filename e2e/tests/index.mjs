// Example apps only. Each preview starts after its production build completes.
export const tests = [
  {
    name: 'cdn-without-fallback',
    specFile: 'tests/cdn-without-fallback.spec.mjs',
    dir: 'examples/cdn-without-fallback',
    build: { command: 'yarn', args: ['build'] },
    preview: { command: 'yarn', args: ['preview'] },
  },
  {
    name: 'cdn-with-fallback',
    specFile: 'tests/cdn-with-fallback.spec.mjs',
    dir: 'examples/cdn-with-fallback',
    build: { command: 'yarn', args: ['build'] },
    preview: { command: 'yarn', args: ['preview'] },
  },
];
