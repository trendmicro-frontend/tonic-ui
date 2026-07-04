# Tonic UI `__sx` Internals Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: this plan feeds the `fedex-dev:loop-engineering`
> skill, not `superpowers:executing-plans`. Tasks 1-6 below are fully-worked reference
> implementations (one per confirmed pattern) — complete, verified, ready to execute directly.
> Task 7 bootstraps `.states/tonic-ui-sx-internals/STATE.md`, whose `## Next` backlog (listed
> in full at the end of this document) is executed unit-by-unit by the loop, using Tasks 1-6 as
> the canonical pattern each unit's maker subagent follows.

**Goal:** Migrate every internal component in `@tonic-ui/react` (and the confirmed instances in
`@tonic-ui/react-data-grid`) off ad hoc style-prop/`sx` authoring and onto the internal `__sx`
base-styling channel, per `docs/adr/2026-06-29-sx-as-universal-base-channel.md`, so that a
component's own base styling always structurally loses to a consumer override regardless of which
CSS property either touches.

**Architecture:** Every component's `useXxxStyle()` hook (or, for the handful of components that
compute styling inline rather than via a hook, the newly-centralized equivalent) returns its
**complete** base — flat layout, pseudo rules, nested selectors — as one value. That value is
folded via `mergeSx(ownBase, incoming__sx)` into the `__sx` prop of the `Box` (or `Box`-based
child) it renders, placed **after** `{...rest}` in JSX so the explicit `__sx` wins the spread.
Five patterns cover every real occurrence found across two independent multi-agent coverage
sweeps of `packages/react/src` and `packages/react-data-grid/src` (94 + 35 raw candidate findings,
reconciled and adversarially verified down to the confirmed list below). This plan is a pure
refactor — no behavior changes, no new props, no new tests-from-scratch. Each task's "test" step
is the existing jest snapshot/unit suite: run it before, apply the diff, run it after, and confirm
the snapshot diff is **tier-reorder only** (properties move from the style-props declaration block
to the `__sx` declaration block within the same Emotion class — no value or rule is added,
changed, or dropped). This is the same tier-reorder signature documented in
`docs/adr/2026-06-29-sx-as-universal-base-channel.md`'s "Duplicate declarations in snapshots"
section for PR #507.

**Tech Stack:** React (`forwardRef`), Emotion (`@emotion/styled`, via `Box` from
`@tonic-ui/react-base`), `@tonic-ui/utils/internal`'s `mergeSx`, `react-transition-group`
(`Transition`, used by the animation-driven components), jest + `@emotion/jest/serializer` for
snapshot tests, `@testing-library/react` via `packages/react/test-utils/render.js`.

## Global Constraints

These apply to every task and every backlog unit; they are the load-bearing rules from
`docs/adr/2026-06-29-sx-as-universal-base-channel.md` and `.claude/skills/tonic-ui-sx/SKILL.md`,
restated here so a maker subagent executing a backlog unit doesn't have to re-derive them:

- `__sx` is the sole channel a component uses to author its **own** base styling. `sx` is
  consumer-only — a component must never write its own look to `sx`.
- `mergeSx(...)` performs **array composition** (`[...ensureArray(a), ...ensureArray(b)]`), never
  object-merge (`{...a, ...b}`). Object-merging a nested key like `&:hover` silently discards the
  earlier value's `&:hover` entirely.
- Call convention: `const { __sx: __sxProp, ...rest } = useDefaultProps(...)` (or, for components
  not using `useDefaultProps`, plain prop destructuring) — inline, in one destructure. Never
  capture the whole props bag (`const props = useDefaultProps(...)`) and re-destructure from it.
- `__sx={mergeSx(ownBase, __sxProp)}` is placed **after** `{...rest}` in JSX, so the explicit
  `__sx` prop wins over anything `rest` might (incorrectly) carry.
- Every `useXxxStyle()` hook returns the component's **complete** base (flat + pseudo + nested) in
  one value. There is no separate `get*Sx` helper — if one exists today (inline in the component
  file, not in `styles.js`), it is centralized into the hook as part of the same task that applies
  the `__sx` fold.
- A component authored through `useSlot` does **not** hand-fold `__sx` itself — pass the base into
  the slot's `props.__sx` argument; `useSlot` already merges it with any `slotProps.<name>.__sx`
  via `mergeSx` internally. Hand-merging outside the hook double-applies or silently drops the
  fold.
- A wrapper component overriding a **child** component it renders (not its own `Box`) injects the
  override via the child's `__sx`, never the child's `sx` — mirrors the already-correct
  `menu/MenuButton.js`-over-`Button` example.
- Dynamic, per-render/per-frame values that also feed a raw DOM `style={}` object (transition
  render-prop components; live drag/resize measurements) stay **out** of `__sx`/`sx` entirely.
  `__sx`/`sx` route through Emotion's class-based serialization — a value that changes on every
  frame would mint a new stylesheet class per frame with no garbage collection. Raw `style` is a
  direct DOM property mutation with no such cost; it is the correct mechanism for these values, not
  a migration gap. Only a component's **persistent** base (the part that doesn't change every
  render) is eligible for `__sx`.
- No task in this plan changes any consumer-facing prop or public type. `__sx` is already
  internal/undocumented; every diff here is behavior-preserving.

## File Structure

| File | Task | Change |
|---|---|---|
| `packages/react/src/divider/Divider.js` | 1 | Modify — Pattern A reference |
| `packages/react/src/checkbox/CheckboxControlBox.js` | 2 | Modify — Pattern B reference |
| `packages/react/src/checkbox/styles.js` | 2 | Modify — centralize inline style-building |
| `packages/react/src/modal/ModalContent.js` | 3 | Modify — Pattern C reference |
| `packages/react/src/accordion/AccordionToggleIcon.js` | 4 | Modify — Pattern D reference |
| `packages/react/src/progress/CircularProgress.js` | 5 | Modify — prerequisite for Task 5's Pattern E |
| `packages/react/src/progress/styles.js` | 5 | Modify — split SVG/Track/Indicator style hooks from new get*Attrs functions |
| `packages/react/src/spinner/Spinner.js` | 5 | Modify — Pattern E reference |
| `packages/react-data-grid/src/core/CoreColumnWidth.js` | 6 | Modify — confirmed exception + in-scope fix |
| `.states/tonic-ui-sx-internals/STATE.md` | 7 | Create — loop spine |
| `.states/tonic-ui-sx-internals/.gitignore` | 7 | Create — whitelist |

---

### Task 1: Pattern A reference — `Divider` (simple spread → `__sx`)

**Files:**
- Modify: `packages/react/src/divider/Divider.js`
- Test: `packages/react/src/divider/__tests__/Divider.test.js` (existing, unchanged — only its
  snapshot is regenerated)

**Interfaces:**
- Consumes: `mergeSx` from `@tonic-ui/utils/internal` (existing export, no change needed there).
- Produces: nothing new — `Divider`'s public props are unchanged.

This is the baseline shape every Pattern-A backlog unit (~34 directories, listed in the Backlog
section) follows: a component whose `useXxxStyle()` result is spread directly as flat props onto
`Box`, with no `sx`/`__sx` involved at all today.

- [ ] **Step 1: Run the existing test to establish the pre-change baseline**

Run: `cd packages/react && yarn test --testPathPattern="Divider"`
Expected: PASS (existing snapshot matches current output).

- [ ] **Step 2: Apply the `__sx` fold**

Current `packages/react/src/divider/Divider.js`:

```js
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { useDividerStyle } from './styles';

const Divider = forwardRef((inProps, ref) => {
  const {
    orientation = 'horizontal',
    variant = 'solid',
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Divider' });
  const styleProps = useDividerStyle({ orientation, variant });

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...rest}
    />
  );
});

Divider.displayName = 'Divider';

export default Divider;
```

Replace with:

```js
import { mergeSx } from '@tonic-ui/utils/internal';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { useDividerStyle } from './styles';

const Divider = forwardRef((inProps, ref) => {
  const {
    __sx: __sxProp,
    orientation = 'horizontal',
    variant = 'solid',
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Divider' });
  const styleProps = useDividerStyle({ orientation, variant });

  return (
    <Box
      ref={ref}
      {...rest}
      __sx={mergeSx(styleProps, __sxProp)}
    />
  );
});

Divider.displayName = 'Divider';

export default Divider;
```

`packages/react/src/divider/styles.js` is unchanged — `useDividerStyle` already returns its
complete base in one value.

- [ ] **Step 3: Run the test again and update the snapshot**

Run: `cd packages/react && yarn test --testPathPattern="Divider" -u`
Expected: PASS. Inspect the updated snapshot diff: the `border-top`/`border-top-color`/
`border-top-style` (or `border-left-*` for vertical) declarations must still be present with the
same values — only their position within the Emotion class's declaration block may shift. No
value should change, appear, or disappear.

- [ ] **Step 4: Commit**

```bash
git add packages/react/src/divider/Divider.js packages/react/src/divider/__tests__/__snapshots__
git commit -m "refactor(react): route Divider base style through __sx"
```

---

### Task 2: Pattern B reference — `CheckboxControlBox` (hand-merged own `sx` → centralize + fold)

