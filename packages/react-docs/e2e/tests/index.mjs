export const tests = [
  {
    name: 'cdn-with-local-fallback',
    specFile: 'cdn-with-local-fallback.spec.mjs',
    path: '/demos/cdn-with-local-fallback/',
    build: 'build:cdn-with-local-fallback',
  },
  {
    name: 'mfe-module-federation',
    specFile: 'mfe-module-federation.spec.mjs',
    path: '/demos/mfe-module-federation/shell/',
    build: 'build:mfe-module-federation',
  },
  {
    name: 'mfe-wujie',
    specFile: 'mfe-wujie.spec.mjs',
    path: '/demos/mfe-wujie/',
    build: 'build:mfe-wujie',
  },
];
