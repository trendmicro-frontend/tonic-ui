import path from 'path';
import { fileURLToPath } from 'url';
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const input = path.resolve(__dirname, 'src', 'index.js');
const cjsOutputDirectory = path.resolve(__dirname, 'dist', 'cjs');
const esmOutputDirectory = path.resolve(__dirname, 'dist', 'esm');
const isExternal = id => !id.startsWith('.') && !id.startsWith('/');

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
      dir: esmOutputDirectory,
      format: 'esm',
      preserveModules: true,
    },
    external: isExternal,
    plugins: [
      nodeResolve(),
      babel({ babelHelpers: 'bundled' }),
    ],
  }
];