**Files:**
- Modify: `packages/react/src/checkbox/CheckboxControlBox.js`
- Modify: `packages/react/src/checkbox/styles.js`
- Test: `packages/react/src/checkbox/__tests__/CheckboxControlBox.test.js` (existing, unchanged —
  snapshot regenerated)

**Interfaces:**
- Consumes: `mergeSx` from `@tonic-ui/utils/internal`.
- Produces: `useCheckboxControlBoxStyle({ indeterminate, size, variantColor })` — the hook's
  signature changes (previously took no arguments); any other caller of this hook must be updated
  to pass these three values. (Today there is exactly one caller: `CheckboxControlBox.js` itself,
  updated in this same task.)

This is the reference shape for every Pattern-B backlog unit (`Checkbox.js`'s inner `Box`,
`RadioControlBox.js`, `SwitchControlBox.js`, `table/TableCell.js`, `popover/PopoverArrow.js`,
`tooltip/TooltipArrow.js`): a component that hand-builds its own `sx` object inline (not via
`styles.js`) and/or hand-merges a consumer's `sx` via `ensureArray`/array-spread. The fix has two
parts: centralize the inline style-building logic into the shared `useXxxStyle()` hook (so it
returns the **complete** base, per the Global Constraints), then apply the standard fold.

- [ ] **Step 1: Run the existing test to establish the pre-change baseline**

Run: `cd packages/react && yarn test --testPathPattern="CheckboxControlBox"`
Expected: PASS.

- [ ] **Step 2: Centralize the inline style-building helpers into `styles.js`**

Current `packages/react/src/checkbox/styles.js`:

```js
const useCheckboxStyle = ({ disabled }) => {
  return {
    display: 'inline-flex',
    verticalAlign: 'top',
    alignItems: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
  };
};

const useCheckboxControlBoxStyle = () => {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    userSelect: 'none',
  };
};

export {
  useCheckboxStyle,
  useCheckboxControlBoxStyle,
};
```

Replace with:

```js
import { ensureString } from 'ensure-type';

const useCheckboxStyle = ({ disabled }) => {
  return {
    display: 'inline-flex',
    verticalAlign: 'top',
    alignItems: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
  };
};

const getCheckboxControlBoxSelector = (pseudos) => {
  return `input[type="checkbox"]` + ensureString(pseudos) + ' + &';
};

const getDeterminateStyle = ({ variantColor }) => {
  const color = 'text._fixed.dark.accent';
  const hoverColor = color;
  const disabledColor = color;
  const checkedColor = color;
  const checkedAndHoverColor = color;
  const checkedAndFocusVisibleColor = color;
  const checkedAndDisabledColor = 'text.disabled';

  // background color
  const backgroundColor = 'transparent';
  const hoverBackgroundColor = '_foreground.subtle.hovered';
  const disabledBackgroundColor = backgroundColor;
  const checkedBackgroundColor = variantColor === 'blue' ? '_foreground.primaryVariant.selected' : `${variantColor}.600`;
  const checkedAndHoverBackgroundColor = variantColor === 'blue' ? '_foreground.primaryVariant.selectedHovered' : `${variantColor}.500`;
  const checkedAndFocusVisibleBackgroundColor = checkedBackgroundColor;
  const checkedAndDisabledBackgroundColor = '_foreground.primaryVariant.selectedDisabled';

  // border color
  const borderColor = 'border._primary.enabled';
  const hoverBorderColor = variantColor === 'blue' ? 'border._primary.hovered' : `${variantColor}.500`;
  const disabledBorderColor = 'border._primary.disabled';
  const checkedBorderColor = checkedBackgroundColor;
  const checkedAndHoverBorderColor = checkedAndHoverBackgroundColor;
  const checkedAndDisabledBorderColor = checkedAndDisabledBackgroundColor;

  // :focus-visible
  const focusVisibleOutlineColor = '_component.keyboardFocused.outerFocusRing';
  const checkedFocusVisibleBorderColor = '_component.keyboardFocused.innerFocusRing';

  return {
    backgroundColor: backgroundColor,
    borderColor: borderColor,
    color: color, // icon color
    [getCheckboxControlBoxSelector(':hover')]: {
      backgroundColor: hoverBackgroundColor,
      borderColor: hoverBorderColor,
      color: hoverColor, // icon color
    },
    [getCheckboxControlBoxSelector(':disabled')]: {
      backgroundColor: disabledBackgroundColor,
      borderColor: disabledBorderColor,
      color: disabledColor, // icon color
    },
    [getCheckboxControlBoxSelector(':focus-visible')]: {
      outlineColor: focusVisibleOutlineColor,
      outlineStyle: 'solid',
      outlineWidth: '1h',
    },
    [getCheckboxControlBoxSelector(':checked')]: {
      backgroundColor: checkedBackgroundColor,
      borderColor: checkedBorderColor,
      color: checkedColor, // icon color
    },
    [getCheckboxControlBoxSelector(':checked:hover:not(:disabled)')]: {
      backgroundColor: checkedAndHoverBackgroundColor,
      borderColor: checkedAndHoverBorderColor,
      color: checkedAndHoverColor, // icon color
    },
    [getCheckboxControlBoxSelector(':checked:focus-visible')]: {
      borderColor: checkedFocusVisibleBorderColor,
      color: checkedAndFocusVisibleColor, // icon color
      outlineColor: focusVisibleOutlineColor,
      outlineOffset: 0,
      outlineStyle: 'solid',
      outlineWidth: '1h',
    },
    [getCheckboxControlBoxSelector(':checked:focus-visible:hover')]: {
      borderColor: checkedFocusVisibleBorderColor,
    },
    [getCheckboxControlBoxSelector(':checked:focus-visible') + '> div:first-of-type']: {
      backgroundColor: checkedAndFocusVisibleBackgroundColor,
    },
    [getCheckboxControlBoxSelector(':checked:disabled')]: {
      backgroundColor: checkedAndDisabledBackgroundColor,
      borderColor: checkedAndDisabledBorderColor,
      color: checkedAndDisabledColor, // icon color
      borderWidth: 0,
    },
  };
};

const getIndeterminateStyle = ({ variantColor }) => {
  // icon color
  const color = variantColor === 'blue' ? '_foreground.primaryVariant.selected' : `${variantColor}.600`;

  const hoverColor = variantColor === 'blue' ? '_foreground.primaryVariant.selectedHovered' : `${variantColor}.500`;

  const disabledColor = 'text.disabled';

  // border color
  const borderColor = 'border._primary.enabled';
  const hoverBorderColor = variantColor === 'blue' ? 'border._primary.selectedHovered' : `${variantColor}.500`;
  const disabledBorderColor = 'border._primary.disabled';

  // :focus-visible
  const focusVisibleColor = variantColor === 'blue' ? '_foreground.primaryVariant.selected' : `${variantColor}.600`;

  const focusVisibleBorderColor = 'border._primary.enabled';

  const focusVisibleOutlineColor = variantColor === 'blue' ? '_component.keyboardFocused.outerFocusRing' : `${variantColor}.600`;

  return {
    [getCheckboxControlBoxSelector('[data-indeterminate]')]: {
      borderColor,
      color, // icon color
    },
    [getCheckboxControlBoxSelector('[data-indeterminate]:hover:not(:disabled)')]: {
      borderColor: hoverBorderColor,
      color: hoverColor, // icon color
    },
    [getCheckboxControlBoxSelector('[data-indeterminate]:focus-visible')]: {
      borderColor: focusVisibleBorderColor,
      color: focusVisibleColor, // icon color
      outlineColor: focusVisibleOutlineColor,
      outlineOffset: 0,
      outlineStyle: 'solid',
      outlineWidth: '1h',
    },
    [getCheckboxControlBoxSelector('[data-indeterminate]:disabled')]: {
      borderColor: disabledBorderColor,
      color: disabledColor, // icon color
    },
  };
};

const useCheckboxControlBoxStyle = ({ indeterminate, size, variantColor }) => {
  const width = {
    lg: '6x',
    md: '4x',
    sm: '3x',
  }[size];
  const height = {
    lg: '6x',
    md: '4x',
    sm: '3x',
  }[size];

  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    userSelect: 'none',
    position: 'relative',
    border: 1.5,
    borderRadius: 'sm',
    width,
    height,
    zIndex: 0,
    [getCheckboxControlBoxSelector() + '> *']: {
      opacity: 0,
    },
    [getCheckboxControlBoxSelector(':checked') + '> *']: {
      opacity: 1,
    },
    [getCheckboxControlBoxSelector('[data-indeterminate]') + '> *']: {
      opacity: 1,
    },
    ...(!!indeterminate ? getIndeterminateStyle({ variantColor }) : getDeterminateStyle({ variantColor })),
  };
};

export {
  useCheckboxStyle,
  useCheckboxControlBoxStyle,
};
```

- [ ] **Step 3: Simplify `CheckboxControlBox.js` to the standard fold**

Current `packages/react/src/checkbox/CheckboxControlBox.js`:

