# Migration Comparison: tonic-one → tonic-ui

**Commit ported:** `a093754e6` — fix(react): remove false-positive useSlot slotProps warning

---

## Summary

| Aspect | tonic-one | tonic-ui |
|---|---|---|
| Package namespace | `@tonic-one/react-hooks` | `@tonic-ui/react-hooks` |
| Core change | identical | identical |
| Call-site rename | `ownerDisplayName` → `ownerName` | `ownerDisplayName` → `ownerName` |
| Files changed | 23 | 19 |
| New test file | `src/slot/__tests__/useSlot.test.js` | `src/slot/__tests__/useSlot.test.js` |
| Updated test file | `src/slot/__tests__/useSlot.test.js` (new) | `src/utils/__tests__/useSlot.test.js` (existing) |
| Regression test | `src/input/__tests__/InputControl.slots.test.js` | `src/input/__tests__/InputControl.slots.test.js` |

---

## Core change — `useSlot.js`

Both repos receive the same logical change. The only structural difference is the import package name.

### Before (both repos)
```js
const slotPropsLabel = name ? `slotProps.${name}` : 'slotProps';
const suffix = ownerDisplayName ? ` in ${ownerDisplayName}.` : '.';
useOnceWhen(() => {
  console.error(`useSlot: slot is required but was not provided${suffix}`);
}, process.env.NODE_ENV !== 'production' && slot === undefined);
useOnceWhen(() => {
  console.error(`useSlot: ${slotPropsLabel} is required but was not provided${suffix}`);
}, process.env.NODE_ENV !== 'production' && slotProps === undefined);
```

### After (both repos)
```js
{ // Assertion check
  const slotLabel = name ? `slots.${name}` : 'slot element';
  const suffix = ownerName ? ` in ${ownerName}.` : '.';
  useOnceWhen(() => {
    console.error(`useSlot: ${slotLabel} is required but was not provided${suffix}`);
  }, process.env.NODE_ENV !== 'production' && slot === undefined);
}
```

**Changes:**
- Removed `slotProps === undefined` assertion (was false-positive for new slots with no legacy counterpart)
- Renamed `ownerDisplayName` → `ownerName` (shorter, more conventional)
- Error message for missing slot now uses `slots.<name>` format (e.g. `slots.root`) instead of plain `slot`

---

## Call-site changes

Identical in both repos: every `useSlot({ ..., ownerDisplayName: X.displayName })` becomes `ownerName`.

**tonic-one** (16 files): AccordionContent, Alert, DatePickerContent, DrawerContent, DrawerOverlay, InputControl (×2), MenuContent, SubmenuContent, ModalContent, ModalOverlay, PopoverContent (×2), Tag, Toast, ToastManager, TooltipContent (×2), TreeItem

**tonic-ui** (16 files): same components

---

## Test differences

### tonic-one
- Created `src/slot/__tests__/useSlot.test.js` from scratch (repo had no prior slot-level test)
- Added `InputControl.slots.test.js` E2 regression

### tonic-ui
- `src/slot/__tests__/useSlot.test.js` — **new file**, mirrors tonic-one's new tests
- `src/utils/__tests__/useSlot.test.js` — **existing file**, updated:
  - `ownerDisplayName` → `ownerName` in fixtures
  - Removed 2 slotProps warning tests (`logs an error when slotProps is not provided`, `uses generic label in error when name is not provided`)
  - Updated slot error message: `slot is required` → `slots.transition is required`
  - Added `does not warn when slotProps is undefined` test
- `src/input/__tests__/InputControl.slots.test.js` — same E2 regression added as tonic-one

---

## Files changed in tonic-ui (this migration)

| File | Change |
|---|---|
| `src/slot/useSlot.js` | core logic (slotProps assertion removed, ownerName rename, message format) |
| `src/accordion/AccordionContent.js` | `ownerDisplayName` → `ownerName` |
| `src/alert/Alert.js` | `ownerDisplayName` → `ownerName` |
| `src/date-pickers/DatePicker/DatePickerContent.js` | `ownerDisplayName` → `ownerName` |
| `src/drawer/DrawerContent.js` | `ownerDisplayName` → `ownerName` |
| `src/drawer/DrawerOverlay.js` | `ownerDisplayName` → `ownerName` |
| `src/input/InputControl.js` | `ownerDisplayName` → `ownerName` (×2) |
| `src/menu/MenuContent.js` | `ownerDisplayName` → `ownerName` |
| `src/menu/SubmenuContent.js` | `ownerDisplayName` → `ownerName` |
| `src/modal/ModalContent.js` | `ownerDisplayName` → `ownerName` |
| `src/modal/ModalOverlay.js` | `ownerDisplayName` → `ownerName` |
| `src/popover/PopoverContent.js` | `ownerDisplayName` → `ownerName` (×2) |
| `src/tag/Tag.js` | `ownerDisplayName` → `ownerName` |
| `src/toast/Toast.js` | `ownerDisplayName` → `ownerName` |
| `src/toast/ToastManager.js` | `ownerDisplayName` → `ownerName` |
| `src/tooltip/TooltipContent.js` | `ownerDisplayName` → `ownerName` (×2) |
| `src/tree/TreeItem.js` | `ownerDisplayName` → `ownerName` |
| `src/slot/__tests__/useSlot.test.js` | **new** — 3 unit tests for the hook |
| `src/utils/__tests__/useSlot.test.js` | updated — removed old assertions, added no-warn test |
| `src/input/__tests__/InputControl.slots.test.js` | E2 regression added |

**Test result:** 22 tests passing across 3 suites.
