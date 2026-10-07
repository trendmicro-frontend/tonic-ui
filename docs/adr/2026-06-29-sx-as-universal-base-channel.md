# `__sx` as the universal internal base-style channel; `sx` reserved for consumers

**Status:** accepted

## Context

PR #506 added `Box`'s internal `__sx` channel — the lowest-priority style layer, below
style props, pseudo props, and `sx` (see
[2026-06-24-box-internal-sx-base-channel.md](./2026-06-24-box-internal-sx-base-channel.md)).
PR #507 migrated 6 components off the Emotion `css` prop onto `__sx`/`sx`, but adoption was
deliberately scoped and case-by-case: most components still author base styling as **style
props** (`const styleProps = useXxxStyle(); <Box {...styleProps} />`, tier 1) and pseudo
props (`_hover`, tier 3).

That leaves precedence as a function of *which kind of prop* a value is written as, not *who
wrote it*. Two consequences:

- A wrapper that overrides a child component (e.g. `MenuButton` over `Button`) must place its
  override **above** the child's pseudo tier, so it squats on the consumer's `sx` channel and
  must hand-merge the consumer's `sx` back to the top: `sx={[menuButtonSx, ...ensureArray(sx)]}`.
- Components that author base styling via `sx` hand-merge the consumer's `sx` inconsistently —
  `CheckboxControlBox`/`RadioControlBox`/`SwitchControlBox`/`TableCell` merge; `Checkbox`
  (`sx={sx}`) drops it. This is the same fragility ADR-506 cited when it *rejected* a
  merge-convention-only approach.

We want **precedence-by-origin** to be the uniform rule: a component's base styling always
loses to a consumer override, and a wrapper's child-override always beats the child's base but
loses to the end consumer — without per-author hand-merges.

## Decision

1. **`__sx` is the single channel every component authors base styling through.** The object
   a `useXxxStyle()` hook returns is routed through `__sx`, not spread as style props /
   pseudo props. The 45 `useXxxStyle` source hooks keep their names; only their destination
   changes.

2. **`sx` is consumer-only.** No component writes its own styling to `sx`. Style props and
   pseudo props remain available to consumers at their existing tiers.

3. **Composition is array, never object merge.** A component folds any incoming `__sx`
   (injected by a wrapper) after its own base:
   `__sx = [ownBase, ...ensureArray(props.__sx)]`. The `sx` transform flattens the array and
   the cascade resolves conflicts *per declaration* (partial override of nested/pseudo rules).
   A plain object merge (`{...a, ...b}`) would replace whole keys (e.g. `&:hover`) and is
   wrong.

4. **The fold uses one shared helper, called directly.** A single pure util in
   `@tonic-ui/utils`:
   - `composeSx(a, b)` — returns `[...ensureArray(a), ...ensureArray(b)]`.

   Call convention, **uniform across every base-styling component** (since you cannot predict
   which components a future wrapper will inject `__sx` into):
   ```js
   const { __sx, ...rest } = useDefaultProps({ props: inProps, name: 'X' });
   const styleProps = useXxxStyle(...);                 // full base: flat + pseudo + nested
   return <Child {...rest} __sx={composeSx(styleProps, __sx)} />;
   ```
   `__sx` is destructured out of `rest` (so it is not double-applied) and folded last via
   `composeSx`, so an injected `__sx` wins over the component's own base while the consumer's
   `sx` (tier 4) still wins over everything.

   Each `useXxxStyle` returns the component's **complete** base — flat layout, pseudo rules,
   and nested selectors in one value (object, or an array when conditional/order-sensitive
   parts must compose, e.g. an in-group input). The previous split into a separate `get*Sx`
   function per component was folded into its `useXxxStyle`.

   A thin `useMergeSx(ownBase, props)` hook (= `composeSx(ownBase, props?.__sx)`) was considered
   and **rejected as redundant encapsulation** — once `__sx` is destructured, it adds nothing
   over `composeSx` and hurts readability.

### Naming note

`composeSx` is named for the channel it operates on (the `__sx`/sx layer) — deliberately *not*
`mergeStyleProps`, which would collide with "style props" (the tier-1 `system` channel) and
read as if it merges that channel. The remaining nuance is that "merge" suggests object-merge;
the behavior is **array composition**. JSDoc and types state: (a) returns an **array** for
`__sx=`, never an object to spread; (b) arg1 is a **base-sx object** bound for `__sx`.

## Considered Options

- **Per-author hand-merge convention (rejected).** Every component writes
  `__sx={[ownBase, ...ensureArray(props.__sx)]}` inline. Reintroduces exactly the fragility
  ADR-506 rejected: an author forgets the spread, a wrapper's override silently dies (the
  MenuButton dead-override bug class), with no type error because `__sx` is internal/untyped.

