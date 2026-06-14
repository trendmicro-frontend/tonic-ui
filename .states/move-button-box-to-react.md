# Loop: Back-port ButtonBox to @tonic-ui/react (Phase 2)
_Stop when: all units done, experiment removed, and `cd packages/react && yarn build && yarn lint && yarn test` all green (modulo documented baseline failures). NOTE: tonic-ui has NO `test:types` script._
_Branch: feat/move-button-box-to-react     Posture: supervised_

## Source of truth
Mirrors the tonic-one Phase 1 migration (branch feat/move-button-box-to-react there),
adapted to tonic-ui conventions. Decisions carried over from the grill session.

## Mapping (tonic-one → tonic-ui)
- Namespace `@tonic-one/*` → `@tonic-ui/*` (utils, react-hooks, react).
- Barrel is `src/index.js` (NOT index.ts).
- `useDefaultProps` / `data-tonic` / `Box` from `../box`: identical, keep.
- `useButtonEventHandlers` exists & identical — LEAVE UNTOUCHED (ADR 0001 reasoning holds). Add sibling `useButtonBoxEventHandlers`.
- SKIP ForwardRefComponent / ButtonBoxProps JSDoc (per user — future branch). Use a plain leading comment like tonic-ui ButtonBase.
- NO `.test-d.tsx` type test (tonic-ui has no test:types). Tests = snapshot+a11y+behavioral + dedicated hook test.
- `__tests__/index.test.js` compares with `.sort()` → order-independent.
- Sidebar entry: NO tooltip (consistent with Phase 1).
- Changeset: `.changeset/tonic-ui-pr-button-box.md`, `@tonic-ui/react` minor.

## Units
- [ ] U1 Source: src/button-box/{ButtonBox.js (no ForwardRefComponent JSDoc), styles.js, index.js} + src/utils/useButtonBoxEventHandlers.js (@tonic-ui/react-hooks).
- [ ] U2 Export: src/index.js `export * from './button-box'` after './button'.
- [ ] U3 Tests: ButtonBox.test.js (snapshot+a11y+9 behavioral), useButtonBoxEventHandlers.test.js. NO test-d.
- [ ] U4 Docs: pages/components/button-box/ (mdx + variant-buttons + nested-buttons + utils/createVariantButtonBox repointed to @tonic-ui/react).
- [ ] U5 Sidebar: add to components FORM CONTROLS (no tooltip); remove experiments entry.
- [ ] U6 Remove experiment: delete experiments/button-box/ + pages/experiments/button-box/.
- [ ] U7 Repoint dangling @/experiments/button-box (grep source = 0).
- [ ] U8 llms.txt: remove experiments entry, add components entry.
- [ ] U9 index.test.js allowlist: add 'ButtonBox'.
- [ ] U10 Changeset: @tonic-ui/react minor.
- [ ] U11 Verify (checker): cd packages/react && yarn build && yarn lint && yarn test; react-docs lint; grep dangling = 0.

## In progress
## Done
## Blocked
- PR: tonic-ui is public GitHub (github.com/trendmicro-frontend/tonic-ui); push + PR is a human step.

## Log
- 2026-06-14 Phase 2 bootstrap: recon done, branch feat/move-button-box-to-react created off feat/button-box, mapping captured.
