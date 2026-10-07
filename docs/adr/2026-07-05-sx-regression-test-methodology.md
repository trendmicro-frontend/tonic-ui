# Phase 4 `__sx`-regression test methodology

Every component migrated onto the `__sx` base-styling channel needs a test proving its own
base styling doesn't silently defeat a consumer's override — the existing snapshot tests only pin
current output and already missed two real bugs found this way (`button-box/ButtonBox.js`'s
precedence bug; `menu/MenuContent.js` and `menu/SubmenuContent.js` dropping a wrapper's
`outline: 0` through a bad `useSlot` composition).

## Decision

1. **Reframe the goal.** The backlog note said "prove a consumer's `__sx` prop reaches the DOM" —
   but `CONTEXT.md` names `__sx` as Library-owned, never a consumer-facing prop. The actual
   invariant to prove is `CONTEXT.md`'s own **precedence-by-origin**: a consumer override (the
   public `sx` prop, tier 4) always beats a component's own base styling (`__sx`, tier 0).
2. **File convention: `<Component>.sx.test.js`**, mirroring the existing `<Component>.slots.test.js`
   pattern — the filename names the feature, the `describe('<Component> sx override', ...)` block
   carries the specifics.
3. **Assertion: `toHaveStyleRule`** from `@emotion/jest`, already globally registered via
   `test-utils/render.js` (see `mark/__tests__/Mark.test.js` for the existing precedent). No new
   assertion helper — it already covers every stylesheet-based case Phase 4 needs; DOM-measured
   inline-style values are a separate, already-solved concern
   ([2026-07-03-transition-style-through-sx-channel](./2026-07-03-transition-style-through-sx-channel.md)).
4. **Bespoke per file, no shared `expectSupportsSxProp()`-style helper.** Matches the `.slots.test.js`
   precedent (also bespoke). Each component's own base-style property to target lives in a
   different `styles.js`, and many components need bespoke render context (`<Menu>`, `<Drawer
   isOpen>`, etc.) that a generic helper would need an escape hatch for anyway.
5. **Skip components with zero own base style, but keep the file with a documented `it.skip`** —
   e.g. `drawer/Drawer.js`, `list/ListItem.js`, `tabs/TabPanels.js`. A skipped test is a durable,
   greppable record that Phase 4 evaluated the component and found nothing, versus a silently
   missing file (ambiguous — forgotten, or deliberately skipped?).
6. **On a multi-`Box` component, target only the `Box` reachable via `{...rest}`/`sx`.** Several
   components (`Badge.js`, `Select.js`, etc.) have internal `Box`es that never receive consumer
   props by design (`__sx={ownStyle}` with no merge) — a consumer's `sx` structurally cannot reach
   them. Not a gap to fake a test around.
7. **The standard shape needs two cases per component, not one** — verified empirically against
   real history, not assumed. Checked whether a public-`sx`-only test would have caught the actual
   `button-box/ButtonBox.js` precedence bug: reverted to the pre-fix code and ran a `sx`-only test
   against it — **it still passed**. The pre-fix bug hardcoded the component's own `cursor` as a
   flat prop (tier 1); a consumer's public `sx` is tier 4, which already beats tier 1 by
   construction in `Box.js`, before *and* after the fix — so that case never touches the
   composition point the bug was actually in. The real gap was whether an **incoming `__sx`**
   (from a wrapping component — the same mechanism `useSlot` uses, just without `useSlot`) composes
   with and wins over the component's own base style. A second case passing `__sx` directly
   (simulating a wrapper — not a real consumer-facing prop, but the only way to exercise this
   composition point standalone) **did** fail against the pre-fix code and pass against current
   code — confirmed on both `ButtonBox.js` and `Divider.js` by temporarily reintroducing the broken
   fold and re-running. Every `.sx.test.js`'s standard shape is therefore:
   - **Consumer override**: public `sx` beats own base style (catches "wrote own style to `sx=`
     instead of `__sx=`", "opaque props-bag capture drops the `__sx` destructure" — both real,
     already-found bug classes).
   - **Wrapper/child override**: an incoming `__sx` prop, passed directly in the test, composes
     with and wins over the component's own base style (catches the `ButtonBox`-class bug).
8. **Slot-composition is a distinct third shape** (components that inject their own `__sx` into a
   *default* slotted component via `useSlot`, traced directly in `slot/useSlot.js`'s merge logic):
   `menu/MenuContent.js`, `menu/SubmenuContent.js`, `date-pickers/DatePicker/DatePickerContent.js`
   (→ `Popper`); `drawer/DrawerOverlay.js`, `modal/ModalOverlay.js` (→ `Fade`),
   `drawer/DrawerContent.js` (→ `Slide`), `modal/ModalContent.js` (→ `Fade`),
   `accordion/AccordionContent.js` (→ `Collapse`); `scrollbar/Scrollbar.js` (→ `ScrollView`). These
   need render-in-open-state assertions proving *both* the owner's contributed property and the
   slotted component's own base property survive together (array composition), not just one
   winning. `useSlot` calls that inject no `__sx` (`props: {}` closeButton slots, etc.) have no
   composition risk — their slot *targets* (`AlertCloseButton.js`, `DrawerCloseButton.js`, etc.)
   still get the standard two-case test, just for their own base styling, unrelated to the slot
   mechanism.

## Scope of this decision

This ADR covers the **design only**. The two-case standard shape (on `divider/Divider.js` and
`button-box/ButtonBox.js`) was prototyped and verified to actually fail against a deliberately
broken fold, on both components, before this convention was adopted. Applying `.sx.test.js`
coverage across the rest of the component library — including the slot-composition shape above —
is tracked as its own follow-up effort, not part of adopting this convention.

## Considered and rejected

- **A shared `expectSupportsSxProp(Component, ...)` helper** — rejected; the render-context and
  target-property variance across the component set would force the helper into an escape-hatch-heavy
  shape, no simpler than bespoke tests, and breaks from the `.slots.test.js` precedent.
- **Testing every internal `Box` on multi-`Box` components** — rejected; internal-only `Box`es with
  no incoming `rest`/`ref` cannot receive a consumer's `sx` by construction, so a test there would
  either be vacuous or fake a channel that doesn't exist.
