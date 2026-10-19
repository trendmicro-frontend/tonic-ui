# Screenshot rules — turning rendered pixels into evidence-labelled candidates

A screenshot shows **rendered pixels**, not variables. Equal RGB does not prove equal
semantic intent: several tokens can share one value; overlays composite over unknown
backgrounds; anti-aliasing shifts sampled values; `_fixed`/`_inverse` tokens deliberately
break the mode you think you are in.

**Rule:** a screenshot without a visible variable/style label yields **evidence-labelled
candidates**, never a guaranteed variable identity. RGB can narrow the field; it can never
prove *which* Figma variable was used. Identity requires a label (a Figma variable/style
name, dev-mode code syntax, or a supplied text/JSON export).

Even when only one candidate survives the role/state/mode filters, that candidate is
**plausible**, not proven original identity — a custom color or a browser default can render
identically. Say "the only candidate whose role and mode fit", not "this is the variable".

## Why identity is not derivable

- Several tokens share one value. In light mode `#e32631` is shared by at least
  `colors.error.border`, `colors.error.icon`, `colors.riskLevel.high.chart`, `colors.red.550`
  and `colors._chart.categorical.unpredictable.chart-5`; `#a9071b` is shared by
  `colors.error.text`, `colors.riskLevel.high.text`, `colors.severity.high.text`,
  `colors.red.700` and others. Any single-value sample is therefore ambiguous by construction.
- A value can also collide **across modes**: `colors.border.primary` light is `#525252`, which
  is exactly `colors.border.secondary` *dark*. A sample matching a value still leaves the
  token ambiguous if the mode is unknown.
- Many surfaces are blended: disabled/state-layer colors are `color-mix(… transparent)` over
  the parent surface, so a sampled flat gray is an intermediate value, not a token. A naive
  "gray text ⇒ `colors.text.disabled`" answer is wrong for exactly this reason — that token's
  light value is `color-mix(in srgb, #000000 24%, transparent)`, not an opaque gray.
- The same visual can come from a token, a custom color, or a browser default — identical on
  screen.
- The image carries no mode, state, or layer information: hover vs enabled, light vs dark,
  card-on-page vs page.

## Workflow

1. **Establish context first** — target library version (installed or the bundled snapshot),
   color mode, surface/elevation, component and part, interaction state, and platform. Ask
   for these when absent; a widget in light mode has a different answer from a modal in dark
   mode.
2. **Narrow by role, not by color.** Backgrounds → `background.*`; paragraph/label text →
   `text.*`; icons by role → the paired `text.*` (design rows 41–45) or `icon`-suffixed
   status tokens; borders → `border.*`; status → `*.icon/.border/._overlay/._onOverlay.*`;
   charts → `_chart.*`; interactive fills → `_foreground.*`; state layers → `actions.*`.
3. **Read candidates.** Use `--query` for keywords ("toast border", "table text") and
   `--family` for the role family; take actual dark/light values and CSS names from the
   result, not from the image. `--query` is a literal substring match — use one keyword or a
   phrase copied verbatim from a design role/note.
4. **Corroborate with pixels.** Sample a flat, unblended region (not an anti-aliased edge, not
   a shadow, not a gradient stop); account for alpha/compositing; then compare against
   candidate `values.dark`/`values.light`. Agreement raises confidence; disagreement
   eliminates the candidate. Never promote a pixel match to "this is the token".
5. **Report a table** — element/part, role and state, candidate code path(s) with status,
   Figma alias only if confirmed by a label, confirming evidence (label / sampled value /
   source), mode implications, and confidence (confirmed / likely / ambiguous).
6. **Continue with what is reachable.** Flag the ambiguous and design-only choices with
   [UNMAPPED_TOKEN_TEMPLATE.md](UNMAPPED_TOKEN_TEMPLATE.md); do not substitute a guessed
   primitive color for a missing semantic decision.

## Evidence grades

