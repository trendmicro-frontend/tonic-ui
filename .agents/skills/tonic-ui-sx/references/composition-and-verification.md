# Tonic UI Style Composition and Verification

All `docs/` and `packages/` paths are relative to the repository root. Component
paths such as `button/Button.js` are relative to `packages/react/src/`.

## Worked example — self base styling (`Button`)

```js
// button/Button.js
const styleProps = useButtonStyle({ /* color, size, variant, ... */ });
return (
  <ButtonBase
    {...rest}
    __sx={composeSx(styleProps, __sxProp)}
  />
);
```

Button's look (including `_hover`/`_active`) lives in `__sx`, so an app's `sx` or style props
override it cleanly.

**Always extract to a `styles.js` / `use<Component>Style()` hook — even for a single static
value.** `composeSx({ display: 'flex' }, __sxProp)` inlined at the JSX call site works, but it's
inconsistent with every other component in this codebase, including trivially simple ones
(`divider/Divider.js`, `mark/Mark.js`). Put the value in its own `styles.js`, even if the hook is
a one-liner with no theme/state dependency:

```js
// flex/styles.js
const useFlexStyle = () => {
  return { display: 'flex' };
};
export { useFlexStyle };

// flex/Flex.js
const styleProps = useFlexStyle();
return <Box {...rest} __sx={composeSx(styleProps, __sxProp)} />;
```

## Worked example — child override (`MenuButton` over `Button`)

A wrapper overrides a child by passing its own base into the child's `__sx`. The child folds
*its incoming* `__sx` after its own base, so the wrapper's styles land later in the same `__sx`
array and win at equal specificity — while the consumer's `sx` still wins over both.

```js
// menu/MenuButton.js
const styleProps = useMenuButtonStyle({ variant });
return (
  <Button
    variant={variant}
    {...rest}
    __sx={composeSx(styleProps, __sxProp)}   // MenuButton's override → Button's incoming __sx
  >
    {/* ... */}
  </Button>
);
```

Inside `Button`, the fold produces `[buttonBaseStyle, buttonStyle, menuButtonStyle, consumer__sx]`.
MenuButton's hover override sits after Button's hover base → it wins. No `sx` hand-merge anywhere.

This is *why* the wrapper override goes through `__sx` and not `sx`: routing it through `sx`
would put it on the consumer's channel and require hand-merging the consumer's `sx` back on top
(the old, fragile pattern).

## Transition components — animation state, the handoff, and measured values

Transition components (`transitions/{Fade,Collapse,Grow,Scale,Slide,Zoom}`, `ToastTransition`,
and the `Transition`-consuming toggle icons) follow the same channel rules with three
clarifications, settled in `docs/adr/2026-07-03-transition-style-through-sx-channel.md`
(reference implementation: `accordion/AccordionToggleIcon.js`):

1. **Animation state values are base styling — not exempt.** The per-transition-state style
   derived from the bounded state enum + static config (`opacity`, `transform`, the `transition`
   shorthand from `timeout`/`easing`, `visibility`) folds into `__sx` with everything else:
   `composeSx(ownPersistentBase, animationStyleProps, __sxProp)` — incoming last. A consumer or
   wrapper deliberately targeting an animated property wins, animation included.
2. **The function-child handoff mirrors the `Box` branch.** The render-prop hands the consumer
   `{ ...childProps, ref, __sx: <the identical fold>, style: callerStyle }` — `style` is only the
   caller's passthrough, never the animation values. The function child must spread these onto a
   `Box`-based element (a native element cannot resolve `__sx`); this is part of the documented
   JSDoc contract. Same fold in both branches → switching render modes is style-neutral.
3. **Dynamically calculated (DOM-measured) values ride inline `style`, not `__sx`.** A measured
   content height (`Collapse`/`ToastTransition`) or auto-computed duration (`Grow` with
   `timeout='auto'`) would mint a new uncollectable stylesheet class per distinct measurement if
   serialized through a channel. The split is by **how the value is computed** (enum + static
   config → `__sx`; includes a DOM measurement → inline `style`), not how often it changes.
   Per-frame values (live drag measurements) are the extreme case of the same rule.

Merging a measured value into `style` needs a conditional spread, not an unconditional one —
`{ ...style, height: measuredHeight }` sets `height: undefined` whenever there's no measurement,
clobbering any `height` the caller passed in their own `style`. Gate the key's presence instead,
and give the merged result its own named local rather than inlining it at the JSX callsite:

```jsx
const style = {
  ...styleProp,
  ...(measuredHeight !== undefined && { height: measuredHeight }),
};
```

- When `measuredHeight` is `undefined`, `(false && {…})` spreads `false` — a no-op — so the
  caller's style passes through untouched.
- **Only rename the destructured prop to `styleProp`** (from plain `style`) when the component
  also has its own `<...>StyleProps` hook/local result in the same scope to disambiguate from —
  `styleProp`/`styleProps` differ by one character, so the merged result needs the distinct name
  `style` to read unambiguously. `TooltipContent.js`/`PopoverContent.js` do this (their
  `useXxxContentStyle()` result is `styleProps`); `ToastTransition.js`/`Collapse.js` don't (no
  competing `styleProps` at that scope), so they keep the plain `style` destructure and apply the
  same conditional-spread merge without renaming anything.

Precedent: `tree/TreeItemContent.js`, `tooltip/TooltipContent.js`, `popover/PopoverContent.js`,
`transitions/Collapse.js`, `toast/ToastTransition.js`.

