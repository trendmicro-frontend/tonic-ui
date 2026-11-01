// Local runtime entry files. The package specifiers and import boundary
// predicates are defined by the manifest helpers used by the build.
export {
  isReact,
  isTonicUI,
  runtimeSpecifiers,
  specifiersMap,
} from './scripts/manifest.mjs';

// Keys are bundle names; each bundle is one Vite build of one entry file.
//
// The React family is two files: a module can expose one `default`, and both
// `react` and `react-dom` have default-import consumers. They must therefore
// build as separate bundles, but share one React instance because the
// `react-dom` build keeps `react` external.
export const localEntries = {
  // Serves `react`, `react-dom/client`, and `react/jsx-runtime` (-dev) from
  // one file. React is inlined exactly once.
  react: { specifier: 'react', file: 'entries/react.js' },
  // Serves `react-dom` only; `react` stays external.
  'react-dom': { specifier: 'react-dom', file: 'entries/react-dom.js' },
  // The @tonic-ui/react package closure, minus the React family, is one file.
  '@tonic-ui/react': { specifier: '@tonic-ui/react', file: 'entries/@tonic-ui/react.js' },
};
