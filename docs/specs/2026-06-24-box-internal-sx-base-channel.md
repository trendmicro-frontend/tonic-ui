# Implementation Plan — `Box` internal `__sx` base-style channel

**Decision record:** [`docs/adr/2026-06-24-box-internal-sx-base-channel.md`](../adr/2026-06-24-box-internal-sx-base-channel.md)
**Scope:** `@tonic-one/react-base` `Box` only. No component migrations.
**Safe rollback point:** clean `main` @ `b66d480dc` — additive change confined to 3 files; `git checkout` to revert.

## 1. Code change — `packages/react-base/src/box/Box.js`

**a.** Rename `transformCSSSuperset` → `transformSxProp` (keep its body).

**b.** Add the base transform above it:
```js
const transformBaseSxProp = (props) => {
  // The internal `__sx` prop carries component base styles at the lowest priority,
  // so consumer style props and `sx` can override them. Reuses the `sx` transform.
  return sx(props?.__sx);
};
```

**c.** Reorder the compose chain — `transformBaseSxProp` **first** (lowest), `transformSxProp` **last** (highest):
```js
const Box = styled('div', { shouldForwardProp })(
  transformBaseSxProp,          // `__sx` — base styles, LOWEST priority
  system,                       // style props
  transformCSSPseudoSelectors,  // pseudo props (unchanged)
  transformSxProp,              // `sx` — HIGHEST priority
);
```

**d.** Add `'__sx': true` to `omittedStylePropMap`, for parity with `__colorMode`.
*(Redundant — `isPropValid('__sx') === false` already blocks it — but documents intent.)*

Verify: `transformCSSPseudoSelectors` untouched; no other symbols renamed; no public export change.

## 2. Types — `packages/react-base/src/box/index.js`

Leave the public `BoxProps` typedef **unchanged** — `__sx` stays out of it. Add one internal JSDoc
comment near the `BaseBox` usage noting `__sx` is an internal, undocumented channel (mirrors `__colorMode`).

Verify: `__sx` does not appear in any `@property` of the public typedef.

## 3. Tests — `packages/react-base/src/box/__tests__/Box.test.js`

Use `toHaveStyleRule` (already wired via `@emotion/jest`). Precedence tests use **raw CSS values**
(no theme dependency); resolution tests wrap in `@emotion/react`'s `ThemeProvider` with a minimal theme.

| # | Test | Assertion |
|---|---|---|
| 1 | `__sx` applies base styles | `<Box __sx={{ color: 'red' }}/>` → `color: red` |
| 2 | style prop overrides `__sx` | `<Box __sx={{ color: 'red' }} color="blue"/>` → `color: blue` |
| 3 | `sx` overrides `__sx` | `<Box __sx={{ color: 'red' }} sx={{ color: 'blue' }}/>` → `color: blue` |
| 4 | `__sx` not forwarded to DOM | rendered element has **no** `__sx` attribute |
| 5 | nested-vs-flat limitation | `<Box __sx={{ '&:hover': { color: 'red' } }} color="blue"/>` → base hover rule survives; documents that a flat style prop does not override a nested base rule (`toHaveStyleRule(el,'color','red',{target:':hover'})`) |
| 6 | nested-vs-nested source order | consumer `sx={{ '&:hover': {...} }}` wins over `__sx` `&:hover` |
| 7 | responsive array in `__sx` | `__sx={{ color: ['red','blue'] }}` resolves base + media query (needs ThemeProvider with `breakpoints`) |
| 8 | `__sx` as `theme => ({...})` | function form resolves at the lowest tier |

Verify: all green; existing snapshot test unchanged (additive change doesn't alter `<Box>This is a box</Box>` output).

## 4. Changeset — `.changeset/tonic-one-pr-<PR_NUMBER>.md`

```md
---
"@tonic-one/react-base": minor
---

feat(react-base): add internal `__sx` base-style channel to `Box` so component
base styles sit below style props and `sx`, letting consumers override them.
```

## 5. Verification (run from `packages/react-base`)

```bash
yarn test --testPathPattern="Box"   # tests 1–8 + existing pass
yarn lint                           # clean
yarn build                          # rollup build succeeds
```

## Acceptance criteria

- Tests 1–3 prove precedence-by-origin for flat declarations; tests 5–6 pin the specificity boundary the ADR documents.
- `__sx` never reaches the DOM (test 4).
- No change to public types, exports, or existing snapshots.
- `lint` + `build` clean.