```js
import { ariaAttr } from '@tonic-ui/utils';
import { ensureArray, ensureString } from 'ensure-type';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useTheme } from '../theme';
import { defaultSize, defaultVariantColor } from './constants';
import IconChecked from './IconChecked';
import IconIndeterminate from './IconIndeterminate';
import {
  useCheckboxControlBoxStyle,
} from './styles';

const CheckboxControlBox = forwardRef((inProps, ref) => {
  const {
    indeterminate,
    size = defaultSize,
    variantColor = defaultVariantColor,
    sx: sxProp,
    ...rest
  } = inProps;
  const { sizes } = useTheme();
  const iconSize = {
    lg: sizes['6x'],
    md: sizes['4x'],
    sm: sizes['3x'],
  }[size];
  const width = {
    lg: '6x',
    md: '4x',
    sm: '3x',
  }[size];
  const height = {
    lg: '6x',
    md: '4x',
    sm: '3x',
  }[size];
  const inputType = 'checkbox';
  const getCheckboxControlBoxSelector = (pseudos) => {
    return `input[type="${inputType}"]` + ensureString(pseudos) + ' + &';
  };
  const getDeterminateStyle = ({ variantColor }) => { /* ... */ };
  const getIndeterminateStyle = ({ variantColor }) => { /* ... */ };
  const sx = {
    position: 'relative',
    border: 1.5,
    borderRadius: 'sm',
    width,
    height,
    zIndex: 0,
    [getCheckboxControlBoxSelector() + '> *']: {
      opacity: 0,
    },
    [getCheckboxControlBoxSelector(':checked') + '> *']: {
      opacity: 1,
    },
    [getCheckboxControlBoxSelector('[data-indeterminate]') + '> *']: {
      opacity: 1,
    },
    ...(!!indeterminate ? getIndeterminateStyle({ variantColor }) : getDeterminateStyle({ variantColor })),
  };
  const styleProps = useCheckboxControlBoxStyle();

  return (
    <Box
      aria-hidden={ariaAttr(true)}
      role="checkbox"
      sx={[sx, ...ensureArray(sxProp)]}
      {...styleProps}
      {...rest}
    >
      {!!indeterminate ? <IconIndeterminate size={iconSize} /> : <IconChecked size={iconSize} />}
    </Box>
  );
});

CheckboxControlBox.displayName = 'CheckboxControlBox';

export default CheckboxControlBox;
```

Replace with:

```js
import { ariaAttr } from '@tonic-ui/utils';
import { mergeSx } from '@tonic-ui/utils/internal';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useTheme } from '../theme';
import { defaultSize, defaultVariantColor } from './constants';
import IconChecked from './IconChecked';
import IconIndeterminate from './IconIndeterminate';
import {
  useCheckboxControlBoxStyle,
} from './styles';

const CheckboxControlBox = forwardRef((inProps, ref) => {
  const {
    __sx: __sxProp,
    indeterminate,
    size = defaultSize,
    variantColor = defaultVariantColor,
    ...rest
  } = inProps;
  const { sizes } = useTheme();
  const iconSize = {
    lg: sizes['6x'],
    md: sizes['4x'],
    sm: sizes['3x'],
  }[size];
  const styleProps = useCheckboxControlBoxStyle({ indeterminate, size, variantColor });

  return (
    <Box
      aria-hidden={ariaAttr(true)}
      role="checkbox"
      {...rest}
      __sx={mergeSx(styleProps, __sxProp)}
    >
      {!!indeterminate ? <IconIndeterminate size={iconSize} /> : <IconChecked size={iconSize} />}
    </Box>
  );
});

CheckboxControlBox.displayName = 'CheckboxControlBox';

export default CheckboxControlBox;
```

Note: `CheckboxControlBox` reads `inProps` directly (not `useDefaultProps`) today — this task
preserves that as-is; only the `__sx`/`sx` handling changes.

- [ ] **Step 4: Run the test again and update the snapshot**

Run: `cd packages/react && yarn test --testPathPattern="CheckboxControlBox" -u`
Expected: PASS. Every declaration present before (backgrounds, borders, the full determinate/
indeterminate pseudo-selector set) must still be present with identical values — only tier
position shifts.

- [ ] **Step 5: Commit**

```bash
git add packages/react/src/checkbox/CheckboxControlBox.js packages/react/src/checkbox/styles.js packages/react/src/checkbox/__tests__/__snapshots__
git commit -m "refactor(react): centralize CheckboxControlBox style into styles.js and route through __sx"
```

---

### Task 3: Pattern C reference — `ModalContent` (`useSlot`-authored root)

**Files:**
- Modify: `packages/react/src/modal/ModalContent.js`
- Test: `packages/react/src/modal/__tests__/ModalContent.test.js` (existing, unchanged — snapshot
  regenerated)

**Interfaces:**
- Consumes: `useSlot` from `../slot` (existing — already internally folds `__sx` via `mergeSx`
  across its `props`/`slotProps` arguments; see `packages/react/src/slot/useSlot.js`). No change
  to `useSlot` itself.
- Produces: nothing new — `ModalContent`'s public props are unchanged.

This is the reference shape for every Pattern-C backlog unit (`ModalOverlay.js`,
`DrawerContent.js`, `DrawerOverlay.js`, `PopoverContent.js`, `TooltipContent.js`,
`DatePickerContent.js`): a component whose root element is authored via `useSlot`. `useSlot`
already merges an incoming base (`props.__sx`) with any caller-supplied override
(`slotProps.<name>.__sx`) via `mergeSx` internally — the component must **not** hand-merge again
outside the hook; that reintroduces exactly the double-fold/silent-drop bug the hook exists to
prevent.

- [ ] **Step 1: Run the existing test to establish the pre-change baseline**

Run: `cd packages/react && yarn test --testPathPattern="ModalContent"`
Expected: PASS.

- [ ] **Step 2: Move `styleProps` into the `useSlot` call's `props.__sx`**

In `packages/react/src/modal/ModalContent.js`, locate the `TransitionSlot` `useSlot` call:

```js
  const styleProps = useModalContentStyle({ placement, scrollBehavior, size, tabIndex });

  const [CloseButtonSlot, closeButtonSlotProps] = useSlot({
    name: 'closeButton',
    ownerName: ModalContent.displayName,
    props: {},
    slot: slots.closeButton ?? ModalCloseButton,
    slotProps: slotProps.closeButton,
  });

  const [TransitionSlot, transitionSlotProps] = useSlot({
    name: 'transition',
    ownerName: ModalContent.displayName,
    props: {
      ref: combinedRef,
      appear: !!modalContext,
      'aria-modal': ariaAttr(true),
      role: 'dialog',
      tabIndex,
    },
    slot: slots.transition ?? TransitionComponent ?? Fade,
    slotProps: { ...TransitionProps, ...slotProps.transition },
  });

  return (
    <TransitionSlot
      {...transitionSlotProps}
      {...styleProps}
      {...rest}
      in={modalContext ? isOpen : true}
```

Change the `useSlot` call's `props` to include `__sx: styleProps`, and remove the manual
`{...styleProps}` spread from the returned JSX (the fold now happens inside `useSlot`, and its
result already lands in `transitionSlotProps`):

```js
  const styleProps = useModalContentStyle({ placement, scrollBehavior, size, tabIndex });

  const [CloseButtonSlot, closeButtonSlotProps] = useSlot({
    name: 'closeButton',
    ownerName: ModalContent.displayName,
    props: {},
    slot: slots.closeButton ?? ModalCloseButton,
    slotProps: slotProps.closeButton,
  });

  const [TransitionSlot, transitionSlotProps] = useSlot({
    name: 'transition',
    ownerName: ModalContent.displayName,
    props: {
      ref: combinedRef,
      appear: !!modalContext,
      'aria-modal': ariaAttr(true),
      role: 'dialog',
      tabIndex,
      __sx: styleProps,
    },
    slot: slots.transition ?? TransitionComponent ?? Fade,
    slotProps: { ...TransitionProps, ...slotProps.transition },
  });

  return (
    <TransitionSlot
      {...transitionSlotProps}
      {...rest}
      in={modalContext ? isOpen : true}
```

No new import is needed — `ModalContent.js` does not call `mergeSx` itself; `useSlot` already
imports and applies it. `Fade` (the default `slot`) needs **no change** — `react-transition-group`'s
`Transition` forwards unrecognized props (including `__sx`) through to its render-prop
`childProps`, and `Fade` spreads `childProps` onto its own `Box` before applying its own
`opacity`/`transition` styling — there is no property overlap between `ModalContent`'s injected
base (`display`, `bg`, `borderColor`, ...) and `Fade`'s own animation styling (`opacity`,
`transition`, `visibility`), so no hand-merge or ordering fix is needed there.

- [ ] **Step 3: Run the test again and update the snapshot**

Run: `cd packages/react && yarn test --testPathPattern="ModalContent" -u`
Expected: PASS. `display`, `flexDirection`, `outline`, `overflow`, `position`, `bg`, `color`,
`borderWidth`, `borderStyle`, `borderColor`, `boxShadow` must all still be present with identical
values.

- [ ] **Step 4: Commit**

```bash
git add packages/react/src/modal/ModalContent.js packages/react/src/modal/__tests__/__snapshots__
git commit -m "refactor(react): fold ModalContent base style through useSlot's __sx"
```

---

### Task 4: Pattern D reference — `AccordionToggleIcon` (transition render-prop dynamic style)

**Files:**
- Modify: `packages/react/src/accordion/AccordionToggleIcon.js`
- Test: `packages/react/src/accordion/__tests__/AccordionToggleIcon.test.js` (existing, unchanged
  — snapshot regenerated)

