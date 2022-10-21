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

      // The `@tonic-ui/theme` package mixed default and named exports. See `output.exports` for more info.
      //
      // https://rollupjs.org/guide/en/#outputexports
      // As with regular entry points, files that mix default and named exports will produce warnings.
      // You can avoid the warnings by forcing all files to use named export mode via output.exports: "named".
      // In that case, the default export needs to be accessed via the .default property of the export.
      exports: 'named',
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
