# Token Mapping: tonic-ui v3 substrate → tonic-one v4 semantic format

Status: design draft for implementer. Reviewed by orchestrator.

## 1. Principle

**Keep tonic-ui's v3 VALUES. Restructure them into tonic-one's v4 semantic-token FORMAT.**

The migration re-expresses tonic-ui's existing color substrate — the `colorStyle`
dark/light alias table plus the flat color primitives — using tonic-one's v4 token
shape, but it does **not** adopt v4's values, palette, or namespace breadth.

Concretely:

1. **Leaf shape.** Every semantic color leaf becomes a `{ _dark, _light }` object,
   exactly as in tonic-one v4 (`packages/theme/src/v4/semantic/colors/*.js`). There
   are no flat string leaves at the semantic layer. The two halves of each pair are
   filled from the tonic-ui `colorStyle` dark-mode and light-mode tables respectively.

2. **Reference syntax.** Where a `colorStyle` role points at a named primitive
   (e.g. `gray:100`), the semantic value uses the v4 dot-path reference form
   `{gray.100}`. Where the role is a raw literal (an `rgba(...)`, a bare hex such as
   `#fce79e`, or a composite shadow string), the literal is inlined verbatim — v3
   values are preserved exactly, never recomputed.

3. **Scope = the v3-still-in-v4 set only.** We model the *structure* on tonic-one v4
   but populate **only the namespaces that the v3 substrate actually covers**:
   `background`, `text` (tonic-ui `color.*` + `text.*`), status colors
   (`success`/`info`/`warning`/`error`), `divider`/`border`, and `shadows`. We do
   **not** invent the full v4 breadth (`_foreground`, `_link`, `_overlay`, `actions`,
   `riskLevel`, expanded `lighten`/`darken` stops, `_fixed`/`_inverse`, `color-mix`
   composites, etc.). Those have no v3 source and are out of scope. Deprecated
   `colorStyle` groups (`severity`, `chart.classic`) are mapped but flagged — see §3.

4. **Primitive key rename.** tonic-ui primitives use colon keys (`gray:100`). v4
   uses dot keys (`gray.100`). The migration restructures primitive keys to dot form
   so the `{ref}` syntax resolves; the VALUES (hex/rgba) are byte-for-byte the v3
   values. This is a key-format change only. See §2.0 and Open Question Q1.

> Naming convention carried over from v4: namespaces prefixed `_` are internal.
> Here only status-internal helpers (if any) would use it; the mapped set is all
> public.

---

## 2. Mapping tables

### 2.0 Primitive layer (`theme.colors.<name>.<step>`)

Re-key the v3 flat primitives from `name:step` to `name.step`, preserving values.
These become the reference targets for `{name.step}` in §2.1+. Values verbatim from
`packages/theme/src/foundations/colors.js`:

| v3 key | v4 ref path | value (unchanged) |
|---|---|---|
| `transparent` | `colors.transparent` | `transparent` |
| `current` | `colors.current` | `currentColor` |
| `red:10..100` | `colors.red.10..100` | `#fee1e2 #fcc3c4 #fd999a #f46f71 #f24c4f #e52630 #d71920 #b80003 #9d0003 #6e0002` |
| `magenta:10..100` | `colors.magenta.10..100` | `#fee1ec #fcc3d8 #f9a0c1 #f36fa0 #e94181 #dc1d68 #ca0455 #b3004c #960043 #750037` |
| `purple:10..100` | `colors.purple.10..100` | `#eee1fe #ddc3fc #cca6f9 #bb89f6 #ab6ff3 #8f41e9 #771ddc #6304ca #5300a5 #460086` |
| `blue:10..100` | `colors.blue.10..100` | `#e1ebfe #c3d6fc #95b7fc #6f9bf4 #578aef #1e5ede #0547cd #003db8 #00349d #002a7e` |
| `green:10..100` | `colors.green.10..100` | `#c3fcd8 #89f6b2 #40e884 #04c45a #00a94f #008539 #00712e #005c24 #00461a #003011` |
| `teal:10..100` | `colors.teal.10..100` | `#c3fcf0 #89f6df #41e9c5 #04caa1 #00a584 #00866c #00755f #006451 #005242 #004034` |
| `cyan:10..100` | `colors.cyan.10..100` | `#c3f9fc #89f0f6 #41d8e9 #10b4d3 #0095bf #0075a5 #006496 #005486 #004575 #003664` |
| `gray:10..100` | `colors.gray.10..100` | `#f2f2f2 #e0e0e0 #c9c9c9 #adadad #8a8a8a #5e5e5e #424242 #303030 #212121 #151515` |
| `orange:50` | `colors.orange.50` | `#ff7633` |
| `yellow:50` | `colors.yellow.50` | `#faba2a` |
| `white:emphasis` | `colors.white.emphasis` | `rgba(255, 255, 255, 1.0)` |
| `white:primary` | `colors.white.primary` | `rgba(255, 255, 255, .92)` |
| `white:secondary` | `colors.white.secondary` | `rgba(255, 255, 255, .60)` |
| `white:tertiary` | `colors.white.tertiary` | `rgba(255, 255, 255, .47)` |
| `white:disabled` | `colors.white.disabled` | `rgba(255, 255, 255, .28)` |
| `black:emphasis` | `colors.black.emphasis` | `rgba(0, 0, 0, 1.0)` |
| `black:primary` | `colors.black.primary` | `rgba(0, 0, 0, .92)` |
| `black:secondary` | `colors.black.secondary` | `rgba(0, 0, 0, .65)` |
| `black:tertiary` | `colors.black.tertiary` | `rgba(0, 0, 0, .54)` |
| `black:disabled` | `colors.black.disabled` | `rgba(0, 0, 0, .30)` |

