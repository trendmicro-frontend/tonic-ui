// Example apps only. Each preview starts after its production build completes.
export const tests = [
  {
    name: 'app-cdn',
    specFile: 'tests/app-cdn.spec.mjs',
    port: 4180,
    dir: 'examples/app-cdn',
    build: { command: 'yarn', args: ['build'] },
    preview: { command: 'yarn', args: ['preview', '--host', '127.0.0.1', '--port', '4180'] },
  },
  {
    name: 'app-cdn-with-local-fallback',
    specFile: 'tests/app-cdn-with-local-fallback.spec.mjs',
    port: 4181,
    dir: 'examples/app-cdn-with-local-fallback',
    build: { command: 'yarn', args: ['build'] },
    preview: { command: 'yarn', args: ['preview', '--host', '127.0.0.1', '--port', '4181'] },
  },
];
