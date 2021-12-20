import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';

const packageName = process.env.PACKAGE_NAME;

const input = process.env.INPUT
  || path.resolve(__dirname, 'src', 'index.js');

const outputDirectory = process.env.OUTPUT_DIRECTORY
  || path.resolve(__dirname, 'dist');

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
      file: path.join(outputDirectory, `${packageName}.js`),
      format: 'cjs',
      exports: 'auto',
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
      file: path.join(outputDirectory, 'es', `${packageName}.js`),
      format: 'esm',
    },
    external: isExternal,
    plugins: [
      resolve(),
      babel(getBabelOptions({ useESModules: true })),
    ],
  }
];
