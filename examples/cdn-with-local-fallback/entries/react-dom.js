// React DOM root entry. React DOM stays inlined here, but `react` remains
// external so the inlined code resolves the shared React instance from the
// combined entry through the import map.
//
// The `default` export must exist: CJS peers (such as react-transition-group
// inside the Tonic bundle) consume `react-dom` through a default import. One
// module can only expose one `default`, so this entry is separate from the
// combined entry (whose `default` is the React namespace).
export * from 'react-dom';
export { default } from 'react-dom';