- **Only wrap-target components carry the fold (rejected).** Non-uniform — "TableCell merges,
  Checkbox doesn't" reborn; you cannot reliably predict which components get wrapped.

- **Util + composer hook, applied uniformly (chosen).** One tested implementation of the
  fold; components route base styling through it so omitting it fails loudly (no base style at
  all) rather than silently dropping an override.

## Consequences

- **Improved consumer overridability.** Base `_hover` moves from the pseudo tier (3) to `__sx`
  (0), so a consumer's `_hover` now *partially* overrides it (changes `color`, keeps the
  component's hover `background`) instead of replacing the whole pseudo object.
- **Wrapper hand-merges disappear.** `MenuButton`'s `sx={[menuButtonSx, ...sx]}` and the four
  control-boxes' `sx={[sx, ...ensureArray(sxProp)]}` are removed: own styling moves to `__sx`,
  consumer `sx` flows natively on top.
- **Large blast radius.** ~153 components / 45 `styles.js` files change destination; expect
  broad snapshot churn (tier-reorder only, no rule/value drops, as in PR #507). This is a
  migration, not a single PR — sequence it as its own loop.
- **`__sx` is promoted** from "internal self-base" to "the internal inter-component base
  channel." It stays out of the public `BoxProps` and off the DOM — not consumer-facing — but
  is now load-bearing for wrapper→child composition.
- **Cost vs ADR-506.** ADR-506 said `__sx` adoption was opt-in and out of scope; this ADR makes
  it the standard. The trade is migration cost + the accepted naming risk, in exchange for a
  single uniform precedence-by-origin rule with no per-author merge bets.

## Duplicate declarations in snapshots, and why we don't dedupe

Moving a base style from a flat style prop to `__sx` splits it from a consumer/wrapper override
into a *different* tier. The two tiers are separate args to `styled('div')(...)` (`Box.js:46-51`),
which Emotion **concatenates into one class**, so the same property now emits **twice** in one rule
block — tier-0 base first, the override later. e.g. a `PaginationItem` page button shows
`padding-left: 3x` (Button base, tier 0) then `padding-left: 2x` (the override, tier 1). Before the
migration both lived in one channel, so the prop-collision collapsed them to a single declaration;
splitting channels surfaces the redundant-but-overridden base. This is the expected signature of the
model, not debt.

**Two levels of merge, deliberately different:**

- **Across tiers** (`__sx` < style props < pseudo < `sx`): Emotion concatenation → CSS
  **last-declaration-wins**, resolved **property-level**. This is what makes partial overrides work
  and is where base-vs-override precedence lives.
- **Within one `composeSx(...)` call** (one `sx([...])`): each element is resolved independently —
  *including theme functions* `(theme) => ({…})`, which is why this must be an array and not an
  object merge (you cannot `{...base, ...fn}` a function) — then the resolved objects are
  **shallow-merged** (`sx.js:114-119`), i.e. **key-level**. A nested `&:hover` from a later element
  replaces an earlier one's whole `&:hover` block. We avoid this edge by tiering (base vs. override
  in different tiers), not by co-arraying overlapping nested blocks.

**Why not strip the duplicate (considered, rejected):**

- *Custom stylis plugin* — Emotion's preprocessor (stylis) does not dedupe; a plugin could, but
  correctly handling shorthand↔longhand, vendor prefixes, `!important`, and custom properties is
  hard, runs every serialization, and buys only cosmetic cleanliness. The browser already discards
  the overridden declaration at parse for free.
- *Object/deep merge before Emotion* (the Chakra approach) — the only way to truly remove the
  duplicate, but reintroduces exactly what array composition prevents: it can't carry function-valued
  sx, and merging drops partial nested overrides.
- *Atomic CSS* (`@emotion/css` atomic / compiled libs dedupe via class composition) — a different
  rendering model than non-atomic `styled()`; far larger change than the problem warrants.
- *Snapshot-serializer dedupe* — hides tier composition from diffs and doesn't reflect shipped CSS.

Decision: **leave the duplicate.** It is functionally inert and is the visible signature of a
correct, override-friendly model.

**Real-browser verification (V1, 2026-06-30).** jsdom (jest) does not compute the cascade, so
snapshots cannot prove last-wins. Driving real Chromium (Playwright) against the docs site confirmed
the override wins: `PaginationItem` resolves `padding-left/right` to `8px` (= `.5rem`, space-2x; not
the `12px` space-3x base) and `transition` to `none`; `AlertCloseButton` resolves `color` to the
`text.secondary` token (not the `inherit` reset) and `background-color` to transparent. The other
~15 Button/ButtonBase wrappers conform by the same single-class mechanism.