| Grade | Evidence |
| --- | --- |
| **Confirmed** | Visible variable/style label, dev-mode code syntax, or a supplied text export naming the token. The screenshot is corroboration only. |
| **Likely** | No label, but exactly one candidate matches role, state, mode and sampled value, and the alternatives are implausible on role grounds. Say which alternatives were eliminated and how — this is still a candidate, not proven identity. |
| **Ambiguous** | Several real candidates fit, or the mode/state/surface is unknown. List them; state the missing evidence. |
| **Unknown / design-only** | No implemented token matches the role (e.g. a design-only status entry). Do not invent a path. |

## Output shape (illustrative, real candidates)

```text
Sample: #e32631 on an error-state surface, light mode
Candidates (real tokens whose light value is #e32631):
  1. colors.error.border      — role fits (error border)      [likely]
  2. colors.error.icon        — role fits (error icon)        [likely]
  3. colors.riskLevel.high.chart — role fits only if this is a risk chart [ambiguous]
  4. colors.red.550           — primitive shade; plausible only if intended as raw color [ambiguous]
Uncertainty: RGB cannot distinguish these; all four implement #e32631 in light mode
(and the private chart/error-on-overlay tokens also share it).
Mode caveat: the same value also appears elsewhere across modes; if the mode is
unconfirmed, the field widens.
To confirm: read the Figma variable/style label on the element, or use a design export.
```

This block is an **illustration of the required shape**, not a claim about any particular
screenshot. Do not report candidate lists you did not actually derive from a lookup.

## Mode and compositing pitfalls

- Sample **both modes** when available: the same part may be `_fixed` (always light/dark) or
  `_inverse` (swapped), which breaks the "current mode" assumption.
- Translucent tokens (`color-mix(... transparent)`) composite over the actual parent surface;
  the visible pixel equals token × alpha over background. Compute or ask, don't eyeball.
- Overlays (`_overlay.*`, `actions.*`) are transparent layers, not opaque fills.
- Disabled states often reuse another token (e.g. `_foreground.primary.disabled`), so a
  disabled sample is weak identity evidence.
- Charts use token arrays whose index (not color) drives meaning; match the consuming
  application's chart configuration before naming a chart token. This repository has no
  chart package, so a chart-library default is not evidence.

## When you cannot inspect the image

If the host has no image capability, do not pretend to have read it — never claim pixels were
inspected. Ask for:

- the Figma variable or style name shown in the design, or
- a text/JSON export of the layer's styles, or
- the hex values plus the surrounding context.

Then continue every reachable lookup — token search by role/wording still works without the
image.

## Common mistakes

| Mistake | Reality |
| --- | --- |
| "The pixel is `#e32631` so the token is `colors.error.border`" | Multiple tokens share values; the image cannot choose between them. |
| "It is `text.disabled` because it looks like gray disabled text" | `text.disabled` is `color-mix(… 24% transparent)`, not a flat gray; verify against the token's actual value and role. |
| "One candidate fits, so that's the variable" | A single surviving candidate is plausible, not proven original identity. |
| "This is `_overlay.inverse.thick` because it looks like a scrim" | Confirm the value; do not infer a token from a visual impression. |
| Sampling an edge/shadow pixel | Only flat, unblended regions carry a usable value. |
| Reporting "I read the screenshot" without image capability | If you could not open the image, say so and ask for labels/exports. |

## What to hand back

- **Confirmed:** the exact Figma name → real path (with status from `figma-mappings.json`),
  value(s), CSS variable if used, and the evidence that confirmed it.
- **Unconfirmed:** real candidate paths with statuses and confidence, the missing label or
  attribute, and the concrete request (variable label, line-height annotation, state
  screenshot, mode confirmation).
- Never output a fabricated "closest" token, and never hide a source conflict behind a
  confident-sounding answer.

## Related

- [TOKEN_MAPPING.md](TOKEN_MAPPING.md) — statuses and the never-do list.
- [UNMAPPED_TOKEN_TEMPLATE.md](UNMAPPED_TOKEN_TEMPLATE.md) — handoff when the image shows
  something not implemented.