One trap: keep `style` explicitly destructured in every transition component — it is an
**animation input**, not just a passthrough. `getEnterTransitionProps`/`getExitTransitionProps`
read `transitionDuration`/`transitionTimingFunction`/`transitionDelay` from it; letting it fall
into `rest` silently kills that override idiom while everything still *looks* like it works.

## `__sx`-regression tests — proving precedence-by-origin, not just pinning output

A snapshot test only pins *current* output — it won't catch a consumer override silently losing to
a component's own base styling (this loop has already found and fixed two such bugs: `ButtonBox`'s
precedence bug, `MenuContent`/`SubmenuContent` dropping a wrapper's `outline: 0` through a bad
`useSlot` composition). Every migrated component with real own-authored base styling gets a
dedicated `<Component>.sx.test.js`, mirroring the existing `<Component>.slots.test.js` convention
(filename names the feature, `describe('<Component> sx override', ...)` carries the specifics).

**The standard shape needs two cases, not one** — verified empirically, not assumed. A test using
only the consumer's public `sx` prop would have **passed against the real pre-fix `ButtonBox.js`**
(confirmed by reverting to that commit and re-running): the bug hardcoded `ButtonBox`'s own
`cursor` as a flat prop (tier 1), and a consumer's `sx` is tier 4 — already above tier 1 by
construction, both before and after the fix, so that case never touches the composition point the
bug was actually in. The real gap was whether an **incoming `__sx`** (from a wrapping component —
the same mechanism `useSlot` uses, just without `useSlot`) composes with and wins over the
component's own base style — confirmed by reproducing the failure on both `ButtonBox.js` and
`Divider.js` (`toHaveStyleRule` uses `@emotion/jest`, already globally registered by
`test-utils/render.js` — no new helper needed):

```jsx
// button-box/__tests__/ButtonBox.sx.test.js
describe('ButtonBox sx override', () => {
  it('consumer override: sx beats its own base cursor style', () => {
    const { container } = render(<ButtonBox sx={{ cursor: 'wait' }}>Click</ButtonBox>);
    expect(container.firstChild).toHaveStyleRule('cursor', 'wait'); // not the base 'pointer'
  });

  it('wrapper override: an incoming __sx composes with and wins over its own base cursor style', () => {
    // Simulates a wrapping component injecting __sx directly -- not a real
    // consumer-facing prop, but the only way to exercise this composition
    // point in isolation.
    const { container } = render(<ButtonBox __sx={{ cursor: 'wait' }}>Click</ButtonBox>);
    expect(container.firstChild).toHaveStyleRule('cursor', 'wait');
  });
});
```

Bespoke per file, no shared `expectSupportsSxProp()`-style helper — matches the `.slots.test.js`
precedent, and the render context (some components need `<Menu>`, `<Drawer isOpen>`, etc.) and
target property vary too much per component for one generic helper to earn its keep.

**Components with zero own base style** (confirmed no-op, e.g. `drawer/Drawer.js`,
`list/ListItem.js`, `tabs/TabPanels.js`) still get the file, with a single documented `it.skip` —
a skipped test is a durable, greppable record that Phase 4 evaluated the component and found
nothing, versus a missing file (ambiguous — forgotten, or deliberate?):

```jsx
describe('Drawer sx override', () => {
  it.skip('no own base style to override (Drawer forwards {...rest} straight to DrawerContainer)', () => {});
});
```

**Multi-`Box` components** (e.g. `Badge.js`): target only the `Box` reachable via `{...rest}`/`sx`.
Internal-only `Box`es with no incoming `rest`/`ref` (`__sx={ownStyle}`, no merge) structurally
cannot receive a consumer's `sx` — don't fake a test around a channel that doesn't exist there.

**Slot-composition shape** (a distinct second case, not yet implemented as of this ADR — deferred
to a future batch): 9 components inject their *own* `__sx` into a *default* slotted component via
`useSlot` (traced in `slot/useSlot.js`'s `composeSx(propsSx, slotSx)` merge) — `menu/MenuContent.js`,
`menu/SubmenuContent.js`, `date-pickers/DatePicker/DatePickerContent.js` (→ `Popper`);
`drawer/DrawerOverlay.js`, `modal/ModalOverlay.js` (→ `Fade`), `drawer/DrawerContent.js`
(→ `Slide`), `modal/ModalContent.js` (→ `Fade`), `accordion/AccordionContent.js` (→ `Collapse`);
`scrollbar/Scrollbar.js` (→ `ScrollView`). These need a render-in-open-state assertion proving
*both* the owner's contributed property and the slotted component's own base property survive
together (array composition), not just one winning. A `useSlot` call that injects no `__sx`
(`props: {}` closeButton slots, etc.) has no composition risk to test here — its slot *target*
(e.g. `AlertCloseButton.js`) still gets the standard shape, for its own base styling only.

## A caveat when composing `__sx` across multiple prop-getter contributions

Some headless-library patterns (react-table's `mergeGetPropsFns`-style composition, used by
`@tonic-ui/react-data-grid`) merge several features' contributions to one `getProps()` call via
a shallow `{...mergedProps, ...props}` object-spread. If two features both contribute `__sx` to
the same call, that shallow merge silently replaces one feature's `__sx` with the other's — the
same object-merge failure `composeSx` exists to prevent, just one layer up in the composition
pipeline. This isn't a bug in `__sx`/`composeSx` itself; it means the composition layer merging
*those* contributions also needs to fold `__sx` via `composeSx` rather than object-spread once more
than one contributor is in play. Check for this whenever you're adding a second feature/plugin
that needs to style the same element another feature already styles.
