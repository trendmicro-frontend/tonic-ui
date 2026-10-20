export const tests = [
  {
    name: 'esm-cdn-with-fallback',
    specFile: 'esm-cdn-with-fallback.spec.mjs',
    path: '/demos/esm-cdn-with-fallback/',
    build: 'build:esm-cdn-with-fallback',
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
