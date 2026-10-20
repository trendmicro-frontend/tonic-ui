import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { codecovRollupPlugin } from '@codecov/rollup-plugin';
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';
import commonjs from '@rollup/plugin-commonjs';
import { transform } from 'esbuild';

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

// Rollup emits the full artifact as index.js. This final generation hook
// uses the former esbuild CLI options to emit the sibling minified file.
// The sourcemap is emitted as an asset so Rollup writes it with the bundle.
// __tests__/standalone-build.test.js verifies byte equality against esbuild CLI.
function standaloneMinify() {
  return {
    name: 'standalone-minify',
    async generateBundle(outputOptions, bundle) {
      const fullFileName = path.basename(outputOptions.file);
      const fullChunk = bundle[fullFileName];
      if (fullChunk?.type !== 'chunk') {
        throw new Error(`The standalone Rollup chunk "${fullFileName}" was not emitted.`);
      }

      const code = fullChunk.code.endsWith('\n')
        ? fullChunk.code
        : `${fullChunk.code}\n`;
      const result = await transform(code, {
        minify: true,
        format: 'esm',
        target: 'es2022',
        sourcemap: 'external',
        sourcefile: fullFileName,
        define: { 'process.env.NODE_ENV': '"production"' },
      });

      // The shipped minified file may only import the external React and
      // Emotion families. Minification removes comments before this scan.
      const importPatterns = [
        /\bimport\s*["']([^"'./][^"']*)["']/g,
        /\bimport\s*(?:(?:[\w$]+|\*\s*as\s*[\w$]+|\{[^{}]*\})(?:\s*,\s*(?:[\w$]+|\*\s*as\s*[\w$]+|\{[^{}]*\}))?)\s*from\s*["']([^"'./][^"']*)["']/g,
      ];
      const specifiers = new Set();
      for (const pattern of importPatterns) {
        for (const match of result.code.matchAll(pattern)) {
          specifiers.add(match[1]);
        }
      }
      const violations = [...specifiers].filter(id => !standaloneExternal(id));
      if (violations.length > 0) {
        throw new Error(
          `The standalone bundle imports outside the external set: ${violations.join(', ')}`
        );
      }

      const minifiedFileName = fullFileName.replace(/\.js$/, '.min.js');
      const sourceMapFileName = `${minifiedFileName}.map`;
      const minifiedCode = `${result.code}${result.code.endsWith('\n') ? '' : '\n'}//# sourceMappingURL=${sourceMapFileName}\n`;
      this.emitFile({
        type: 'asset',
        fileName: minifiedFileName,
        source: minifiedCode,
      });
      this.emitFile({
        type: 'asset',
        fileName: sourceMapFileName,
        source: result.map,
      });
    },
  };
}

const standaloneTarget = {
  input,
  output: {
    file: path.resolve(__dirname, 'dist', 'standalone', 'index.js'),
    format: 'esm',
    sourcemap: 'hidden',
  },
  external: standaloneExternal,
  plugins: [
    nodeResolve({ extensions }),
    commonjs({ include: /node_modules/ }),
    standaloneBabelPlugin,
    // Codecov runs after the chunk-transforming plugins; the minifier emits
    // its sibling asset after Codecov's render hooks.
    codecovRollupPlugin({
      enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
      bundleName: `${pkg.name}-standalone`,
      uploadToken: process.env.CODECOV_TOKEN,
    }),
    // Emit the minified sibling from the completed full chunk.
    standaloneMinify(),
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
// Both build commands include the standalone target. It requires sibling
// package distributions to be built first.
const standaloneOnly = process.env.BUILD_STANDALONE_ONLY === '1';
const missing = missingSiblingDists();
if (missing.length > 0) {
  throw new Error(
    `The standalone build needs these sibling packages built first: ${missing.join(', ')}. ` +
    'Run their "yarn build" (or a full workspace build), then retry.'
  );
}
export default standaloneOnly
  ? [standaloneTarget]
  : [...targets, standaloneTarget];
