// Combined React entry. One module serves the `react`, `react-dom/client`,
// and `react/jsx-runtime` (-dev) specifiers. React is inlined exactly once, so
// every import-map consumer (the app, the Tonic bundle, and the `react-dom`
// entry below) shares a single in-memory React instance.
//
// `Fragment` intentionally comes from `react` (the identical binding that
// `react/jsx-runtime` re-exports); a star export from `react/jsx-runtime`
// would make the name ambiguous and drop it.
export * from 'react';
export { default } from 'react';
export * from 'react-dom/client';
export { jsx, jsxs } from 'react/jsx-runtime';
export { jsxDEV } from 'react/jsx-dev-runtime';
