// Demo contracts: the reference apps built into the docs site and served under
// /demos/. Each target is one build script plus the shared Vite preview.
export const tests = [
  {
    name: 'cdn-with-local-fallback',
    testMatch: '**/cdn-with-local-fallback.spec.mjs',
    path: '/demos/cdn-with-local-fallback/',
    build: 'build:cdn-with-local-fallback',
  },
  {
    name: 'mfe-module-federation',
    testMatch: '**/mfe-module-federation.spec.mjs',
    path: '/demos/mfe-module-federation/shell/',
    build: 'build:mfe-module-federation',
  },
  {
    name: 'mfe-wujie',
    testMatch: '**/mfe-wujie.spec.mjs',
    path: '/demos/mfe-wujie/',
    build: 'build:mfe-wujie',
  },
];