**Interfaces:**
- Consumes: `mergeSx` from `@tonic-ui/utils/internal`.
- Produces: nothing new.

This is the reference shape for every Pattern-D backlog unit. The original exemption for
`transitions/Fade.js` and `toast/ToastTransition.js` ("no persistent `useXxxStyle()` base hook, no
change needed") is **revoked** by
`docs/adr/2026-07-03-transition-style-through-sx-channel.md`: animation state values are base
styling like any other, so all ten transition components migrate —
`transitions/{Fade,Collapse,Grow,Scale,Slide,Zoom}.js`, `toast/ToastTransition.js`,
`menu/MenuToggleIcon.js`, `tree/TreeItemToggleIcon.js`, plus a handoff rework of
`AccordionToggleIcon` itself (see the backlog).

The defining shape here: the component's `useXxxStyle()` result (`toggleIconStyleProps`) is a
**persistent** base — it doesn't change between renders — mixed inline with `variantStyle` (a
`transform` driven by the `Transition` render-prop's `state`) and a `transition` CSS property, plus
`'aria-disabled'` which isn't a style value at all. The mixed result feeds two branches: a
`Box`-rendering branch (where `__sx` can be used) and a function-child branch that assembles a raw
DOM `style={}` object (where `__sx` has no meaning — raw `style` doesn't understand it, and there's
no `Box` in this branch to route it through).

> **Correction (settled during execution, 2026-07-03):** two adjustments were made while landing
> this task, after a few intermediate shapes were tried and rejected in review.
>
> 1. **The dynamic transition values also migrate to `__sx` on the `Box` branch — `Box` must not
>    receive the component's own styling as flat props.** An intermediate revision kept
>    `variantStyle`/`transition` as flat `Box` props "to preserve their original tier", but flat
>    style props are exactly the channel this migration moves component-authored styling *off of*.
>    `state` here (`entering`/`entered`/`exiting`/`exited`) is a bounded enum — `variantStyle` only
>    ever takes one of two distinct `transform` values, not a continuously varying per-frame value
>    like a live drag-handle position (the case the Global Constraints' "stays out of `__sx`"
>    exception actually targets, e.g. `CoreColumnWidth`'s root `style` injection) — and Emotion
>    dedupes identical serialized CSS, so cycling states mints at most two classes. The original
>    `styleProps` variable name is kept (now holding only `variantStyle` + `transition` — no new
>    `dynamicStyleProps`-style convention) and folds into `__sx` between the persistent base and the
>    incoming `__sxProp`. The function-child branch is the one place the raw `style` object remains:
>    there is no `Box` in that branch, so inline `style` is the only channel — unchanged from the
>    original.
> 2. **`'aria-disabled'` is an ARIA attribute, not a style value.** The pre-migration code merged it
>    into the function-child branch's raw `style` object (confirmed by diffing the pre-Task-4
>    version); a `style` object silently ignores unknown keys, so this had no visible effect, but a
>    consumer using the function-child form never actually received a usable `aria-disabled` prop.
>    Fixed by passing it directly — as a plain JSX attribute on `Box`, and as a real prop alongside
>    `ref`/`style` in the function-child props — never through `style` or `__sx`. Inline, not via a
>    one-key intermediate object.
>
> The rule for this pattern: **all component-authored style — persistent base and dynamic
> transition-state values alike — folds into `__sx` on the `Box` branch (base first, dynamic values
> after, incoming `__sxProp` last); ARIA/`data-*` attributes pass directly as props, never through
> `style` or `__sx`.**
>
> **Extended (later same day):** the function-child handoff follows the **same** convention — the
> handoff props carry `__sx` (same fold as the `Box` branch) and `style` shrinks to the caller's
> passthrough; the child is required to render a `Box`-based element, documented in the JSDoc.
> DOM-measured values (e.g. `Collapse`'s content height) stay on inline `style`. See
> `docs/adr/2026-07-03-transition-style-through-sx-channel.md`. The committed
> `AccordionToggleIcon.js` and the code blocks below reflect the full final convention — it is the
> reference implementation for every remaining transition unit.

- [ ] **Step 1: Run the existing test to establish the pre-change baseline**

Run: `cd packages/react && yarn test --testPathPattern="AccordionToggleIcon"`
Expected: PASS.

- [ ] **Step 2: Fold the component-authored style into `__sx`, pass `aria-disabled` directly**

Current `packages/react/src/accordion/AccordionToggleIcon.js` (relevant portion):

```js
import { useMergeRefs } from '@tonic-ui/react-hooks';
import { ChevronDownIcon } from '@tonic-ui/react-icons';
import { ariaAttr, createTransitionStyle, getEnterTransitionProps, getExitTransitionProps, reflow, transitionEasing } from '@tonic-ui/utils';
import { ensureBoolean } from 'ensure-type';
import React, { forwardRef, useEffect, useRef } from 'react';
import { Transition } from 'react-transition-group';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import {
  useAccordionToggleIconStyle,
} from './styles';
import useAccordionItem from './useAccordionItem';

/* ...mapStateToVariantStyle, defaultEasing, defaultTimeout unchanged... */

const AccordionToggleIcon = forwardRef((inProps, ref) => {
  const {
    appear = false,
    children,
    disabled: disabledProp,
    easing = defaultEasing,
    style,
    timeout = defaultTimeout,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'AccordionToggleIcon' });
  const context = useAccordionItem();
  const toggleIconStyleProps = useAccordionToggleIconStyle();
  const nodeRef = useRef(null);
  const combinedRef = useMergeRefs(nodeRef, ref);
  const disabled = ensureBoolean(disabledProp ?? context?.disabled);
  const isExpanded = ensureBoolean(context?.isExpanded);

  useEffect(() => {
    if (isExpanded) {
      const node = nodeRef.current;
      reflow(node);
    }
  }, [isExpanded]);

  return (
    <Transition
      appear={appear}
      in={isExpanded}
      nodeRef={nodeRef}
      timeout={timeout}
      {...rest}
    >
      {(state, childProps) => {
        const transitionProps = isExpanded
          ? getEnterTransitionProps({ style, timeout, easing })
          : getExitTransitionProps({ style, timeout, easing });
        const transition = createTransitionStyle('transform', transitionProps);
        const variantStyle = mapStateToVariantStyle(state, {});
        const styleProps = {
          ...toggleIconStyleProps,
          ...variantStyle,
          'aria-disabled': ariaAttr(disabled),
          transition,
        };

        if (typeof children === 'function') {
          return children(state, {
            ...childProps,
            ref: combinedRef,
            style: {
              ...styleProps,
              ...style,
            },
          });
        }

        return (
          <Box
            ref={combinedRef}
            {...styleProps}
            {...childProps}
            style={style}
          >
            {children ?? <ChevronDownIcon size="4x" />}
          </Box>
        );
      }}
    </Transition>
  );
});
```

Replace with:

```js
import { useMergeRefs } from '@tonic-ui/react-hooks';
import { ChevronDownIcon } from '@tonic-ui/react-icons';
import { ariaAttr, createTransitionStyle, getEnterTransitionProps, getExitTransitionProps, reflow, transitionEasing } from '@tonic-ui/utils';
import { mergeSx } from '@tonic-ui/utils/internal';
import { ensureBoolean } from 'ensure-type';
import React, { forwardRef, useEffect, useRef } from 'react';
import { Transition } from 'react-transition-group';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import {
  useAccordionToggleIconStyle,
} from './styles';
import useAccordionItem from './useAccordionItem';

/* ...mapStateToVariantStyle, defaultEasing, defaultTimeout unchanged... */

const AccordionToggleIcon = forwardRef((inProps, ref) => {
  const {
    appear = false,
    __sx: __sxProp,
    children,
    disabled: disabledProp,
    easing = defaultEasing,
    style,
    timeout = defaultTimeout,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'AccordionToggleIcon' });
  const context = useAccordionItem();
  const toggleIconStyleProps = useAccordionToggleIconStyle();
  const nodeRef = useRef(null);
  const combinedRef = useMergeRefs(nodeRef, ref);
  const disabled = ensureBoolean(disabledProp ?? context?.disabled);
  const isExpanded = ensureBoolean(context?.isExpanded);

  useEffect(() => {
    if (isExpanded) {
      const node = nodeRef.current;
      reflow(node);
    }
  }, [isExpanded]);

  return (
    <Transition
      appear={appear}
      in={isExpanded}
      nodeRef={nodeRef}
      timeout={timeout}
      {...rest}
    >
      {(state, childProps) => {
        const transitionProps = isExpanded
          ? getEnterTransitionProps({ style, timeout, easing })
          : getExitTransitionProps({ style, timeout, easing });
        const transition = createTransitionStyle('transform', transitionProps);
        const variantStyle = mapStateToVariantStyle(state, {});
        const styleProps = {
          ...variantStyle,
          transition,
        };

        if (typeof children === 'function') {
          return children(state, {
            'aria-disabled': ariaAttr(disabled),
            ...childProps,
            ref: combinedRef,
            __sx: mergeSx(toggleIconStyleProps, styleProps, __sxProp),
            style,
          });
        }

        return (
          <Box
            ref={combinedRef}
            aria-disabled={ariaAttr(disabled)}
            {...childProps}
            __sx={mergeSx(toggleIconStyleProps, styleProps, __sxProp)}
            style={style}
          >
            {children ?? <ChevronDownIcon size="4x" />}
          </Box>
        );
      }}
    </Transition>
  );
});
```

The original `styleProps` variable keeps its name; it now holds only the dynamic values
(`variantStyle` + `transition`) after the persistent base moved out to the `__sx` fold and
`'aria-disabled'` moved out to a direct prop. **Both branches compute the identical
`mergeSx(toggleIconStyleProps, styleProps, __sxProp)` fold** — the `Box` branch passes it as its
own `__sx`; the function-child branch hands it to the consumer as `props.__sx`, with `style`
shrinking to the caller's passthrough (the child must spread onto a `Box`-based element; update the
JSDoc `children` typedef accordingly — see `AccordionToggleIcon.js` for the exact wording).
`'aria-disabled'` moves out of `style` entirely, passed as a real prop alongside `ref`/`style`
(function-child branch) or as a plain JSX attribute (`Box` branch) — a behavior fix (a
function-child consumer now actually receives a usable `aria-disabled`), not a pure refactor, but
harmless since the old placement had no observable effect (`style` silently ignores unknown keys).
Keep `style` explicitly destructured — it is an **animation input**
(`getEnter/ExitTransitionProps` read `transitionDuration`/`transitionTimingFunction`/
`transitionDelay` from it), not just a passthrough; letting it fall into `rest` silently kills
that override idiom.

- [ ] **Step 3: Run the test again and update the snapshot**

Run: `cd packages/react && yarn test --testPathPattern="AccordionToggleIcon" -u` (or the covering
suite — `Accordion.test.js` — if no dedicated snapshot test file exists; check `__tests__/` first).
Expected: PASS. The persistent base declarations from `useAccordionToggleIconStyle()` must still
be present with identical values; `transform`/`transition` must still reflect the current
transition state identically to before; `aria-disabled` renders identically (note:
`ariaAttr(false)` returns `undefined`, so it won't appear in the DOM at all unless a test actually
exercises `disabled`).

- [ ] **Step 4: Commit**

```bash
git add packages/react/src/accordion/AccordionToggleIcon.js packages/react/src/accordion/__tests__/__snapshots__
git commit -m "refactor(react): route AccordionToggleIcon base and transition style through __sx"
```

---

### Task 5: Pattern E reference — `Spinner` over `CircularProgress` (child override via `sx` → `__sx`)

**Files:**
- Modify: `packages/react/src/progress/CircularProgress.js` (prerequisite — `CircularProgress`
  itself isn't migrated yet, and `Spinner`'s fix requires it to accept a foldable `__sx`)
- Modify: `packages/react/src/spinner/Spinner.js`
- Test: `packages/react/src/progress/__tests__/CircularProgress.test.js`,
  `packages/react/src/spinner/__tests__/Spinner.test.js` (both existing, unchanged — snapshots
  regenerated)

**Interfaces:**
- Consumes: `mergeSx` from `@tonic-ui/utils/internal`.
- Produces: nothing new — both components' public props are unchanged.

This is the reference shape for every Pattern-E backlog unit
(`react-data-grid/DataGridResizeHandle.js`, `RowReorderOverlayContent.js`,
`DataGridScrollbar.js`, `ColumnSettingCheckbox.js`): a wrapper with no `styles.js` of its own
injects styling onto a **child** component instance via `sx=`, rather than through the child's
`__sx`. The fix requires the target child to already destructure and fold an incoming `__sx` —
`CircularProgress` doesn't yet, so this task migrates it first, as a prerequisite, since `Spinner`'s
fix is untestable without it.

> **Correction (found during execution, 2026-07-03):** an earlier draft of this task migrated all
> four of `CircularProgress`'s sub-elements (`CircularProgressRoot`/`SVG`/`Track`/`Indicator`) to
> `__sx` by folding each hook's full return value. That broke 11 tests.
> `useCircularProgressSVGStyle`/`useCircularProgressTrackStyle`/`useCircularProgressIndicatorStyle`
> (`packages/react/src/progress/styles.js`) each return a **mix** of real CSS style props (`color`,
> `display`, `animation`, `transition`) and actual SVG element attributes (`viewBox`, `cx`, `cy`,
> `r`, `stroke`, `strokeWidth`, `fill`, `strokeDasharray`, `strokeDashoffset`, `strokeLinecap`).
> `__sx` only feeds Emotion's CSS serialization — it cannot express DOM/SVG attributes — so folding
> a hook's full mixed result into `__sx` silently drops the attributes and breaks rendering.
>
> The fix is to **split each mixed hook into a pair**: `useXxxStyle` keeps its existing name and
> contract (returns only real style, feeding `__sx`) and a new parallel `getXxxAttrs` **plain
> function** returns the real SVG element attributes, spread flat. It's a plain function rather than
> a `useXxxAttrs` hook because it calls no React hooks internally (no `useMemo`, no `useTheme`) — it's
> pure arithmetic, so naming it `use*` would imply Rules-of-Hooks semantics it doesn't need. (Two
> earlier revisions were tried and rejected: folding the full mixed result straight into `__sx`
> broke rendering per the correction above, and returning `{ sx, attrs }` from one combined hook was
> rejected in favor of this pair, so `useXxxStyle`'s contract stays consistent with every other
> component in the package: "returns the component's style," full stop.) This is now the pattern
> below for
> `useCircularProgressSVGStyle`/`Track`/`Indicator`, each paired with a new
> `getCircularProgressSVGAttrs`/`TrackAttrs`/`IndicatorAttrs` (`useCircularProgressRootStyle` didn't
> need a pair — it was already pure style, no attributes). Shared arithmetic (`radius`,
> `circumference`) between a style/attrs pair is factored into plain helper functions
> (`getCircularProgressRadius`, `getCircularProgressCircumference`) rather than duplicated inline.
> `Spinner`'s override keeps working regardless, since it targets a nested Emotion selector
> (`svg circle:first-of-type`/`:last-of-type`) on the root's own style block, not a prop injected
> into the sub-elements. Any other backlog unit whose style hook mixes CSS with real DOM/SVG
> attributes (`icon/Icon.js` is a likely candidate — check before assuming Pattern-A) should use
> this same style-hook/attrs-function split, verified by actually running the test, not by inspecting
> the diff.

