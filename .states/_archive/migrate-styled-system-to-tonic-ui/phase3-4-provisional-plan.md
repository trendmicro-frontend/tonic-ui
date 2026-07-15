# Phase 3/4 provisional plan (extracted from migrate-styled-system-to-tonic-ui loop, 2026-07-15)

Not started under the archived Phase 2 loop. Explicitly gated on PR #1168 merging to `main`; per that loop's Q-C decision, Phase 3 branches fresh off `main` once merged, rather than stacking on the Phase 2 branch. Bootstrap a new loop for this work when ready.

### PHASE 3 — v4 theme token integration (NEW, user 2026-06-27; re-opens the v4 scope Phase 2 deferred)
GOAL (user): (1) clone ALL Tonic One v4 theme tokens from the tonic-one v4 theme package into Tonic UI v3 (main line); (2) make react-docs theme pages identical to Tonic One v4 theme pages; (3) update ALL necessary docs — getting-started guide AND/OR migration guide — for the newly added primitive + semantic tokens (user 2026-06-27).
CONTEXT: This ACTIVATES the engine Phase 2 landed dormant (resolveTheme/toColorMode/_dark/_light, CSS-vars [data-color-scheme]). Phase 2's "keep v3 flat values" + "out of scope: v4 token content" decisions are SUPERSEDED for theme tokens. Expect large snapshot/visual churn (no longer byte-identical).
OPEN QUESTIONS (gate the decomposition — see chat):
  - Q-A VALUES: adopt tonic-one v4 token VALUES wholesale, OR v4 STRUCTURE with v3 VALUES (the shelved token-mapping.md plan)? "clone all v4 tokens" ⇒ likely wholesale v4 values (supersedes the resolved TOKEN DECISIONS below).
  - Q-B ENGINE ACTIVATION: with v4 semantic tokens present, switch dark/light to the CSS-var [data-color-scheme] mechanism (activate deferred U6–U10), or keep colorStyle as the driver?
  - Q-C BRANCH/SEQUENCING: stack Phase 3 on the Phase 2 PR #1168 branch, or wait for #1168 to merge to main then branch fresh off main?
  - Q-D SCOPE: all token scales (colors + typography + spacing + shadows + radii + …) or colors only? which react-docs theme pages exactly?
RESOLVED (user 2026-06-28): Q-A = WHOLESALE v4 VALUES (clone tonic-one v4 token values verbatim; expect visual churn; supersedes the v3-values TOKEN DECISIONS). Q-B = ACTIVATE the CSS-var [data-color-scheme] mechanism (turn on the dormant U6–U10 engine; components consume _dark/_light in Phase 4). Q-C = WAIT for #1168 to merge, then branch Phase 3 fresh off main (Phase 3 mutations PARKED until then; read-only discovery may run now). Q-D = ALL token scales (colors+typography+spacing+shadows+radii+…); discovery enumerates exact set + react-docs pages.
PROVISIONAL UNITS (refine after Q-A..Q-D answered):
- [ ] V1 DISCOVERY (yield): map tonic-one v4 theme package (all token files + structure) vs tonic-ui v3 @tonic-ui/theme; define "clone" precisely; list react-docs theme pages to mirror; write docs/v4-theme-port-plan.md. done when: plan exists + user approves.
- [ ] V2 clone v4 tokens into @tonic-ui/theme (per Q-A). done when: theme builds; resolveTheme resolves _dark/_light.
- [ ] V3 engine reconciliation (per Q-B): wire dark/light driver; resolve token-key consumers across components. done when: color-mode switching works with v4 tokens; tests updated.
- [ ] V4 fix fallout: regenerate snapshots (EXPECT churn), fix components referencing removed/renamed v3 keys. done when: yarn test green.
- [ ] V5 react-docs theme pages → identical to tonic-one v4 (per Q-D). done when: pages match + docs build.
- [ ] V6 guide docs: update getting-started guide AND/OR migration guide to document the newly added PRIMITIVE + SEMANTIC tokens (what's new, how to use, v3→v4 token migration mapping). Mirror/adapt tonic-one v4 guide content where it exists. done when: getting-started + migration guide cover the new tokens; docs build.
- [ ] V7 integration: full test/lint/build (incl dts)/docs green on the Phase 3 base. done when: all green.

### PHASE 4 — migrate ALL components to semantic tokens (NEW, user 2026-06-27; depends on Phase 3)
GOAL (user): update every component to consume the v4 semantic tokens (Phase 3 must land the tokens first).
CONTEXT: Components currently reference v3 flat tokens (colon keys e.g. `gray:100`) + drive dark/light via `colorStyle`. Phase 4 migrates each component's styles.js / token usage to the v4 semantic `_dark`/`_light` tokens (mirroring tonic-one v4 component styles). This is the consumer side of Phase 3's token side.
DEPENDS ON: Phase 3 (Q-A values, Q-B engine-activation decisions apply here too). BLOCKED until Phase 3 V2 (tokens present).
OPEN QUESTIONS (mostly inherited from Phase 3):
  - Q-E MIGRATION STYLE: mirror tonic-one v4 component styles.js wholesale, or rewrite token refs in place keeping tonic-ui structure?
  - Q-F colorStyle: deprecate/remove colorStyle once components use semantic tokens, or keep it for back-compat?
  - Q-G verify: how to verify per-component correctness — snapshot diff review, visual/browser compare vs tonic-one v4 (Figma/live)?
PROVISIONAL UNITS (refine after Phase 3 + Q-E..Q-G):
- [ ] W1 DISCOVERY (yield): inventory all components referencing v3 flat tokens / colorStyle; map to v4 semantic equivalents; tranche the migration (mirror the E1–E5 tranche shape); write docs/component-semantic-migration-plan.md. done when: plan exists + user approves.
- [ ] W2..Wn per-tranche component style migration to semantic tokens (one tranche per component group; maker mirrors tonic-one v4 styles.js, checker = snapshot review + tests + visual compare). done when (each): tests pass, intended visual changes confirmed, no unintended regressions.
- [ ] W-final integration: full test/lint/build/docs green; (per Q-F) colorStyle handling resolved. done when: all green + Phase 3+4 visually match tonic-one v4.
