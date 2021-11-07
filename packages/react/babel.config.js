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

    /**
     * https://emotion.sh/docs/@emotion/babel-preset-css-prop
     * A Babel preset to automatically enable Emotion's css prop when using the classic JSX runtime. If you want to use the new JSX runtimes please do not use this preset but rather just include our @emotion/babel-plugin directly and follow instructions for configuring the new JSX runtimes here.
     */
    '@emotion/babel-preset-css-prop',
  ],
};
