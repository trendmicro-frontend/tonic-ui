# @tonic-ui/react-docs

A documentation site for the React Tonic UI component library.

## Documentation search

Search is client-side and has no external backend. `scripts/build-search-index.mjs`
indexes `pages/**/*.page.mdx` using document metadata from
`config/sidebar-routes.js`, then writes a content-hashed MiniSearch index and a
`manifest.json` to `public/search/`. The `dev` and `build` scripts run the indexer
after `update-docs.sh` and before Next.js starts.

- Shared index/search configuration: `search/config.mjs`
- Browser-side client: `search/client.mjs`
- Search dialog: `components/SearchModal.js`
- Unit tests: `yarn test:search-index`

Generated index files are ignored by git; do not commit them.