- [ ] **Step 1: Run both existing tests to establish the pre-change baseline**

Run: `cd packages/react && yarn test --testPathPattern="CircularProgress|Spinner"`
Expected: PASS.

- [ ] **Step 2: Split `useCircularProgressSVGStyle`/`Track`/`Indicator` into style-hook + get*Attrs-function pairs**

Current `packages/react/src/progress/styles.js` (relevant portion):

```js
const useCircularProgressSVGStyle = ({
  size,
}) => {
  const viewBox = `0 0 ${size} ${size}`;
  return {
    display: 'block',

    // The following are SVG element attributes
    viewBox,
  };
};

const useCircularProgressTrackStyle = ({
  size,
  thickness,
  trackColor: deprecatedTrackColor, // deprecated
}) => {
  const color = deprecatedTrackColor ?? '_overlay.thin';
  const radius = (size - thickness) / 2;
  const baseStyle = {
    color,

    // The following are SVG element attributes
    fill: 'none',
    cx: size / 2,
    cy: size / 2,
    r: radius,
    stroke: 'currentColor',
    strokeWidth: thickness,
  };

  return baseStyle;
};

const useCircularProgressIndicatorStyle = ({
  color,
  scale, // between 0 and 1 inclusive (0 ≤ scale ≤ 1)
  size,
  thickness,
  variant,
}) => {
  const radius = (size - thickness) / 2;
  const circumference = radius * 2 * Math.PI;
  const animationKeyframe = useMemo(() => { /* ...unchanged... */ }, [circumference, thickness]);

  const baseStyle = {
    color,

    // The following are SVG element attributes
    fill: 'none',
    cx: size / 2,
    cy: size / 2,
    r: radius,
    stroke: 'currentColor',
    strokeWidth: thickness,
  };

  if (variant === 'determinate') {
    const percentage = 100 - scale * 100;
    const strokeDasharray = circumference.toFixed(3);
    const strokeDashoffset = ((percentage / 100) * circumference).toFixed(3) + 'px';

    return {
      ...baseStyle,
      transition: createTransitionStyle('stroke-dashoffset'),

      // The following are SVG element attributes
      strokeDasharray,
      strokeDashoffset,
    };
  }

  if (variant === 'indeterminate') {
    const animationDuration = Math.floor(baseAnimationDuration * 0.75 * 100) / 100; // in seconds

    return {
      ...baseStyle,
      animation: `${animationKeyframe} ${animationDuration}s ease-in-out infinite`,

      // The following are SVG element attributes
      strokeLinecap: 'round',
    };
  }

  return baseStyle;
};
```

Replace with (each `useXxxStyle` keeps returning only style, feeding `__sx`; a new parallel
`getXxxAttrs` plain function — not a hook, it calls no React hooks internally — returns the real SVG
element attributes, spread flat. `getCircularProgressRadius`/`getCircularProgressCircumference` are
extracted so the shared arithmetic isn't duplicated across a
style/attrs pair):

