module.exports = {
  extends: '@trendmicro/babel-config',
  presets: [
    '@babel/preset-env',
    ['@babel/preset-typescript', { rewriteImportExtensions: true }],
  ],
};
