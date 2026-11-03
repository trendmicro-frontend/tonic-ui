// Serves both `@emotion/react` and `@emotion/react/jsx-runtime`: the package
// already exports `jsx`, and the runtime adds `jsxs` and `Fragment`.
export * from '@emotion/react';
export { jsxs, Fragment } from '@emotion/react/jsx-runtime';