```js
const getCircularProgressRadius = ({ size, thickness }) => (size - thickness) / 2;
const getCircularProgressCircumference = (radius) => radius * 2 * Math.PI;

const useCircularProgressSVGStyle = () => {
  return {
    display: 'block',
  };
};

const getCircularProgressSVGAttrs = ({
  size,
}) => {
  const viewBox = `0 0 ${size} ${size}`;

  return {
    viewBox,
  };
};

const useCircularProgressTrackStyle = ({
  trackColor: deprecatedTrackColor, // deprecated
}) => {
  const color = deprecatedTrackColor ?? '_overlay.thin';

  return {
    color,
  };
};

const getCircularProgressTrackAttrs = ({
  size,
  thickness,
}) => {
  const radius = getCircularProgressRadius({ size, thickness });

  return {
    fill: 'none',
    cx: size / 2,
    cy: size / 2,
    r: radius,
    stroke: 'currentColor',
    strokeWidth: thickness,
  };
};

const useCircularProgressIndicatorStyle = ({
  color,
  size,
  thickness,
  variant,
}) => {
  const radius = getCircularProgressRadius({ size, thickness });
  const circumference = getCircularProgressCircumference(radius);
  const animationKeyframe = useMemo(() => { /* ...unchanged... */ }, [circumference, thickness]);

  if (variant === 'determinate') {
    return {
      color,
      transition: createTransitionStyle('stroke-dashoffset'),
    };
  }

  if (variant === 'indeterminate') {
    const animationDuration = Math.floor(baseAnimationDuration * 0.75 * 100) / 100; // in seconds

    return {
      color,
      animation: `${animationKeyframe} ${animationDuration}s ease-in-out infinite`,
    };
  }

  return {
    color,
  };
};

const getCircularProgressIndicatorAttrs = ({
  scale, // between 0 and 1 inclusive (0 ≤ scale ≤ 1)
  size,
  thickness,
  variant,
}) => {
  const radius = getCircularProgressRadius({ size, thickness });
  const circumference = getCircularProgressCircumference(radius);

  const baseAttrs = {
    fill: 'none',
    cx: size / 2,
    cy: size / 2,
    r: radius,
    stroke: 'currentColor',
    strokeWidth: thickness,
  };

  if (variant === 'determinate') {
    const percentage = 100 - scale * 100;
    const strokeDasharray = circumference.toFixed(3);
    const strokeDashoffset = ((percentage / 100) * circumference).toFixed(3) + 'px';

    return {
      ...baseAttrs,
      strokeDasharray,
      strokeDashoffset,
    };
  }

  if (variant === 'indeterminate') {
    return {
      ...baseAttrs,
      strokeLinecap: 'round',
    };
  }

  return baseAttrs;
};
```

Note `scale` moves entirely to the attrs function (it was only ever used to compute the determinate
`strokeDasharray`/`strokeDashoffset` attributes, never style) — `useCircularProgressIndicatorStyle`
no longer needs it.

- [ ] **Step 3: Migrate `CircularProgress`'s four sub-elements to `__sx`**

Current `packages/react/src/progress/CircularProgress.js`:

```js
import { useOnceWhen } from '@tonic-ui/react-hooks';
import { warnDeprecatedProps } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import {
  useCircularProgressRootStyle,
  useCircularProgressSVGStyle,
  useCircularProgressTrackStyle,
  useCircularProgressIndicatorStyle,
} from './styles';

/* ...defaultSize, defaultThickness, defaultVariant, CircularProgressRoot/SVG/Track/Indicator unchanged... */

const CircularProgress = forwardRef((inProps, ref) => {
  const {
    trackColor: trackColorProp, // deprecated

    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    color = '_foreground.primary.active',
    min = 0,
    max = 100,
    size = defaultSize,
    thickness = defaultThickness,
    value = 0,
    variant = defaultVariant,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'CircularProgress' });

  /* ...deprecation warning unchanged... */

  const clampedValue = Math.max(min, Math.min(value, max));
  const scale = (clampedValue - min) / (max - min);
  const circularProgressRootStyleProps = useCircularProgressRootStyle({ size, variant });
  const circularProgressSVGStyleProps = useCircularProgressSVGStyle({ size });
  const circularProgressTrackStyleProps = useCircularProgressTrackStyle({ size, thickness, trackColor: trackColorProp });
  const circularProgressIndicatorStyleProps = useCircularProgressIndicatorStyle({ color, scale, size, thickness, variant });

  const circularProgressRootProps = {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    role: 'progressbar',
  };

  if (variant === 'determinate') {
    circularProgressRootProps['aria-valuemin'] = min;
    circularProgressRootProps['aria-valuemax'] = max;
    circularProgressRootProps['aria-valuenow'] = value;
  }

  return (
    <CircularProgressRoot
      ref={ref}
      {...circularProgressRootProps}
      {...circularProgressRootStyleProps}
      {...rest}
    >
      <CircularProgressSVG
        {...circularProgressSVGStyleProps}
      >
        <CircularProgressTrack
          {...circularProgressTrackStyleProps}
        />
        <CircularProgressIndicator
          {...circularProgressIndicatorStyleProps}
        />
      </CircularProgressSVG>
    </CircularProgressRoot>
  );
});
```

Replace with (import list, `__sx` destructure, one attrs-function call per sub-element, and the
`return` block change):

```js
import { useOnceWhen } from '@tonic-ui/react-hooks';
import { warnDeprecatedProps } from '@tonic-ui/utils';
import { mergeSx } from '@tonic-ui/utils/internal';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import {
  useCircularProgressRootStyle,
  useCircularProgressSVGStyle,
  getCircularProgressSVGAttrs,
  useCircularProgressTrackStyle,
  getCircularProgressTrackAttrs,
  useCircularProgressIndicatorStyle,
  getCircularProgressIndicatorAttrs,
} from './styles';

/* ...defaultSize, defaultThickness, defaultVariant, CircularProgressRoot/SVG/Track/Indicator unchanged... */

const CircularProgress = forwardRef((inProps, ref) => {
  const {
    trackColor: trackColorProp, // deprecated

    __sx: __sxProp,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    color = '_foreground.primary.active',
    min = 0,
    max = 100,
    size = defaultSize,
    thickness = defaultThickness,
    value = 0,
    variant = defaultVariant,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'CircularProgress' });

  /* ...deprecation warning unchanged... */

  const clampedValue = Math.max(min, Math.min(value, max));
  const scale = (clampedValue - min) / (max - min);
  const circularProgressRootStyleProps = useCircularProgressRootStyle({ size, variant });
  const circularProgressSVGStyleProps = useCircularProgressSVGStyle();
  const circularProgressSVGAttrs = getCircularProgressSVGAttrs({ size });
  const circularProgressTrackStyleProps = useCircularProgressTrackStyle({ trackColor: trackColorProp });
  const circularProgressTrackAttrs = getCircularProgressTrackAttrs({ size, thickness });
  const circularProgressIndicatorStyleProps = useCircularProgressIndicatorStyle({ color, size, thickness, variant });
  const circularProgressIndicatorAttrs = getCircularProgressIndicatorAttrs({ scale, size, thickness, variant });

  const circularProgressRootProps = {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    role: 'progressbar',
  };

  if (variant === 'determinate') {
    circularProgressRootProps['aria-valuemin'] = min;
    circularProgressRootProps['aria-valuemax'] = max;
    circularProgressRootProps['aria-valuenow'] = value;
  }

  return (
    <CircularProgressRoot
      ref={ref}
      {...circularProgressRootProps}
      {...rest}
      __sx={mergeSx(circularProgressRootStyleProps, __sxProp)}
    >
      <CircularProgressSVG
        {...circularProgressSVGAttrs}
        __sx={circularProgressSVGStyleProps}
      >
        <CircularProgressTrack
          {...circularProgressTrackAttrs}
          __sx={circularProgressTrackStyleProps}
        />
        <CircularProgressIndicator
          {...circularProgressIndicatorAttrs}
          __sx={circularProgressIndicatorStyleProps}
        />
      </CircularProgressSVG>
    </CircularProgressRoot>
  );
});
```

`CircularProgressSVG`/`Track`/`Indicator` receive `__sx={styleProps}` directly (no `mergeSx` call)
— per the Global Constraints, when there is no incoming value to fold (these three sub-elements
accept no external props today), pass the style object directly; wrapping a single value in
`mergeSx` adds nothing. The three wrapper functions
(`const CircularProgressSVG = (props) => <Box as="svg" {...props} />;`, etc.) are unchanged — they
already forward `__sx` to `Box` untouched. The `get*Attrs` functions' results still spread flat
since those are real SVG element attributes `__sx` cannot express.

- [ ] **Step 4: Route `Spinner`'s override through `__sx`**

Current `packages/react/src/spinner/Spinner.js` (relevant portion):

