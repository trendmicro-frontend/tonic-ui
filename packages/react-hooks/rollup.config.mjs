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
