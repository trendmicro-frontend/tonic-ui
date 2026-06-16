# Loop: Migrate "fix(react): remove false-positive useSlot slotProps warning" from tonic-one (a093754e6) to tonic-ui
_Stop when: all units done, `yarn test --testPathPattern="useSlot|InputControl.slots"` green in tonic-ui packages/react_
_Branch: feat/slot-improvements     Posture: supervised     Budget: ~5 units_

## Done
- [x] Unit 1: Migrate `useSlot.js` core logic — slotProps assertion removed, ownerDisplayName→ownerName renamed, error message uses `slots.<name>` format
- [x] Unit 2: Rename `ownerDisplayName` → `ownerName` in all 16 call-site files — no `ownerDisplayName` remains in any src file
- [x] Unit 3: Update `src/utils/__tests__/useSlot.test.js` — removed slotProps warning tests, ownerName rename, updated slot error message format
- [x] Unit 4: Added `src/slot/__tests__/useSlot.test.js` + InputControl E2 regression — 22 tests passing across 3 suites
- [x] Unit 5: Comparison doc written at `docs/comparison.md`

## In progress

## Next

## Blocked

## Log
- 2026-06-16 Unit 1: PASS — useSlot.js updated (slotProps assertion removed, ownerDisplayName→ownerName, slot error message format changed)
- 2026-06-16 Unit 2: PASS — all 16 call sites renamed, grep confirmed no ownerDisplayName remains
- 2026-06-16 Unit 3: PASS — existing useSlot test file updated (removed slotProps assertions, added no-warn test)
- 2026-06-16 Unit 4: PASS — new slot/__tests__/useSlot.test.js created, InputControl E2 regression added; 22/22 tests pass
- 2026-06-16 Unit 5: PASS — docs/comparison.md written

## Docs
- `docs/comparison.md` — side-by-side tonic-one vs tonic-ui migration comparison

## Docs
