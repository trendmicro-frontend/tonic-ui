// Local runtime entry files. The package specifiers and import boundary
// predicates live in the shared cdn-shared library and are re-exported here
// for the development script; the build scripts import cdn-shared directly.
export {
  isReact,
  isTonicUI,
  groupKey,
  runtimeSpecifiers,
  specifiersMap,
} from '../cdn-shared/manifest.mjs';

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