(The 10/20/.../100 list above is in ascending step order; the value list is in the
same order. Each `name.step` maps positionally to the step.)

### 2.1 `background` namespace (`theme.colors.background.*`)

Source: `colorStyle.background.*` (active, non-deprecated).

| Role | New token path | `_dark` | `_light` |
|---|---|---|---|
| background.primary | `colors.background.primary` | `{gray.100}` | `{white.emphasis}` |
| background.secondary | `colors.background.secondary` | `{gray.90}` | `{gray.10}` |
| background.tertiary | `colors.background.tertiary` | `{gray.80}` | `{gray.20}` |
| background.inverted | `colors.background.inverted` | `{gray.10}` | `{gray.70}` |
| background.inverse | `colors.background.inverse` | `{gray.10}` | `{gray.70}` |
| background.highlighted | `colors.background.highlighted` | `rgba(255, 255, 255, 0.12)` | `rgba(0, 0, 0, 0.12)` |
| background.selected | `colors.background.selected` | `rgba(255, 255, 255, 0.08)` | `rgba(0, 0, 0, 0.08)` |

Note: `inverse` is a v3 alias of `inverted` (identical values). Keep both keys for
back-compat unless implementer prefers `inverse: '{colors.background.inverted}'`
cross-reference (see Q5).

### 2.2 `text` namespace (`theme.colors.text.*`)

Source: `colorStyle.color.*` (foreground roles) + `colorStyle.text.*` (selection/highlight).
tonic-ui calls the foreground group `color`; v4 calls it `text`. We map `color.* → text.*`.

| Role | New token path | `_dark` | `_light` |
|---|---|---|---|
| color.emphasis | `colors.text.emphasis` | `{white.emphasis}` | `{black.emphasis}` |
| color.primary | `colors.text.primary` | `{white.primary}` | `{black.primary}` |
| color.secondary | `colors.text.secondary` | `{white.secondary}` | `{black.secondary}` |
| color.tertiary | `colors.text.tertiary` | `{white.tertiary}` | `{black.tertiary}` |
| color.disabled | `colors.text.disabled` | `{white.disabled}` | `{black.disabled}` |
| text.selection | `colors.text.selection` | `{blue.60}` | `{blue.60}` |
| text.highlight | `colors.text.highlight` | `#fce79e` | `#fce79e` |

Note: `text.selection` and `text.highlight` are mode-invariant in v3 (same value both
modes); the `{_dark,_light}` pair just repeats the value. See Q4.

### 2.3 Status colors (`theme.colors.{success,info,warning,error}`)

Source: `colorStyle.color.{success,info,warning,error}`. In v3 these are single color
references living under `color`; v4 promotes status to top-level namespaces. We expose
them as a single semantic leaf each (no `text`/`icon`/`border`/`_overlay` sub-shape —
that is v4-fresh structure with no v3 source). Naming: keep flat
`colors.<status>` leaf to mirror the v3 `colorStyle.color.<status>` single value.

