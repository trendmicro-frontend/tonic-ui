# @tonic-ui/react

A comprehensive React component library for Tonic UI.

## Installation

```sh
// with npm
npm install @tonic-ui/react

// with yarn
yarn add @tonic-ui/react
```

## Standalone CDN build

`dist/standalone/index.js` is the full, single-file ESM bundle;
`dist/standalone/index.min.js` is its minified, ES2022-targeted counterpart.
They bundle tree-shaken runtime code from all 13 direct dependencies below:

- `@popperjs/core`
- `@tonic-ui/react-base`
- `@tonic-ui/react-hooks`
- `@tonic-ui/react-icons`
- `@tonic-ui/styled-system`
- `@tonic-ui/theme`
- `@tonic-ui/utils`
- `date-fns`
- `ensure-type`
- `micro-memoize`
- `react-focus-lock`
- `react-is`
- `react-transition-group`

React, React DOM, and Emotion remain external peer dependencies. The host
application must provide compatible versions of `react` and `react-dom`
(`^18.3.0` or `^19.0.0`) and `@emotion/react` and `@emotion/styled` (`^11.0.0`).
For CDN use, map the artifact's React and Emotion imports to shared instances.

Serve `index.min.js` for CDN use. Its source map is `index.min.js.map`.
