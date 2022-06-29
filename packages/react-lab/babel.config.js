const plugins = [];
if (process.env.NODE_ENV === 'test') {
  // Enable async/await for jest
  plugins.push('@babel/plugin-transform-runtime');
}

module.exports = {
  extends: '@trendmicro/babel-config',
  plugins,
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ],
};
