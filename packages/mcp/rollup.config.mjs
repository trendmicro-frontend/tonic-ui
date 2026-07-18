import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { codecovRollupPlugin } from '@codecov/rollup-plugin';
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import dts from 'rollup-plugin-dts';

const pkg = createRequire(import.meta.url)('./package.json');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const extensions = ['.js', '.ts', '.mjs'];
const isExternal = id => !id.startsWith('.') && !id.startsWith('/');

const babelPlugin = babel({
  configFile: './babel.config.js',
  babelHelpers: 'bundled',
  exclude: /node_modules/,
  extensions: extensions,
});

export default [
  {
    input: [
      path.resolve(__dirname, 'src', 'index.ts'),
    ],
    output: {
      file: path.resolve(__dirname, 'dist', 'index.cjs.js'),
      format: 'cjs',
      interop: 'auto',
    },
    external: isExternal,
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
        preventAssignment: true,
      }),
      babelPlugin,
      nodeResolve({ extensions }),
      // Put the Codecov rollup plugin after all other plugins
      codecovRollupPlugin({
        enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
        bundleName: pkg.name,
        uploadToken: process.env.CODECOV_TOKEN,
      }),
    ],
  },
  {
    input: [
      path.resolve(__dirname, 'src', 'index.ts'),
    ],
    output: {
      file: path.resolve(__dirname, 'dist', 'index.esm.js'),
      format: 'esm',
    },
    external: isExternal,
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
        preventAssignment: true,
      }),
      babelPlugin,
      nodeResolve({ extensions }),
      // Put the Codecov rollup plugin after all other plugins
      codecovRollupPlugin({
        enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
        bundleName: pkg.name,
        uploadToken: process.env.CODECOV_TOKEN,
      }),
    ],
  },
  {
    input: [
      path.resolve(__dirname, 'src', 'index.ts'),
    ],
    output: [
      {
        file: path.resolve(__dirname, 'dist', 'index.d.ts'),
        format: 'es',
      }
    ],
    plugins: [
      dts(),
    ],
  },
];