| Role | New token path | `_dark` | `_light` |
|---|---|---|---|
| color.success | `colors.success` | `{green.40}` | `{green.50}` |
| color.info | `colors.info` | `{blue.40}` | `{blue.60}` |
| color.warning | `colors.warning` | `{orange.50}` | `{orange.50}` |
| color.error | `colors.error` | `{red.50}` | `{red.60}` |

See Q6 — whether to nest these as `colors.text.success` etc. (they are foregrounds in
v3) vs. top-level status namespaces (v4 convention).

### 2.4 `divider` / `border` (`theme.colors.divider`)

Source: `colorStyle.divider` (active). v3 has a single `divider`; v4 has a rich
`border.*` namespace with no v3 antecedent. Map to a single `colors.divider` leaf.

| Role | New token path | `_dark` | `_light` |
|---|---|---|---|
| divider | `colors.divider` | `rgba(255, 255, 255, 0.12)` | `rgba(0, 0, 0, 0.12)` |

### 2.5 Shadows (`theme.shadows.*`)

Source: `colorStyle.shadow.{thin,medium,thick}` (active). These are full CSS
`box-shadow` strings (raw literals), inlined verbatim. They live under `theme.shadows`,
not `theme.colors`, matching v4 (`packages/theme/src/v4/semantic/shadows`).

| Role | New token path | `_dark` | `_light` |
|---|---|---|---|
| shadow.thin | `shadows.thin` | `0 2px 8px 0 rgba(0,0,0,0.48), 0 1px 2px 0 rgba(0,0,0,0.16)` | `0 2px 8px 0 rgba(0,0,0,0.16), 0 1px 2px 0 rgba(0,0,0,0.08)` |
| shadow.medium | `shadows.medium` | `0 4px 16px 0 rgba(0,0,0,0.48), 0 2px 4px 0 rgba(0,0,0,0.16)` | `0 4px 16px 0 rgba(0,0,0,0.16), 0 2px 4px 0 rgba(0,0,0,0.08)` |
| shadow.thick | `shadows.thick` | `0 8px 32px 0 rgba(0,0,0,0.48), 0 4px 8px 0 rgba(0,0,0,0.16)` | `0 8px 32px 0 rgba(0,0,0,0.16), 0 4px 8px 0 rgba(0,0,0,0.08)` |

Note: v4 uses directional `low/medium/high` with `.down/.up/...` sub-keys driven by
`_shadow` color tokens. v3 has flat `thin/medium/high` strings. We keep v3 naming and
flat strings. See Q7 (naming `thin` vs `low`).

### 2.6 Deprecated: `severity` (`theme.colors.severity.*`) — FLAGGED, see §3

Source: `colorStyle.severity.*` ([deprecated], `willRemove: true`, console-warned).
Mapped here for completeness; recommend NOT emitting unless back-compat is required.

| Role | New token path | `_dark` | `_light` |
|---|---|---|---|
| severity.critical | `colors.severity.critical` | `{magenta.60}` | `{magenta.60}` |
| severity.high | `colors.severity.high` | `{red.50}` | `{red.60}` |
| severity.medium | `colors.severity.medium` | `{orange.50}` | `{orange.50}` |
| severity.low | `colors.severity.low` | `{yellow.50}` | `{yellow.50}` |
| severity.safe | `colors.severity.safe` | `{green.40}` | `{green.50}` |
| severity.info | `colors.severity.info` | `{gray.50}` | `{gray.50}` |
| severity.unknown | `colors.severity.unknown` | `{gray.50}` | `{gray.50}` |

### 2.7 Deprecated: `chart.classic.colors` — FLAGGED, see §3

Source: `colorStyle.chart.classic.colors` ([deprecated], 11-element array,
`willRemove: true`, console-warned). If retained, model as an array of `{_dark,_light}`
leaves under `colors.chart.classic.colors`.

| idx | `_dark` | `_light` |
|---|---|---|
| 0 | `{gray.50}` | `{gray.50}` |
| 1 | `{blue.50}` | `{blue.60}` |
| 2 | `{green.40}` | `{green.50}` |
| 3 | `{orange.50}` | `{orange.50}` |
| 4 | `{cyan.40}` | `{cyan.40}` |
| 5 | `{red.50}` | `{red.60}` |
| 6 | `{purple.50}` | `{purple.60}` |
| 7 | `{teal.40}` | `{teal.40}` |
| 8 | `{magenta.40}` | `{magenta.50}` |
| 9 | `{green.30}` | `{green.30}` |
| 10 | `{yellow.50}` | `{yellow.50}` |

