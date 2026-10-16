// Keys are bundle names; each bundle is one Vite build of one entry file.
//
// The React family is two files: a module can expose one `default`, and both
// `react` and `react-dom` have default-import consumers. They must therefore
// build as separate bundles, but share one React instance because the
// `react-dom` build keeps `react` external.
export const localEntries = {
  // Serves `react`, `react-dom/client`, and `react/jsx-runtime` (-dev) from
  // one file. React is inlined exactly once.
  react: { react: { specifier: 'react', file: 'entries/react.js' } },
  // Serves `react-dom` only; `react` stays external.
  'react-dom': { 'react-dom': { specifier: 'react-dom', file: 'entries/react-dom.js' } },
  // One file per family: the entire Tonic UI closure minus the React family.
  tonic: { tonic: { specifier: '@tonic-ui/react', file: 'entries/tonic.js' } },
};

export const reactSpecifiers = [
  'react',
  'react-dom',
  'react-dom/client',
  'react/jsx-runtime',
  'react/jsx-dev-runtime',
];
export const tonicSpecifiers = ['@tonic-ui/react'];
export const isReact = id => /^(react|react-dom)(\/|$)/.test(id);
export const isTonic = id => id.startsWith('@tonic-ui/');
