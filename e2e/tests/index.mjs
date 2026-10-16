// Example apps only. Each preview starts after its production build completes.
export const tests = [
  {
    name: 'app-cdn',
    specFile: 'tests/app-cdn.spec.mjs',
    dir: 'examples/app-cdn',
    build: { command: 'yarn', args: ['build'] },
    preview: { command: 'yarn', args: ['preview'] },
  },
  {
    name: 'app-cdn-with-local-fallback',
    specFile: 'tests/app-cdn-with-local-fallback.spec.mjs',
    dir: 'examples/app-cdn-with-local-fallback',
    build: { command: 'yarn', args: ['build'] },
    preview: { command: 'yarn', args: ['preview'] },
  },
];
