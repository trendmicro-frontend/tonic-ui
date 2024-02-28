import path from 'path';
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const packageName = process.env.PACKAGE_NAME;

const input = process.env.INPUT || path.resolve(__dirname, 'src', 'index.js');

const cjsOutputDirectory = process.env.CJS_OUTPUT_DIRECTORY || path.resolve(__dirname, 'dist', 'cjs');
const esmOutputDirectory = process.env.ESM_OUTPUT_DIRECTORY || path.resolve(__dirname, 'dist', 'esm');

const isExternal = id => !id.startsWith('.') && !id.startsWith('/');

export default [
  {
    input,
    output: {
      file: path.join(cjsOutputDirectory, `${packageName}.js`),
      format: 'cjs',

      // https://rollupjs.org/guide/en/#changed-defaults
      // https://rollupjs.org/guide/en/#outputinterop
      interop: 'auto',
    },
    external: isExternal,
    plugins: [
      nodeResolve(),
      babel({ babelHelpers: 'bundled' }),
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
      nodeResolve(),
      babel({ babelHelpers: 'bundled' })
    ],
  },
];
