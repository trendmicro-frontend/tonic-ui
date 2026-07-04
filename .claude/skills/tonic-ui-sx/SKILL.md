---
name: tonic-ui-sx
description: >-
  Decide between Tonic UI's `sx` and `__sx` styling channels (and the `mergeSx` fold) when
  writing or reviewing any component built on `@tonic-ui/react-base`'s `Box` — this covers
  `@tonic-ui/react` itself and any other package that renders `Box`-based components
  internally (e.g. `@tonic-ui/react-data-grid`; confirmed real instances of these anti-patterns
  exist there too, not just in the react package). Use this whenever you are authoring a
  component's base styles, routing a `useXxxStyle()` hook (or a headless-library prop-getter
  like react-table's `getRowProps`/`getHeaderProps`) onto a `Box`, choosing whether a style
  belongs in `sx`, `__sx`, style props, or pseudo props, folding an incoming `__sx`, building a
  wrapper that overrides a child component (e.g. MenuButton over Button, or a data-grid feature
  overriding a `@tonic-ui/react` component it wraps), or debugging a consumer override that
  "doesn't apply" or a wrapper override that gets dropped. Trigger it even when the user only
  mentions `sx`, `__sx`, `mergeSx`, styling tiers/precedence, "consumer override", or "base
  styling" in an tonic-ui context, or when working in a package outside `@tonic-ui/react`
  that still renders `Box` — even if they don't name the channel explicitly.
---

# Tonic UI: `sx` vs `__sx`

## The one rule that governs everything: precedence-by-origin

A component's **base styling always loses to a consumer override**, regardless of which CSS
property each touches. A wrapper's **child-override beats the child's base but still loses to
the end consumer**. To make that true structurally (not by convention), Tonic UI routes
*who wrote the style* to a fixed channel — and the channel decides precedence.

So the question is never "what does this style do?" but **"who is writing it?"**

