export const tests = [
  {
    name: 'docs-search',
    testMatch: '**/pages/*.spec.mjs',
    build: 'build:search-e2e',
    server: 'search',
  },
  {
    name: 'esm-cdn-with-fallback',
    testMatch: '**/integrations/esm-cdn-with-fallback.spec.mjs',
    path: '/demos/esm-cdn-with-fallback/',
    build: 'build:esm-cdn-with-fallback',
  },
  {
    name: 'mfe-module-federation',
    testMatch: '**/integrations/mfe-module-federation.spec.mjs',
    path: '/demos/mfe-module-federation/shell/',
    build: 'build:mfe-module-federation',
  },
  {
    name: 'mfe-wujie',
    testMatch: '**/integrations/mfe-wujie.spec.mjs',
    path: '/demos/mfe-wujie/',
    build: 'build:mfe-wujie',
  },
];