```js
import { useOnceWhen } from '@tonic-ui/react-hooks';
import { warnDeprecatedProps } from '@tonic-ui/utils';
import { ensureFiniteNumber } from 'ensure-type';
import React, { forwardRef } from 'react';
import { CircularProgress } from '../progress';
import { useDefaultProps } from '../default-props';

/* ...defaultSize, mapSpinnerSizeToDiameter, mapSpinnerSizeToThickness unchanged... */

const Spinner = forwardRef((inProps, ref) => {
  const {
    lineColor: lineColorProp, // deprecated
    lineWidth: lineWidthProp, // deprecated
    trackColor: trackColorProp, // deprecated
    trackWidth: trackWidthProp, // deprecated

    color,
    size = defaultSize,
    thickness: thicknessProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Spinner' });

  /* ...deprecation warnings, diameter/thickness computation unchanged... */

  return (
    <CircularProgress
      ref={ref}
      color={color}
      size={diameter}
      thickness={normalizedThickness}
      sx={[
        {
          'svg circle:first-of-type': {
            color: trackColorProp,
          },
          'svg circle:last-of-type': {
            color: color ?? lineColorProp,
          },
        },
      ]}
      {...rest}
      // Ensure the "indeterminate" variant is applied last to prevent unintended overrides
      variant="indeterminate"
    />
  );
});
```

Replace with:

```js
import { useOnceWhen } from '@tonic-ui/react-hooks';
import { warnDeprecatedProps } from '@tonic-ui/utils';
import { mergeSx } from '@tonic-ui/utils/internal';
import { ensureFiniteNumber } from 'ensure-type';
import React, { forwardRef } from 'react';
import { CircularProgress } from '../progress';
import { useDefaultProps } from '../default-props';

/* ...defaultSize, mapSpinnerSizeToDiameter, mapSpinnerSizeToThickness unchanged... */

const Spinner = forwardRef((inProps, ref) => {
  const {
    lineColor: lineColorProp, // deprecated
    lineWidth: lineWidthProp, // deprecated
    trackColor: trackColorProp, // deprecated
    trackWidth: trackWidthProp, // deprecated

    __sx: __sxProp,
    color,
    size = defaultSize,
    thickness: thicknessProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Spinner' });

  /* ...deprecation warnings, diameter/thickness computation unchanged... */

  return (
    <CircularProgress
      ref={ref}
      color={color}
      size={diameter}
      thickness={normalizedThickness}
      {...rest}
      __sx={mergeSx({
        'svg circle:first-of-type': {
          color: trackColorProp,
        },
        'svg circle:last-of-type': {
          color: color ?? lineColorProp,
        },
      }, __sxProp)}
      // Ensure the "indeterminate" variant is applied last to prevent unintended overrides
      variant="indeterminate"
    />
  );
});
```

The deprecation-warning string (`alternative: 'sx={{ "svg circle:first-of-type": ... }}'` inside
`CircularProgress.js`) is **unchanged** — it documents the public, consumer-facing API for
`CircularProgress`'s own deprecated `trackColor` prop, and `sx` is correctly the consumer channel
there; this task does not touch that string.

- [ ] **Step 4: Run both tests again and update snapshots**

Run: `cd packages/react && yarn test --testPathPattern="CircularProgress|Spinner" -u`
Expected: PASS. `CircularProgressRoot`'s declarations and all three sub-elements' SVG attributes
must be identical to before; `Spinner`'s `svg circle:first-of-type`/`svg circle:last-of-type` color
overrides must still apply.

- [ ] **Step 5: Commit**

```bash
git add packages/react/src/progress/CircularProgress.js packages/react/src/spinner/Spinner.js packages/react/src/progress/__tests__/__snapshots__ packages/react/src/spinner/__tests__/__snapshots__
git commit -m "refactor(react): route CircularProgress root style and Spinner's override through __sx"
```

---

### Task 6: `react-data-grid`'s `CoreColumnWidth.js` — confirmed exception + in-scope fix

**Files:**
- Modify: `packages/react-data-grid/src/core/CoreColumnWidth.js`
- Test: existing `react-data-grid` test suite covering column widths (run the package's full
  suite, since this plugin's props are consumed indirectly through `DataGrid.js`/`DataGridRoot.js`
  rather than tested in isolation)

**Interfaces:**
- Consumes: `mergeSx` from `@tonic-ui/utils/internal`.
- Produces: nothing new.

`CoreColumnWidth.js` contributes two distinct things to the table instance via
`mergeGetPropsFns`, confirmed to need **different** treatment:

- `table.getRootProps()` returns `{ style: columnSizes }` — a raw DOM `style` object of CSS custom
  properties (`--header-<id>-width`) whose **numeric values** change on every resize-drag
  animation frame (`DataGridResizeHandle.js` drives this via `requestAnimationFrame`). **This
  stays as raw `style` — it is out of scope, not a migration gap.** Routing a value that changes
  every frame through `__sx`/`sx` would mint a new Emotion stylesheet class per frame (Emotion
  computes a new class hash for each distinct object it serializes), with no garbage collection —
  a real performance regression, not a style-authoring inconsistency. Raw `style` is a direct DOM
  property mutation with no such cost, and is the correct mechanism for this specific value.
- `header.getHeaderProps()` / `cell.getCellProps()` return `width: calc(var(--header-<id>-width) *
  1px)` as a flat prop. This **string** never changes between renders — it's a stable formula that
  references the CSS variable by name; only the variable's underlying value (set via the root's
  raw `style`) changes, resolved by the browser at paint time. This is Pattern-A-shaped (a
  `getProps()`-style function's flat return value spread directly onto a `Box`-based child, fixable
  the same way as any other Pattern-A unit) and **is** in scope.

- [ ] **Step 1: Run the existing test suite to establish the pre-change baseline**

Run: `cd packages/react-data-grid && yarn test`
Expected: PASS.

- [ ] **Step 2: Route the header/cell width contribution through `__sx`**

In `packages/react-data-grid/src/core/CoreColumnWidth.js`, the header contribution currently
reads:

```js
header.getHeaderProps = mergeGetPropsFns(header.getHeaderProps, () => ({
  width: `calc(var(--header-${header.cssVarId}-width) * 1px)`,
}));
```

Change to:

```js
header.getHeaderProps = mergeGetPropsFns(header.getHeaderProps, () => ({
  __sx: {
    width: `calc(var(--header-${header.cssVarId}-width) * 1px)`,
  },
}));
```

Apply the identical change to the corresponding `cell.getCellProps` contribution (same file, same
shape, `cell.cssVarId` in place of `header.cssVarId`). Add `import { mergeSx } from
'@tonic-ui/utils/internal';` only if a later unit needs to fold multiple `__sx` contributions at
this layer — not needed for this task, since `CoreColumnWidth` is currently the only feature
contributing to these two `getProps` calls (confirmed during the coverage review; if a second
feature is added later that also needs to inject `__sx` here, `mergeGetPropsFns`'s current shallow
`{...mergedProps, ...props}` merge will need to fold `__sx` via `mergeSx` rather than object-spread
— flagged as a follow-up note in the Backlog section below, not fixed in this task since no second
contributor exists yet to make it a live bug).

The root's `table.getRootProps()` contribution (`{ style: columnSizes }`) is **not changed** by
this task — confirmed out of scope per the reasoning above.

- [ ] **Step 3: Run the test suite again**

Run: `cd packages/react-data-grid && yarn test`
Expected: PASS with no snapshot changes beyond tier-reorder for header/cell width (if this package
uses Emotion snapshot serialization the same way `packages/react` does — verify against the
package's actual test output; the `calc(var(...))` value itself must be identical before and
after).

- [ ] **Step 4: Commit**

```bash
git add packages/react-data-grid/src/core/CoreColumnWidth.js
git commit -m "refactor(react-data-grid): route CoreColumnWidth header/cell width through __sx"
```

---

### Task 7: Bootstrap the execution loop

**Files:**
- Create: `.states/tonic-ui-sx-internals/STATE.md`
- Create: `.states/tonic-ui-sx-internals/.gitignore`

**Interfaces:**
- Consumes: nothing — this task creates the loop's spine per `fedex-dev:loop-engineering`'s
  `assets/STATE.template.md` structure.
- Produces: the loop's `## Next` backlog (below), which every subsequent unit's maker/checker pair
  consumes as its "done when" criterion and canonical pattern reference (Tasks 1-6 above).

- [ ] **Step 1: Create the loop directory and whitelist `.gitignore`**

`.states/tonic-ui-sx-internals/.gitignore`:

```gitignore
# Loop dir: ignore everything by default; commit only the spine and docs.
*
!/.gitignore
!/STATE.md
!/docs/
!/docs/**
```

- [ ] **Step 2: Write `STATE.md`**

> Note: the template below is the Task 7 seed as originally planned. The actual committed
> `.states/tonic-ui-sx-internals/STATE.md` is the live source of truth and has since diverged
> from this snapshot (real commit refs, a `## Runtime` section, and the Task 5 correction noted
> above reflected in its `## Done`/`## Log`) — read that file directly rather than this copy.

`.states/tonic-ui-sx-internals/STATE.md`:

