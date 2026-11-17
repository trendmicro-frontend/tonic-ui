# Screenshot rules — evidence-labelled candidates

A screenshot shows rendered pixels, not variable identity. Tokens can share a value,
overlays composite over unknown surfaces, anti-aliasing shifts sampled colors, and the
same visual can come from a token, custom color or browser default. Even one surviving
candidate is plausible, not proof of the original variable.

## Workflow

1. Establish the target library version, color mode, component and part, surface,
   interaction state and platform. State unknown context rather than assuming it.
2. Narrow candidates by the known role and query actual paths with a theme pattern, for
   example `--theme-token 'colors.text.*'` or `--theme-token 'colors.**.hovered'`.
   Use returned values and CSS names rather than inventing candidates. The matcher is
   case-sensitive and has no free-text or alias search.
3. If an exact captured variable label or key is available, query it with
   `--figma-variable`. A visible label identifies only that label; report a theme
   counterpart only when a current positive review or other explicit evidence supports it.
   The captured Tonic One v4 variables have unverified applicability to Tonic UI v3; a
   text style or other prototype attribute may not be included in the captures at all.
4. Where useful, sample flat, unblended regions and account for alpha, mode and
   compositing. A matching value corroborates a candidate; it cannot establish identity.
5. Report the element, role/state/mode, observed label or source, actual candidate paths,
   implementation values and confidence. Flag missing labels, modes or attributes using
   [the local handoff template](UNMAPPED_TOKEN_TEMPLATE.md); never choose a similar
   primitive to fill a missing design decision.

## Evidence grades

| Grade | Evidence |
| --- | --- |
| **Confirmed identity** | A library-scoped variable label or key identifies that captured endpoint; an explicit token reference identifies that theme endpoint. An unscoped label or key can match multiple libraries. A current review or other explicit evidence is needed to establish a counterpart. |
| **Likely candidate** | One real candidate fits role, state, mode and sampled value. Explain alternatives and keep it a candidate, not a proven original identity. |
| **Ambiguous** | Several candidates fit, or the mode, state, surface or identity is unknown. State the missing evidence. |
| **Unverified** | The captured variables or theme inventory do not establish the requested prototype style, attribute or counterpart. An empty lookup does not prove universal absence. |

## Mode and compositing pitfalls

- Compare both modes where relevant. `_fixed` and `_inverse` variants may not follow the
  surrounding mode.
- Translucent colors and state layers composite over the actual parent surface. A sampled
  pixel is not necessarily the underlying token value.
- Charts can select colors by configuration and index; inspect the consuming application's
  chart configuration before naming a chart token. This repository has no chart package.
- A successful token lookup is not proof of a rendered component state.

If the host cannot inspect the image, do not claim that it did. Request the variable or
style label, a text/JSON export, or values plus context, and complete reachable lookups.
