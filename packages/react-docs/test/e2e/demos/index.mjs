// Demo contracts: each target builds into the isolated site served under
// the same /demos/ paths as the docs site.
export const tests = [
  {
    name: 'cdn-with-local-fallback',
    testMatch: '**/cdn-with-local-fallback.spec.mjs',
    path: '/demos/cdn-with-local-fallback/',
    build: ['node ../../examples/cdn-with-local-fallback/scripts/build.mjs --inspector "$E2E_DEMOS_DIR/cdn-with-local-fallback"'],
  },
  {
    name: 'mfe-module-federation',
    testMatch: '**/mfe-module-federation.spec.mjs',
    path: '/demos/mfe-module-federation/shell/',
    build: [
      'yarn vite build --config ../../examples/mfe-module-federation/remotes/widget-updates/vite.config.mjs --outDir "$E2E_DEMOS_DIR/mfe-module-federation/widget-updates"',
      'yarn vite build --config ../../examples/mfe-module-federation/remotes/widget-os/vite.config.mjs --outDir "$E2E_DEMOS_DIR/mfe-module-federation/widget-os"',
      'yarn vite build --config ../../examples/mfe-module-federation/remotes/inventory/vite.config.mjs --outDir "$E2E_DEMOS_DIR/mfe-module-federation/inventory"',
      'yarn vite build --config ../../examples/mfe-module-federation/shell/vite.config.mjs --outDir "$E2E_DEMOS_DIR/mfe-module-federation/shell"',
    ],
  },
  {
    name: 'mfe-wujie',
    testMatch: '**/mfe-wujie.spec.mjs',
    path: '/demos/mfe-wujie/',
    build: [
      'yarn vite build --config ../../examples/mfe-wujie/host/vite.config.mjs --outDir "$E2E_DEMOS_DIR/mfe-wujie" --emptyOutDir',
      'yarn vite build --config ../../examples/mfe-wujie/apps/widget-updates/vite.config.mjs --outDir "$E2E_DEMOS_DIR/mfe-wujie/apps/widget-updates"',
      'yarn vite build --config ../../examples/mfe-wujie/apps/widget-os/vite.config.mjs --outDir "$E2E_DEMOS_DIR/mfe-wujie/apps/widget-os"',
      'yarn vite build --config ../../examples/mfe-wujie/apps/inventory/vite.config.mjs --outDir "$E2E_DEMOS_DIR/mfe-wujie/apps/inventory"',
    ],
  },
];
