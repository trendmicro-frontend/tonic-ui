import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';

const packageName = process.env.PACKAGE_NAME;

const input = process.env.INPUT || path.resolve(__dirname, 'src', 'index.js');

const outputDirectory = process.env.OUTPUT_DIRECTORY || path.resolve(__dirname, 'dist');

const isExternal = id => !id.startsWith('.') && !id.startsWith('/');

const getBabelOptions = ({ useESModules }) => ({
  rootMode: 'upward',
  exclude: '**/node_modules/**',
  runtimeHelpers: true,
  plugins: [
    ['@babel/transform-runtime', { useESModules }],
  ],
});

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
      resolve(),
      babel(getBabelOptions({ useESModules: false })),
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
      resolve(),
      babel(getBabelOptions({ useESModules: true })),
    ],
  }
];