---

## 3. Open questions / risks (for human review)

**Q1 — Primitive key format change.** v3 uses colon keys (`gray:100`); v4 `{ref}`
syntax requires dot keys (`gray.100`). Renaming keys is a behavioral change for any
code that reads `theme.colors['gray:100']` directly. Decide: (a) rename only and break
colon lookups, (b) keep BOTH colon and dot keys aliased to the same value, or (c) keep
colon primitives and teach the resolver to accept `{gray:100}` refs. Recommend (b) for
the migration window.

**Q2 — Step-key collision with v4 numeric scale.** v3 steps are `10..100` (tens); v4
primitives use `100..1000`. If the merged theme ever layers a real v4 palette on top,
`gray.100` means *two different colors* in the two systems (v3 `#151515` vs v4 light
gray). Since this migration preserves v3 VALUES, `gray.100` = `#151515`. Confirm no v4
numeric palette is merged in alongside, or namespace the v3 set (e.g. `v3.gray.100`).

**Q3 — Mode-invariant leaves.** `text.selection`, `text.highlight`, `warning`, and
several `severity`/`chart` entries have identical dark and light values in v3. The
`{_dark,_light}` shape forces duplication. Acceptable, but confirm we don't want a flat
string shortcut for these (v4 has no flat semantic leaves, so duplication keeps the
shape uniform — recommended).

**Q4 — `text.*` group has two v3 sources.** v3 splits foreground into `color.*`
(emphasis/primary/.../disabled, success/info/warning/error) and `text.*`
(selection/highlight). We merged both under `colors.text`. Risk: name space mixing —
`text.primary` (a foreground) vs `text.selection` (a UI accent). Alternative: keep
`color.*` under `colors.text.*` and put `text.selection/highlight` under a separate
`colors.selection`/`colors.highlight`. Needs a decision.

**Q5 — `background.inverse` vs `inverted` alias.** v3 defines both as the same value.
Keep duplicated literals, or make `inverse` reference `{background.inverted}`? Note v4
`{ref}` cross-semantic references are supported (e.g. `{text.disabled}`), so
referencing is viable. Pick one for consistency.

**Q6 — Status color placement & shape.** v3 status colors are single foreground
references under `color.*`. v4 promotes status to top-level namespaces with rich shape
(`text`/`icon`/`border`/`_overlay`/`_onOverlay`). We mapped to flat single leaves
(`colors.success` etc.). Confirm: flat single leaf (proposed, matches v3 scope) vs.
`colors.text.success` (keeps the v3 "it's a foreground" semantics) vs. partial v4 shape
(`colors.success.text`). Recommend flat single leaf to stay within the v3 set.

**Q7 — Shadow naming `thin/medium/thick` vs v4 `low/medium/high`.** v3 shadow keys are
`thin/medium/thick` and are flat box-shadow strings; v4 uses `low/medium/high` with
directional sub-keys backed by `_shadow` color tokens. Keeping v3 names+strings is the
faithful-to-values choice, but means `theme.shadows` won't structurally match v4. If any
v4 component expects `shadows.low.down`, it will break. Confirm consumers.

**Q8 — Deprecated groups (`severity`, `chart.classic`).** Both are `willRemove: true`
and emit a console deprecation warning on first access in v3 (via `attachProxyOnce`).
Decide whether the migrated theme: (a) drops them entirely, (b) emits them as plain
tokens without the warning proxy, or (c) reproduces the deprecation-warning proxy. They
are mapped in §2.6/§2.7 only so the implementer has the values if (b)/(c) is chosen.
Recommend (a) drop, unless a consumer still reads them.

**Q9 — `transparent` / `current` primitives.** v3 includes `transparent` and
`current: currentColor` as flat primitives. They have no `{_dark,_light}` semantic role;
keep them as flat primitive entries (§2.0), not semantic leaves.

**Q10 — Light-mode `background.primary` uses `white:emphasis`.** Worth a sanity check:
v3 light primary background is the *emphasis* white token (`rgba(255,255,255,1.0)`),
not a `gray` step. Preserved as-is; just flagging it's intentional asymmetry vs the dark
side (`gray.100`).
