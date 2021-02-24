module.exports = {
  extends: '@trendmicro/babel-config',
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', {
      /**
       * Decides which runtime to use.
       * - 'automatic' auto imports the functions that JSX transpiles to.
       * - 'classic' does not automatic import anything.
       */
      'runtime': 'classic', // defaults to classic
      //'runtime': 'automatic', // for React 16.14.0, React 17 and higher that supports the new transform
    }],
    '@emotion/babel-preset-css-prop',
  ],
};
