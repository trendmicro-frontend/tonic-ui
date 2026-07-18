# Box: add an internal `__sx` base-style channel below style props and `sx`

**Status:** accepted

`Box` composes its style layers in a fixed priority order — `system` (style props) → pseudo props → `sx` — where, **for declarations of the same property at the same selector specificity**, the later layer wins (Emotion concatenates all layers into one class and resolves conflicts by CSS source order, which follows the compose-chain order). This makes precedence a function of *which kind of prop* a value is written as, not *who wrote it*. The "consumer can override" behavior therefore only works by convention: it holds when the library authors base styles as low-priority style props and the app overrides via high-priority `sx`. Invert the roles — a component authoring base styles via `sx` (necessary for nested selectors, pseudo-elements, and other rules that flat style props can't express) — and the component's `sx` outranks both the app's style props and the app's `sx` (single shared slot), so the app can no longer override.

We decided to add an **internal, lowest-priority channel `__sx`** to `Box`, placed first in the compose chain (below style props, pseudo props, and `sx`). It reuses the existing `sx` transform, so it accepts the identical authoring format (objects, `theme => …` functions, arrays, tokens, responsive values, pseudo shortcuts, nested selectors) at the lowest tier. Library authors put base styling in `__sx`; consumer style props and `sx` sit above it in source order and override it **for flat declarations at the same selector specificity**. This converts precedence-by-kind into precedence-by-origin for base styles.

This guarantee is bounded by CSS specificity, not just layer order. A *flat* base declaration in `__sx` (e.g. `{ color }`) is overridable by either a consumer style prop or consumer `sx`. A base declaration written as a *nested or pseudo rule* in `__sx` (e.g. `{ '&:hover': { color } }`, `{ '& svg': { … } }`) has higher specificity than a consumer's flat style prop, so it is overridable only by a consumer rule of equal-or-higher specificity (a matching `sx` / `_hover`), not by a flat style prop. This is inherent to CSS and is not made worse by `__sx`; it is called out so authors don't expect flat style props to override nested base rules.

`__sx` is internal: it follows the existing `__colorMode` double-underscore convention, is excluded from `shouldForwardProp` (never reaches the DOM), and is kept out of the public `BoxProps` type. Single underscore was rejected because it collides with the pseudo-prop / semantic-token prefix (`_hover`, `_foreground`).

## Considered Options

- **Dedicated low-priority `__sx` channel (chosen).** Fixes both broken cases (component base vs. app style props, and component base vs. app `sx`) structurally. Cost: adds a prop to Box's surface and an authoring convention (authors must move base styling from `sx` to `__sx`; adoption is opt-in, not automatic).
- **Merge-convention only (rejected).** Require authors who use `sx` to array-merge the consumer's value last: `sx={[ownSx, props.sx]}`. No Box change. Rejected because it only fixes the `sx`-vs-`sx` case; a component's `sx` still outranks an app's *style props*, and it relies on every author hand-rolling the merge correctly (the codebase already does this inconsistently — `TableCell` merges, `Checkbox` does not).
- **Reorder/disambiguate inside Box (rejected).** Box sees a single merged set of props and cannot distinguish "library base" from "consumer override" for the same prop; the collision is resolved at the JSX spread site before Box runs, so no change inside Box alone can solve it without a separate channel.

## Consequences

- Existing components are unaffected; `__sx` is additive. Components that currently author base styles via `sx` (9 today) can migrate to `__sx` case by case to gain consumer-overridability, but that migration is out of scope for the channel's introduction.
- A component only benefits if it actually moves base styling into `__sx`; keeping base styles in `sx` changes nothing.
