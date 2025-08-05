const plugins = [];
if (process.env.NODE_ENV === 'test') {
  // Enable async/await for jest
  plugins.push('@babel/plugin-transform-runtime');
}

module.exports = {
  extends: '@trendmicro/babel-config',
  plugins: [
    ...plugins,
  ],
  presets: [
    ['@babel/preset-env'],
    ['@babel/preset-typescript', {
      'rewriteImportExtensions': true // https://babeljs.io/docs/babel-preset-typescript#rewriteimportextensions
    }],
  ],
};
