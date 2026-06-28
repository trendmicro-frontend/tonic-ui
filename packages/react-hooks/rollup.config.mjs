import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { codecovRollupPlugin } from '@codecov/rollup-plugin';
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';

const pkg = createRequire(import.meta.url)('./package.json');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

export default [
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
    ],
  }
];
