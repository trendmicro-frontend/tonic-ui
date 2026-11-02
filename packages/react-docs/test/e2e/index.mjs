export const tests = [
  {
    name: 'cdn-with-fallback',
    testMatch: '**/integrations/cdn-with-fallback.spec.mjs',
    path: '/demos/cdn-with-fallback/',
    build: 'build:cdn-with-fallback',
  },
  {
    name: 'cdn-with-fallback-docs',
    testMatch: '**/pages/cdn-with-fallback-docs.spec.mjs',
    path: '/integrations/cdn-with-fallback/',
    // Rendered by the docs dev server, not by a demo build.
    build: null,
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
