# Migration plan / report template

Fill this in for a consuming-app Tonic UI v2 → v3 upgrade. Replace every `{{...}}`. Delete guidance lines once answered; keep the structure. The same file serves as the **plan** (before execution) and the **report** (fill the outcome columns afterward).

Do not include a Changeset, a version bump of the Tonic UI library, or release steps — those belong to library contribution work, not an app upgrade.

---

## 1. Scope

- **App / repo:** {{name and path}}
- **Requested target(s):** {{e.g. @tonic-ui/react 3.0.0-alpha.1}}
- **Type:** consuming-app upgrade — *not* a Tonic UI library change or release.
- **Change requested:** ☐ plan only ☐ plan + execute
- **Source evidence used:** {{target revision / installed package contents / docs snapshot, and any freshness limit}}
- **Out of scope:** library source, other worktrees, releases, unrelated refactors.

## 2. Current state

| Item | Value | Evidence |
| --- | --- | --- |
| `@tonic-ui/react` installed | {{version}} | `package.json` / lockfile |
| Other `@tonic-ui/*` used | {{pkg@version, …}} | `package.json` / lockfile |
| `@emotion/react` / `styled` resolved | {{version(s)}} | `npm ls @emotion/react` |
| Duplicate Emotion majors? | ☐ no ☐ yes ({{…}}) | lockfile / `npm ls` |
| React / React DOM | {{version(s)}} | `package.json` / lockfile |
| Custom theme / `colorStyle`? | ☐ no ☐ yes ({{file, path}}) | app source |
| Provider setup | {{`TonicProvider` props in use: colorMode, colorStyle, useCSSBaseline, useCSSVariables, environment}} | app source |
| Target versions resolved per package | {{pkg@version, …}} | target `packages/*/package.json` peers |

## 3. Action table

One row per candidate change. **Classification:** NEC / DEP (deprecated, still supported) / OPT / MAN. **Status:** ☐ to do ☐ done ☐ n/a, filled during execution.

| # | Area | Change | Classification | Evidence (source path / doc / manifest) | Verification | Status |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Packages | … | | | | |
| 2 | Provider/CSS | … | | | | |
| 3 | slots | … | | | | |
| 4 | Portals | … | | | | |
| 5 | SubmenuTrigger | … | | | | |
| 6 | DataGrid / charts | … (N/A unless app owns a separate package) | | | | |
| 7 | Color style | … | | | | |
| 8 | Other props | … | | | | |

Rules and the source-verified prop tables live in [UPGRADE_RULES.md](UPGRADE_RULES.md).

### 3a. Evidence classification notes

For each row, state whether the classification came from:
- **Source** (target-version file/declaration), **Manifest** (peer/dependency), **Changelog** (version that introduced it), or **Guide** (public migration page) — and note any **conflict** between them.

Known conflicts to check:
- Package target: manifests say `3.0.0-alpha.1`, while the migration guide still says `3.0.0-alpha.0` → report, don't silently pick.
- `usePortal`: guide says deprecated, but `Popper.js` has its warning commented out.
- Custom `colorStyle`: preserved when supplied to `TonicProvider`; a missing **default** entry is a different case from a removed custom mapping.
- DataGrid/charts: absent from this repository → do not turn source-only package material into a Tonic UI package claim.

## 4. Manual decisions

Decisions that need human input; record the chosen answer and rationale.

| # | Decision | Options | Owner | Outcome |
| --- | --- | --- | --- | --- |
| 1 | CSS baseline/variables scope | standalone vs. embedded widget | | |
| 2 | Keep `*Component`/`*Props` now or migrate | leave (DEP) vs. migrate incrementally | | |
| 3 | Breakpoint-dependent layouts | review affected layouts vs. accept | | |
| 4 | Token syntax adoption | keep v2 refs (supported) vs. adopt v3 semantic tokens | | |
| 5 | Custom severity/risk mapping | keep custom vs. re-point to semantic tokens | | |
| 6 | Radius/font collision review | review affected surfaces vs. accept | | |
| 7 | DataGrid/chart packages (if app owns them) | verify separately vs. leave untouched | | |

## 5. Execution order (only if requested)

1. Dependency + lockfile update to the resolved per-package versions.
2. Provider / global-CSS scope changes.
3. Component API changes (slots, portalled, SubmenuTrigger, other deprecated props) — smallest patch first.
4. Color-style / token adoption (optional layer, last).
5. Verification pass.

## 6. Proof

Record **what was actually run**, not what should pass.

| Check | Command / method | Result | Evidence |
| --- | --- | --- | --- |
| Install/dedupe | `npm ls @tonic-ui/react @emotion/react` | | |
| Typecheck | | | |
| Build | | | |
| Unit/behavior tests | | | |
| Light-mode render | | | |
| Dark-mode render | | | |
| Overlay open/close/positioning | | | |
| Custom severity/risk appearance | | | |
| DataGrid/chart behavior | NOT_APPLICABLE for this repository; app-owned package only | | |

**Not exercised (report as UNVERIFIED, never PASS):** {{…}}

## 7. Source conflicts and open questions

- {{conflict / missing evidence / decision needed, with file paths}}

## 8. Findings summary

- **Necessary:** {{…}}
- **Deprecated but working:** {{…}}
- **Optional:** {{…}}
- **Manual:** {{…}}
- **Unverified / blocked:** {{…}}
