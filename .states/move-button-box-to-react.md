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
_(all complete — commit d9f848e99d)_

## In progress
_(none)_

## Done
- [x] U1 Source: src/button-box/{ButtonBox.js (plain comment, no ForwardRefComponent JSDoc per user), styles.js, index.js} + src/utils/useButtonBoxEventHandlers.js (@tonic-ui/react-hooks) — d9f848e99d
- [x] U2 Export: src/index.js `export * from './button-box'` after './button' (d9f848e99d)
- [x] U3 Tests: ButtonBox.test.js (snapshot+a11y+9 behavioral) + useButtonBoxEventHandlers.test.js; NO test-d (tonic-ui has no test:types) (d9f848e99d)
- [x] U4 Docs: pages/components/button-box/ (component-style mdx + variant-buttons + nested-buttons + utils/createVariantButtonBox repointed to @tonic-ui/react) (d9f848e99d)
- [x] U5 Sidebar: added to components FORM CONTROLS (no tooltip), removed experiments entry (d9f848e99d)
- [x] U6 Remove experiment: deleted experiments/button-box/ + pages/experiments/button-box/ (d9f848e99d)
- [x] U7 Repoint dangling imports: source grep = 0 (only dist/.next artifacts) (d9f848e99d)
- [x] U8 llms.txt: removed experiments entry, added components entry (d9f848e99d)
- [x] U9 index.test.js allowlist: added 'ButtonBox' (.sort() compare, order-independent) (d9f848e99d)
- [x] U10 Changeset: .changeset/tonic-ui-pr-button-box.md, @tonic-ui/react minor (d9f848e99d)
- [x] U11 Verify (checker): build clean; focused button-box/hook tests 20/20; index.test ✓; react lint 47 = baseline (none ours); react-docs lint clean. Full suite: 743 pass / 4 fail — all 4 in pre-existing date-pickers/deprecated suites (NOT in change set). VERDICT PASS.

## Blocked
- PR: tonic-ui is public GitHub (github.com/trendmicro-frontend/tonic-ui); `git push` + PR is a human step. Branch not pushed.
- Changeset filename tonic-ui-pr-button-box.md → rename to tonic-ui-pr-<PR_NUMBER>.md once PR exists.

## Log
- 2026-06-14 Phase 2 bootstrap: recon done, branch feat/move-button-box-to-react created off feat/button-box, mapping captured.
- 2026-06-14 U1–U10 by maker subagents (Sonnet code/changeset, Opus docs); U11 checker PASS; committed d9f848e99d (21 files, +318/-154). Loop complete.