```markdown
# Loop: migrate internal component base styling from style props/sx to __sx
_Stop when: every unit below is done, `yarn test` is green across packages/react and
packages/react-data-grid, and every touched component's snapshot diff is tier-reorder-only._
_Branch: refactor/tonic-ui-sx-internals-migration     Posture: supervised     Budget (run): ~15 units_

## Done
- [x] Pattern A worked example — Divider.js (Task 1, this plan)
- [x] Pattern B worked example — CheckboxControlBox.js + styles.js centralization (Task 2)
- [x] Pattern C worked example — ModalContent.js (Task 3)
- [x] Pattern D worked example — AccordionToggleIcon.js (Task 4)
- [x] Pattern E worked example — CircularProgress.js (root only, narrowed — see Task 5's correction above) + Spinner.js (Task 5)
- [x] CoreColumnWidth.js header/cell width fix, root style injection confirmed out of scope (Task 6)

## In progress

## Next
<!-- Phase 1: packages/react/src remaining Pattern-A units — done when: yarn test --testPathPattern="<Component>" -u passes with a tier-reorder-only snapshot diff, using the Divider.js shape from Task 1 -->
- [ ] accordion: AccordionHeader.js, AccordionBody.js, AccordionToggle.js
- [ ] alert: Alert.js, AlertIcon.js, AlertMessage.js, AlertCloseButton.js
- [ ] autocomplete: Autocomplete.js, AutocompleteList.js, AutocompleteItem.js, AutocompleteInput.js
- [ ] badge/Badge.js
- [ ] button-box/ButtonBox.js
- [ ] code/Code.js
- [ ] date-pickers/DateCalendar: DateCalendar.js, YearMonthPicker/YearMonthPicker.js, MonthDate/MonthDate.js, MonthDate/Day.js, MonthDate/DaysOfWeek.js
- [ ] date-pickers/DatePicker: DatePicker.js, DatePickerToggle.js
- [ ] drawer: Drawer.js, DrawerContainer.js, DrawerHeader.js, DrawerBody.js, DrawerFooter.js, DrawerCloseButton.js
- [ ] form-control: FormControl.js, FormLabel.js, FormHelperText.js, FormCharacterCount.js, FormErrorMessage.js
- [ ] highlight/Highlight.js
- [ ] icon/Icon.js
- [ ] link: Link.js, LinkButton.js
- [ ] list: List.js, ListItem.js
- [ ] modal: Modal.js, ModalContainer.js, ModalHeader.js, ModalBody.js, ModalFooter.js, ModalCloseButton.js
- [ ] pagination: Pagination.js, PaginationItem.js
- [ ] popover: PopoverHeader.js, PopoverBody.js, PopoverFooter.js, PopoverTrigger.js
- [ ] progress/LinearProgress.js
- [ ] radio/Radio.js
- [ ] resize-handle/ResizeHandle.js
- [ ] search-input: SearchInputAdornment.js, SearchInputClearButton.js, SearchInputLoadingIcon.js, SearchInputSearchIcon.js
- [ ] select: Select.js, Option.js, OptionGroup.js
- [ ] skeleton/Skeleton.js
- [ ] space/Space.js (also switch its opaque `const props = useDefaultProps(...)` capture to the inline `{ __sx: __sxProp, ...rest }` destructure per the Global Constraints)
- [ ] stack: Stack.js, StackItem.js
- [ ] switch/Switch.js
- [ ] table: Table.js, TableRow.js, TableHeader.js, TableFooter.js, TableBody.js, TableScrollbar.js, deprecated/TableHeaderCell.js, deprecated/TableHeaderRow.js
- [ ] tabs: Tabs.js, TabList.js, Tab.js, TabPanel.js, TabPanels.js
- [ ] tag: Tag.js, TagCloseButton.js
- [ ] text: Text.js, TextLabel.js
- [ ] textarea/Textarea.js
- [ ] toast: Toast.js, ToastMessage.js, ToastIcon.js, ToastCloseButton.js, ToastContainer.js, ToastManager.js
- [ ] tooltip: TooltipTrigger.js, OverflowTooltip.js
- [ ] tree: TreeItemContent.js, TreeItemToggle.js
- [ ] truncate/Truncate.js
- [ ] visually-hidden/VisuallyHidden.js

<!-- Phase 1: packages/react/src remaining Pattern-B units — done when: inline style-building logic is centralized into styles.js and the __sx fold is applied, using the CheckboxControlBox.js shape from Task 2 -->
- [ ] checkbox/Checkbox.js — inner Box's hand-built `sx={{ color }}`
- [ ] radio/RadioControlBox.js
- [ ] switch/SwitchControlBox.js
- [ ] table/TableCell.js
- [ ] popover/PopoverArrow.js
- [ ] tooltip/TooltipArrow.js

<!-- Phase 1: packages/react/src remaining Pattern-C units — done when: the component's base style is passed into its useSlot call's props.__sx (no hand-merge), using the ModalContent.js shape from Task 3 -->
- [ ] accordion/AccordionContent.js
- [ ] drawer/DrawerContent.js
- [ ] drawer/DrawerOverlay.js
- [ ] modal/ModalOverlay.js
- [ ] popover/PopoverContent.js (also has nested Popper/Arrow slots — verify each independently)
- [ ] tooltip/TooltipContent.js (also has nested Popper/Arrow slots — verify each independently)
- [ ] date-pickers/DatePicker/DatePickerContent.js
- [ ] tree/TreeItem.js
- [ ] alert/Alert.js (CloseButtonSlot)
- [ ] tag/Tag.js (CloseButtonSlot)
- [ ] toast/Toast.js (CloseButtonSlot)

<!-- Phase 1: packages/react/src remaining Pattern-D unit — done when: the persistent useXxxStyle() base is split into __sx as in Task 4; Fade.js and ToastTransition.js need no change (confirmed no persistent base hook) -->
- [ ] tree/TreeItemToggleIcon.js

<!-- Phase 2: packages/react-data-grid confirmed findings — done when: each wrapper's override is routed through the target child's __sx per the Spinner/CircularProgress shape from Task 5, or centralized+folded per the CheckboxControlBox shape from Task 2 for the B-variant units -->
- [ ] features/columnResize/DataGridResizeHandle.js (Pattern E — wraps ResizeHandle; unguarded `{...rest}` after `sx` today, latent clobber bug)
- [ ] features/rowReorder/RowReorderOverlayContent.js (Pattern E — object-merges onto child DataGridRow -> TableRow)
- [ ] features/dnd/DndReorderOverlayWrapper.js (Pattern B — own Box, object-spread hand-merge)
- [ ] features/dataGridScrollbar/DataGridScrollbar.js (Pattern E — wraps Scrollbar; Scrollbar doesn't destructure `sx` at all today, so a real consumer `sx` would currently fully overwrite this override)
- [ ] features/columnSettings/ColumnSettingCheckbox.js (Pattern E — wraps Checkbox; depends on the `checkbox/Checkbox.js` Pattern-B unit above landing first)
- [ ] features/dnd/withReorderable.js (Pattern B-variant — HOC hand-merges own computed opacity + consumer `sx` via object-spread, not array-spread)
- [ ] features/rowReorder/RowReorder.js (Pattern B-variant — same object-spread hand-merge, but inside a headless react-table plugin's `getRowProps()` function rather than a component render body; downstream of `withReorderable.js`, verify both together)

## Blocked
- `mergeGetPropsFns` (packages/react-data-grid/src/core/mergeGetPropsFns.js) does a shallow
  `{...mergedProps, ...props}` merge across feature contributions — needs: a human decision on
  whether to upgrade it to fold `__sx` via `mergeSx` (array composition) once a second feature
  contributes `__sx` to the same `getProps()` call as another feature (not a live bug today; only
  `CoreColumnWidth`/`RowReorder` currently contribute `__sx`/`sx` at these layers, so there's no
  current collision — flagged so it isn't silently reintroduced when a second contributor lands).

## Log
- 2026-07-02 loop bootstrap: seeded from docs/plans/2026-07-02-tonic-ui-sx-internals-migration.md Tasks 1-6, executed inline (not via subagent loop) prior to state-file creation.

## Docs
- `docs/plans/2026-07-02-tonic-ui-sx-internals-migration.md` — this plan; canonical pattern reference for every unit above.
```

- [ ] **Step 3: Verify the state file is well-formed**

Confirm every required section from `fedex-dev:loop-engineering`'s `assets/STATE.template.md` is
present (`# Loop`, stop condition, `Branch`/`Posture`/`Budget`, `## Done`, `## In progress`,
`## Next`, `## Blocked`, `## Log`, `## Docs`), and that `git status --porcelain --ignored
.states/tonic-ui-sx-internals/` shows only `STATE.md` and `.gitignore` as trackable (everything
else in the directory, if any, ignored by the whitelist).

- [ ] **Step 4: Commit**

```bash
git add .states/tonic-ui-sx-internals/STATE.md .states/tonic-ui-sx-internals/.gitignore
git commit -m "chore(loop): bootstrap tonic-ui-sx-internals migration loop spine"
```

## Out of scope (confirmed, not backlog items)

- `packages/react-charts`, `packages/charts` — confirmed via dedicated workflow scope-check: zero
  `Box`/`sx`/`__sx` usage in either package. `react-charts`'s `Charts.tsx` renders a plain native
  `<div>`; `charts` has no React dependency at all and configures `echarts`' own option/theme
  objects. Nothing to migrate.
- `CoreColumnWidth.js`'s `table.getRootProps()` CSS-custom-property `style` injection — confirmed
  a deliberately different, correct mechanism for continuously-changing per-frame values (see
  Task 6). Not a migration gap.
- **Phase 3 (deferred, separate loop phase, not detailed in this plan):** `packages/react-docs`
  style-props → `sx` migration (consumer-side, tier-1 → tier-4 — unrelated to the internal `__sx`
  base-styling channel this plan addresses). Starts with its own discovery unit per
  loop-engineering's convention for unknown-scope work, once Phase 1/2 above are underway.
