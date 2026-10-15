import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { codecovRollupPlugin } from '@codecov/rollup-plugin';
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';
import commonjs from '@rollup/plugin-commonjs';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function injectGlobalTypes() {
  return {
    name: 'inject-global-types',
    renderChunk(code) {
      const globalTypes = fs.readFileSync(
        path.resolve(__dirname, 'global.d.ts'),
        'utf-8'
      );
      return globalTypes + '\n\n' + code;
    }
  };
}

const input = path.resolve(__dirname, 'src', 'index.ts');
const cjsOutputDirectory = path.resolve(__dirname, 'dist', 'cjs');
const esmOutputDirectory = path.resolve(__dirname, 'dist', 'esm');
const extensions = ['.js', '.jsx', '.ts', '.tsx', '.mjs'];
const isExternal = id => !id.startsWith('.') && !id.startsWith('/');

const babelPlugin = babel({
  configFile: './babel.config.js',
  babelHelpers: 'bundled',
  exclude: /node_modules/,
  extensions: extensions,
});

// The standalone build is the single-file CDN artifact: every non-peer
// dependency (including the sibling workspace packages) is inlined, while
// the React and Emotion families stay external and are provided by the
// consumer's import map as one shared instance each.
const standaloneExternal = id =>
  /^(react|react-dom)(\/|$)/.test(id) || id === '@emotion' || id.startsWith('@emotion/');

function missingSiblingDists() {
  return Object.keys(pkg.dependencies)
    .filter(name => name.startsWith('@tonic-ui/'))
    .filter(name => {
      const depPkgPath = require.resolve(`${name}/package.json`);
      const depPkg = require(depPkgPath);
      const moduleFile = depPkg.module || 'dist/esm/index.js';
      return !fs.existsSync(path.join(path.dirname(depPkgPath), moduleFile));
    });
}

// Only this package's own sources need transforming (TypeScript, the Emotion
// JSX pragma, the `css` prop); inlined dependency code is already compiled.
const standaloneBabelPlugin = babel({
  configFile: './babel.config.js',
  babelHelpers: 'bundled',
  exclude: /(node_modules|packages\/(?!react\/src)\S*)/,
  extensions: extensions,
});

// The single rule for standalone artifacts is enforced after minification
// (see scripts/minify-standalone.mjs): the emitted file may only import the
// external React and Emotion families.
const standaloneTarget = {
  input,
  output: {
    file: path.resolve(__dirname, 'dist', 'standalone', 'index.js'),
    format: 'esm',
  },
  external: standaloneExternal,
  plugins: [
    nodeResolve({ extensions }),
    commonjs({ include: /node_modules/ }),
    standaloneBabelPlugin,
    // Put the Codecov rollup plugin after all other plugins
    codecovRollupPlugin({
      enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
      bundleName: `${pkg.name}-standalone`,
      uploadToken: process.env.CODECOV_TOKEN,
    }),
  ],
};


const targets = [
  {
    input,
    output: {
      dir: cjsOutputDirectory,
      format: 'cjs',
      // https://rollupjs.org/guide/en/#changed-defaults
      // https://rollupjs.org/guide/en/#outputinterop
      interop: 'auto',
      preserveModules: true,
    },
    external: isExternal,
    plugins: [
      nodeResolve({ extensions }),
      babelPlugin,
      // Put the Codecov rollup plugin after all other plugins
      codecovRollupPlugin({
        enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
        bundleName: pkg.name,
        uploadToken: process.env.CODECOV_TOKEN,
      }),
    ],
  },
  {
    input,
    output: {
      dir: esmOutputDirectory,
      format: 'esm',
      preserveModules: true,
    },
    external: isExternal,
    plugins: [
      nodeResolve({ extensions }),
      babelPlugin,
      // Put the Codecov rollup plugin after all other plugins
      codecovRollupPlugin({
        enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
        bundleName: pkg.name,
        uploadToken: process.env.CODECOV_TOKEN,
      }),
    ],
  },
  {
    input,
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [
      dts(),
      injectGlobalTypes(),
    ],
  },
];
// "build:standalone" builds only the artifact (and fails fast when the
// sibling dists are missing); the regular build adds it when possible,
// skipping it with a warning during partial workspace builds.
const standaloneOnly = process.env.ROLLUP_ONLY_STANDALONE === '1';
const missing = missingSiblingDists();
if (missing.length > 0) {
  if (standaloneOnly) {
    throw new Error(
      `The standalone build needs these sibling packages built first: ${missing.join(', ')}. `
        + 'Run their "yarn build" (or a full workspace build), then retry.'
    );
  }
  console.warn(`[standalone] Skipping the standalone build: ${missing.join(', ')} are not built yet.`);
}
export default standaloneOnly
  ? [standaloneTarget]
  : missing.length > 0
    ? targets
    : [...targets, standaloneTarget];
