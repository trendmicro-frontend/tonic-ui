import path from 'path';
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const packageName = process.env.PACKAGE_NAME;

const input = process.env.INPUT || path.resolve(__dirname, 'src', 'index.js');

const outputDirectory = process.env.OUTPUT_DIRECTORY || path.resolve(__dirname, 'dist');

const isExternal = id => !id.startsWith('.') && !id.startsWith('/');

export default [
  {
    input,
    output: {
      file: path.join(outputDirectory, `${packageName}.cjs.js`),
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
      file: path.join(outputDirectory, `${packageName}.esm.js`),
      format: 'esm',
    },
    external: isExternal,
    plugins: [
      nodeResolve(),
      babel({ babelHelpers: 'bundled' }),
    ],
  }
];