- **You are the component author, styling your own `Box`** → `__sx` (lowest tier).
- **You are a wrapper, overriding a child component you render** → also `__sx` (folded into the child's incoming `__sx`).
- **You are the consumer (app developer)** → `sx` (highest tier), or style props / pseudo props.

A component **never writes its own styling to `sx`.** `sx` is the consumer's escape hatch.

"Writing it" isn't limited to a component's own render body. A higher-order component wrapping a
child, or a headless-library plugin contributing props via a getter function (e.g. react-table's
`getRowProps()`/`getHeaderProps()`, composed across features by a shallow merge), is just as much
"the component author" for this purpose as a render body is — the same hand-built-style-object,
hand-merged-via-`ensureArray`-or-object-spread failure shows up there too, just one layer removed
from JSX.

## The four channels of `Box`

`Box` concatenates four ordered channels into one Emotion class. For declarations of the
**same property at the same selector specificity**, a **later** channel wins.

| Channel | Who writes it | Tier | Notes |
|---|---|---|---|
| **`__sx`** (base sx) | Library / component internals | 0 — lowest | A component's own base styling. Full sx-object format. Internal: not in public `BoxProps`, never forwarded to the DOM. |
| **Style props** (`px`, `bg`, `color`, …) | Consumer | 1 | Flat layout/appearance props, resolved by the `system` transform. |
| **Pseudo props** (`_hover`, `_active`, `_focusVisible`, …) | Consumer | 3 | Each a single prop carrying a style object. |
| **`sx`** | Consumer | 4 — highest | The consumer's arbitrary-style escape hatch. |

`__sx` and `sx` accept the **identical authoring format**: flat declarations, nested selectors
(`'& svg'`, `'&:hover'`), pseudo shortcuts (`_hover`), `theme => …` functions, design tokens,
responsive arrays. They differ only in **tier** (who they belong to), not in what they can express.

## Why `__sx` exists (the problem it solves)

Before `__sx`, base styling was authored as style props (tier 1) + pseudo props (tier 3).
That made precedence a function of *which kind of prop* a value is — not who wrote it. Two
failures followed:

- A component that needed **nested selectors or pseudo-elements** (which flat style props
  can't express) had to author base styling via `sx` — but then the component's `sx` outranked
  the **consumer's** style props *and* `sx` (single shared slot), so the consumer could no
  longer override. Backwards.
- Wrappers overriding a child had to squat on the consumer's `sx` channel and hand-merge the
  consumer's `sx` back on top (`sx={[ownSx, ...ensureArray(sx)]}`) — done inconsistently across
  the codebase, silently dropping overrides when an author forgot the spread.

`__sx` is a dedicated lowest-priority channel that reuses the `sx` transform. Base styling goes
there; consumer style props and `sx` sit above it and override it. Precedence-by-kind becomes
precedence-by-origin, with no per-author merge bets.

## How to author base styling: the uniform fold

Every base-styling component follows the **same** call site. You cannot predict which
components a future wrapper will inject `__sx` into, so apply this uniformly — don't pick and
choose:

```js
import { mergeSx } from '@tonic-ui/utils/internal';

const MyComponent = forwardRef((inProps, ref) => {
  const {
    // ...component props...
    __sx: __sxProp,                 // destructure incoming __sx OUT of rest
    ...rest
  } = useDefaultProps({ props: inProps, name: 'MyComponent' });

  const styleProps = useMyComponentStyle(/* state */); // the COMPLETE base: flat + pseudo + nested

  return (
    <Box
      ref={ref}
      {...rest}
      __sx={mergeSx(styleProps, __sxProp)}   // own base first, incoming __sx folded last
    />
  );
});
```

Why each part matters:

- **`__sx` is destructured out of `rest`** so it is not applied twice (once via the spread,
  once via the explicit prop).
- **`mergeSx(styleProps, __sxProp)` is placed *after* `{...rest}`** so the explicit `__sx`
  wins the spread, and the incoming `__sx` (already folded) lands after the component's own
  base → an injected override beats the component's base, while the consumer's `sx` (tier 4)
  still beats everything.
- **`useXxxStyle()` returns the component's complete base** — flat layout, pseudo rules, and
  nested selectors in one value (an object, or an array when conditional/order-sensitive parts
  must compose). There is no separate `get*Sx` function; it was folded into `useXxxStyle`.

**Destructure `__sx: __sxProp` (and `...rest`) directly from `useDefaultProps` — in one line.**
Do not capture the whole bag as `const props = useDefaultProps(...)`. You need two things the
opaque bag can't give you cleanly: the incoming `__sx` *pulled out* (so it isn't applied twice)
and a `...rest` that no longer contains it (so the explicit `__sx={mergeSx(...)}` after the
spread wins). The one-line destructure is the canonical form:

```js
// ✅ canonical — destructure inline
const { __sx: __sxProp, ...rest } = useDefaultProps({ props: inProps, name: 'X' });
const styleProps = useXxxStyle(...);
return <Child {...rest} __sx={mergeSx(styleProps, __sxProp)} />;

// ❌ opaque bag — can't fold cleanly; `{...props}` carries an unfolded `__sx`,
//    and adding `__sx={...}` alongside it double-applies or collides
const props = useDefaultProps({ props: inProps, name: 'X' });
return <Child {...props} __sx={mergeSx(styleProps, props.__sx)} />;

// ❌ two-step — works, but re-destructuring from a captured bag is noise; inline it
const props = useDefaultProps({ props: inProps, name: 'X' });
const { __sx: __sxProp, ...rest } = props;
```

## `mergeSx`: array composition, never object merge

```js
const mergeSx = (...values) => values.flatMap((value) => ensureArray(value));
// import { mergeSx } from '@tonic-ui/utils/internal';   (internal — not the public barrel)
```

`mergeSx` is **variadic** — pass any number of sx-values (`mergeSx(base, a, b)`); arrays are
flattened and `undefined` is skipped. It returns an **array** for the `__sx`/`sx` prop.
**Do not spread it as props.**

**If you author the element through `useSlot`, you don't fold `__sx` yourself.** `useSlot`
composes both `ref` (via `useMergeRefs`) and `__sx` (via `mergeSx`) across `props` and
`slotProps` internally — put the base in `props.__sx`, pass the consumer's slot props as
`slotProps`, and the base stays below the slot's `__sx`. Do **not** strip `__sx` out of the
slot props or hand-merge it; that's the hook's job (mirrors how it merges `ref`):

```js
const [Slot, slotProps] = useSlot({
  props: { ref: combinedRef, __sx: baseStyle },  // base — useSlot keeps it below slotProps.__sx
  slot: slots.x ?? Default,
  slotProps: resolvedSlotProps,                   // consumer ref + __sx merged by useSlot
});
```

This is the single most important pitfall. Combining two sx-objects must use **array
composition** (`[a, b]`), not object merge (`{...a, ...b}`):

- **Array** → both objects are emitted; source order resolves conflicts **per declaration**.
  An incoming `&:hover` *partially* overrides the base `&:hover` (changes `color`, keeps the
  base `background`).
- **Object merge** → a nested key like `&:hover` from `b` **replaces** `a`'s `&:hover`
  entirely. The base hover styling is discarded. This is the wrong behavior and a common bug.

When there is **no incoming value to fold** (e.g. a sub-element whose style has no consumer
`__sx` slot), pass the style object **directly** — `mergeSx` adds nothing:

```js
// Folding an incoming __sx → use mergeSx:
<Box {...rest} __sx={mergeSx(styleProps, __sxProp)} />

// No incoming __sx → pass directly:
return { ref, onMouseDown, __sx: trackStyleProps };
```

## Worked example — self base styling (`Button`)

```js
// button/Button.js
const styleProps = useButtonStyle({ /* color, size, variant, ... */ });
return (
  <ButtonBase
    {...rest}
    __sx={mergeSx(styleProps, __sxProp)}
  />
);
```

Button's look (including `_hover`/`_active`) lives in `__sx`, so an app's `sx` or style props
override it cleanly.

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
    __sx={mergeSx(styleProps, __sxProp)}   // MenuButton's override → Button's incoming __sx
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
   `mergeSx(ownPersistentBase, animationStyleProps, __sxProp)` — incoming last. A consumer or
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

## Consumer usage — `sx`

App developers override component styling with `sx` (highest tier), or with style props /
pseudo props. They never touch `__sx` (it's internal and off the public type):

```jsx
<Button sx={{ bg: 'blue:50', _hover: { bg: 'blue:60' } }}>Save</Button>
<Button bg="blue:50">Save</Button>   {/* style prop, tier 1 — also beats base __sx */}
```

## The specificity boundary (read before promising "consumers can override anything")

Channel order resolves ties **only at equal selector specificity**. Specificity still applies:

- A **flat** base declaration in `__sx` (e.g. `{ color }`) is overridable by a consumer flat
  style prop *or* `sx`.
- A **nested/pseudo** base rule in `__sx` (e.g. `{ '&:hover': { color } }`, `{ '& svg': {…} }`)
  has higher specificity than a consumer's **flat** style prop, so a flat style prop will **not**
  override it — only a consumer rule of equal-or-higher specificity (a matching `sx` / `_hover`)
  will. This is inherent to CSS, not a quirk of `__sx`. Don't tell a consumer a flat `color`
  prop will override a base `&:hover` color.

## Naming conventions

- **Hook:** `use<Component>Style` (e.g. `useButtonStyle`); for a multi-part component, the root
  is `use<Component>RootStyle` (e.g. `useScrollbarRootStyle`, `useCircularProgressRootStyle`).
- **Local variable** holding the hook result: `<...>StyleProps`
  (e.g. `styleProps`, `rootStyleProps`, `circularProgressRootStyleProps`).
- **Incoming consumer `__sx`:** destructured as `__sx: __sxProp` (mirrors the `sx: sxProp`
  convention).
- **Incoming consumer `style`,** when it needs merging with another style source (a colliding
  `<...>StyleProps` hook result, a transition handoff's `transitionStyle`, a measured value):
  see the merge pattern in the Transition components section above for the canonical shape
  (`const style = { ...styleProp, ...(condition && { key: value }) };`) and the naming-collision
  caveat — rename the destructure to `styleProp` only when a colliding `styleProps` exists in the
  same scope, never rename the hook result to make room for it.
- The helper is **`mergeSx`** — named for the `__sx`/`sx` *channel* it operates on, deliberately
  not `mergeStyleProps` (which would read as merging the tier-1 `system` channel).

## Red flags when writing or reviewing

- A component writing its **own** styling to `sx=` → should be `__sx`. (`sx` is consumer-only.)
- `__sx={{...a, ...b}}` or `sx={{...ownSx, ...props.sx}}` (object merge of sx-objects) → use
  `mergeSx(a, b)` (array). Object-merging discards whole nested keys like `&:hover`.
- `mergeSx(...)` spread as props (`<Box {...mergeSx(...)} />`) → it returns an **array** for the
  `__sx`/`sx` prop, not a props object.
- Incoming `__sx` not destructured out of `rest`, or `mergeSx(...)` placed **before** `{...rest}`
  → the fold is wrong; an injected override is double-applied or silently dropped.
- `const props = useDefaultProps(...)` capturing the whole bag, then `{...props}` onto the child
  → the incoming `__sx` rides along unfolded; destructure `const { __sx: __sxProp, ...rest } =
  useDefaultProps(...)` inline instead (don't capture `props` then re-destructure either).
- A wrapper overriding a child via `sx={[ownSx, ...sx]}` (hand-merge) → migrate to `__sx`; the
  child folds it natively, no hand-merge.
- `mergeSx(styleProps)` with a single arg where there's genuinely no incoming `__sx` → just pass
  `__sx={styleProps}` directly.
- "Consumer's flat style prop should override the base hover" → check specificity; a nested base
  rule isn't beaten by a flat prop.
- A transition component spreading its animation state (`opacity`/`transform`/`transition` derived
  from the state enum) as flat `Box` props, or handing it to a function child inside `style` →
  both belong in `__sx` (see the transition section above).
- A DOM-measured value (content height, auto-computed duration) serialized through `__sx`/`sx` →
  inline `style`; each distinct measurement would mint an uncollectable stylesheet class.

## Sources of truth (in this repo)

- `CONTEXT.md` — the styling-channel glossary (the table above).
- `docs/adr/2026-06-29-sx-as-universal-base-channel.md` — `__sx` as the universal internal base
  channel; `sx` reserved for consumers; the `mergeSx` fold.
- `docs/adr/2026-06-24-box-internal-sx-base-channel.md` — why `__sx` was introduced and the
  specificity boundary.
- `docs/adr/2026-07-03-transition-style-through-sx-channel.md` — the transition convention:
  animation state through `__sx` in both render modes; the function-child handoff carries `__sx`
  and requires a `Box`-based child; DOM-measured values stay on inline `style`.
- `packages/react-base/src/box/Box.js` — the four-channel compose chain.
- `packages/utils/src/internal/mergeSx.js` — the helper.
- `docs/plans/2026-07-02-tonic-ui-sx-internals-migration.md` — the migration plan covering both
  `@tonic-ui/react` and the confirmed `@tonic-ui/react-data-grid` instances (e.g.
  `DataGridResizeHandle.js`, `DataGridScrollbar.js`, `RowReorder.js`'s `getRowProps()`
  contribution); a live worked example of every pattern above outside a component render body.

## A caveat when composing `__sx` across multiple prop-getter contributions

Some headless-library patterns (react-table's `mergeGetPropsFns`-style composition, used by
`@tonic-ui/react-data-grid`) merge several features' contributions to one `getProps()` call via
a shallow `{...mergedProps, ...props}` object-spread. If two features both contribute `__sx` to
the same call, that shallow merge silently replaces one feature's `__sx` with the other's — the
same object-merge failure `mergeSx` exists to prevent, just one layer up in the composition
pipeline. This isn't a bug in `__sx`/`mergeSx` itself; it means the composition layer merging
*those* contributions also needs to fold `__sx` via `mergeSx` rather than object-spread once more
than one contributor is in play. Check for this whenever you're adding a second feature/plugin
that needs to style the same element another feature already styles.
