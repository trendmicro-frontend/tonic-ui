# Loop: Port List/ListItem component from tonic-one to tonic-ui
_Stop when: all units done and `cd packages/react && yarn build && yarn lint && yarn test` green, plus side-by-side verification passes_
_Branch: feat/list-component     Posture: supervised     Budget (run): n/a_

## Decisions
- Source: tonic-one `packages/react/src/list/` (List.js, ListItem.js, styles.js, index.js, __tests__)
- Target: tonic-ui `packages/react/src/list/`
- Adaptations: `import { forwardRef } from 'react'` (no default React import); package refs `@tonic-one/react` → `@tonic-ui/react`
- Sidebar placement: TYPOGRAPHY, between Highlight and Mark (alphabetical: Highlight < List < Mark)
- Export placement in index.js: between `./link` and `./mark` (alphabetical: link < list < mark)
- Changeset: `@tonic-ui/react` minor
- Final step: side-by-side verification between tonic-one and tonic-ui

## Done
- [x] U1 Create source files — `packages/react/src/list/{List.js,ListItem.js,styles.js,index.js}` — forwardRef import adapted, all files created
- [x] U2 Create test file — `packages/react/src/list/__tests__/List.test.js` — @tonic-ui/react imports, unused React import dropped
- [x] U3 Update `packages/react/src/index.js` — `export * from './list'` added between link and mark
- [x] U4 Update `packages/react/__tests__/index.test.js` — 'List' and 'ListItem' added to allowlist
- [x] U5 Update sidebar — List with `tag: ul` tooltip added to TYPOGRAPHY between Highlight and Mark
- [x] U6 Create docs pages — all 4 files created with @tonic-ui/react imports
- [x] U7 Update llms.txt — components/list added to Typography; experiments/list entry removed
- [x] U8 Create changeset — `@tonic-ui/react` minor
- [x] U9 Side-by-side verification — checker agent: PASS on all 9 file pairs and 5 structural checks
- [x] U10 PR #496 gap check — found 10 files still importing from @/experiments/list; repointed autocomplete/playground.js, modal/usage.js, and 8 experiments pages → @tonic-ui/react (65e9e755d3)

## In progress

## Next
_(empty — all units complete)_

## Blocked

## Log
- 2026-06-13 bootstrap: backlog decomposed from tonic-one source analysis and tonic-ui pattern review
