const plugins = [];
if (process.env.NODE_ENV === 'test') {
  // Enable async/await for jest
  plugins.push('@babel/plugin-transform-runtime');
}

module.exports = {
  extends: '@trendmicro/babel-config',
  plugins: [
    ...plugins,
    '@emotion/babel-plugin',
  ],
  presets: [
    '@babel/preset-env',
    /**
     * @babel/preset-react
     *
     * - `runtime: 'automatic'`
     *     Babel auto-injects the JSX runtime import, so JSX files no longer need
     *     `import React from 'react'`. Named imports are still required for React APIs:
     *       - `import { useState, useRef, forwardRef, memo } from 'react'` ✅ still needed
     *       - `import React from 'react'`                                   ❌ not needed
     *
     * - `importSource: '@emotion/react'`
     *     Selects which JSX runtime to use:
     *       - `@emotion/react/jsx-runtime` (with importSource) — enables Emotion's `css` prop
     *       - `react/jsx-runtime`          (default)
     *
     * These two options are independent. `runtime` removes the need for `import React`;
     * `importSource` controls which runtime handles the JSX transform.
     */
    ['@babel/preset-react', {
      'runtime': 'automatic',
      'importSource': '@emotion/react',
    }],
  ],
};
