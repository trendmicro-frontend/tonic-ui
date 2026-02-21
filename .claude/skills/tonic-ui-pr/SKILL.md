---
name: tonic-ui-pr
description: Generate PR descriptions and changeset entries. Use when the user mentions "PR", "pull request", "PR description", "changeset", provides a diff or describes code changes, or asks to draft a merge request. Also trigger for conventional commit message generation.
---

# PR Description Generator

Generate well-structured PR descriptions following conventional commits and tonic-ui project conventions. Based on analysis of 885 commits and 721 PRs.

## Pre-Work Checklist

**CRITICAL: Always complete these steps BEFORE writing PR descriptions**

- [ ] **Run git commands to understand changes** — Never write PR descriptions without seeing the actual changes
- [ ] **Check commit history** — Review recent commits to match repository style
- [ ] **Identify changed files and scope** — Determine which packages/components are affected

**Run these commands in parallel:**
```bash
git status              # See all changed files
git diff HEAD           # See all changes
git log --oneline -10   # See recent commit message style
```

**For efficiency:** Make all three Bash tool calls in a single message since they're independent.

## Scope Rules

| Allowed | NOT Allowed |
|---------|------------|
| Generate PR titles and descriptions | Modify source code |
| Create changeset files for monorepos | Create changesets for non-monorepo projects |
| Draft commit messages | Automatically commit or push changes |
| Review and summarize diffs | Add features or fix bugs |

**If asked to create a changeset for a non-monorepo project**, explain that changesets are only used in Tonic UI and Tonic One monorepos.

## PR Title Format

Follow conventional commits:

```
<type>(<scope>): <short description>
```

**Formatting rules:**
- Lowercase first letter after type/scope (87% convention)
- Under 72 characters
- No period at end
- Wrap component/prop/package names in backticks (34% of PRs do this)

**Types (by frequency in this repo):**

| Type | Usage | % |
|------|-------|---|
| `feat` | New features, components, props | 38% |
| `docs` | Documentation changes | 16% |
| `fix` | Bug fixes | 15% |
| `chore` | Dependencies, releases, tooling | 14% |
| `refactor` | Code restructuring, no behavior change | 5% |
| `ci` | CI/CD changes | 2% |
| `breaking` | Breaking changes (repo-specific type) | 2% |
| `test` | Test additions/changes | <1% |
| `build` | Build system changes | <1% |
| `style` | Formatting, whitespace | <1% |
| `revert` | Reverting previous changes | <1% |

**Important — `breaking` as a type:** This repo historically uses `breaking:` as a standalone type prefix (15 PRs), NOT the conventional `feat!:` notation. Only 1 PR uses the `!` marker.
```
breaking: deprecate the rarely used FlatButton component
breaking: deprecate the second argument of CheckboxGroup onChange callback
feat(react/date-pickers)!: deprecate Calendar and replace it with DateCalendar  ← only 1 uses !
```

**Scope conventions:**

| Format | Example | Notes |
|--------|---------|-------|
| `package/component` | `react/menu`, `react/scrollbar`, `react/tag` | Current convention (recent trend) |
| Package name | `react`, `styled-system`, `utils`, `react-hooks` | For package-wide changes |
| No scope | `feat: add X component` | Acceptable for cross-cutting changes |

**Common scopes:** `react/menu`, `react/table`, `react/scrollbar`, `react/checkbox`, `react/toast`, `react/date-pickers`, `styled-system`, `utils`, `react-hooks`, `react-icons`, `theme`

**Cross-repo references:** When porting changes from/to Tonic One, include `[tonic-one-pr-NNN]` in the title.

**Examples:**
```
feat(react/scrollbar): add `scrollViewProps` to enable passing custom props
fix(react/menu): correct focus management on keyboard navigation
refactor(styled-system): migrate to semantic color tokens
docs: update `Table` component examples
chore(deps): bump webpack from 5.88.0 to 5.89.0
breaking: deprecate the `FlatButton` component
revert(react/InputGroup): restore pseudo-class styling
```

## PR Body Template

Based on the actual patterns used in recent PRs (not a generic template):

```markdown
## Summary

Closes #ISSUE_NUMBER (if applicable)

Brief 1-3 sentence description of the change.

Demo: https://trendmicro-frontend.github.io/tonic-ui-demo/react/pr-{PR_NUMBER}/components/{COMPONENT}/

## Changes

- **Component/File**: Description of change
- **Component/File**: Description of change

## Motivation

Why this change was needed. (Optional — include for non-trivial changes)

## Migration

Before/after code examples showing migration path. (Only for breaking changes)
```

**Section usage guide:**
- `## Summary` — Always include. 1-3 sentences + optional demo link + optional `Closes #NNN`
- `## Changes` — Always include for multi-file changes. Bullet list of what changed where.
- `## Motivation` — Include when the "why" isn't obvious from the summary
- `## Migration` — Only for breaking changes. Show before/after code examples.

**Demo links:** ~48% of PRs include a demo link. Format:
```
https://trendmicro-frontend.github.io/tonic-ui-demo/react/pr-{PR_NUMBER}/components/{COMPONENT}/
https://trendmicro-frontend.github.io/tonic-ui-demo/react/pr-{PR_NUMBER}/hooks/{HOOK_NAME}/
```

**Issue references:**
- `Closes #NNN` or `Close #NNN` — for GitHub issues (~10% of PRs)
- `Related PR: #NNN` or `Depends on: #NNN` — for PR dependencies (~2% of PRs)

**What NOT to include:**
- `## Testing` section — never used in this repo
- Jira ticket references (`TVO-XXXX`, `V1E-XXXX`) — not used in this repo
- Figma links — only ~4% of PRs, include only if the user provides one

## Changeset Entries

When the change affects a publishable package, generate a changeset file.

### File Naming Convention

```
.changeset/tonic-ui-pr-{PR_NUMBER}.md
```

For multiple changesets on the same PR, use suffixes:
```
.changeset/tonic-ui-pr-943a.md
.changeset/tonic-ui-pr-943b.md
```
Or descriptive suffixes:
```
.changeset/tonic-ui-pr-987-modal-regression.md
.changeset/tonic-ui-pr-987-react-hooks.md
```

### Changeset Format

```markdown
---
"@tonic-ui/react": minor
---

feat(react/scrollbar): add `scrollViewProps` to enable passing custom props to the `ScrollView`
```

**Description rules:**
- Always single line
- Use conventional commit format matching the PR title
- Wrap component/prop names in backticks
- ~75 characters average length
- This description becomes the changelog entry

### Bump Rules

| Bump | When | Frequency |
|------|------|-----------|
| `patch` | Bug fixes, refactoring, styling corrections, internal improvements | 56% |
| `minor` | New components, new props, new hooks, new features | 42% |
| `major` | Breaking API changes (extremely rare) | 2% |

### Package Names (by frequency)

| Package | Changeset Frequency |
|---------|-------------------|
| `@tonic-ui/react` | 66% (most common) |
| `@tonic-ui/styled-system` | 6% |
| `@tonic-ui/react-hooks` | 6% |
| `@tonic-ui/utils` | 5% |
| `@tonic-ui/react-icons` | 5% |
| `@tonic-ui/react-base` | 5% |
| `@tonic-ui/theme` | 2% |

**Tonic One packages:** `@tonic-one/react`, `@tonic-one/react-icons`, `@tonic-one/react-hooks`, `@tonic-one/react-data-grid`

**Never create changesets for:** `codemod`, `changelog-github`, `react-docs` (internal/dev packages)

### Single vs Multi-Package

- **Single-package changesets** are the norm (86%)
- **Multi-package** only when the change genuinely spans package boundaries:
  - Cross-cutting infrastructure (e.g., React 19 compat across `react`, `react-base`, `react-hooks`)
  - Feature with utility dependency (e.g., component + `utils`)
  - Bug fix spanning hook + component (e.g., `react-hooks` + `react`)

### Changeset Configuration

- **Config**: `.changeset/config.json`
- **Base branch**: `v2` (not `master`)
- **Release PR title**: `chore(release): version packages`
- **Release workflow**: Automated via `.github/workflows/changesets-release.yml` on push to `v2`

## Workflow: Diff → PR Description

### Step 1: Analyze Changes (Use parallel tool calls)

```bash
# Make all three Bash tool calls in one message:
git status
git diff HEAD
git log --oneline -10
```

### Step 2: Classify the Change

Identify:
- **Type**: feat/fix/refactor/docs/chore/ci/breaking/test/build/style/revert
- **Scope**: From file paths (e.g., `react/button`, `react-hooks/useColorMode`, `theme`)
- **Breaking changes**: API changes, removed features, behavior changes
- **Affected packages**: Which packages in the monorepo are impacted

### Step 3: Write PR Content

Generate:
1. **PR Title** — Following conventional commits format
2. **PR Body** — Using the template above
3. **Changeset** — With correct file name, package, bump type, and description

### Step 4: Verify Quality

**Post-Generation Checklist:**
- [ ] PR title follows `<type>(<scope>): <description>` format
- [ ] Title is under 72 characters with lowercase first letter
- [ ] Body uses `## Summary` / `## Changes` sections (not `## What Changed`)
- [ ] Demo link included if applicable
- [ ] `## Migration` section included if breaking change
- [ ] Changeset file named `tonic-ui-pr-{NUMBER}.md`
- [ ] Changeset bump type correct (patch/minor/major)
- [ ] Changeset package names accurate
- [ ] Changeset description is single-line conventional commit format

## Common Mistakes to Avoid

**Vague PR titles:**
```
fix: fix bug                          ← too vague
feat: add feature                     ← too vague
fix: fix the issue with the component ← redundant "fix: fix"
```

**Specific PR titles:**
```
fix(react/scrollbar): prevent scroll jump on content update
feat(react/table): add sticky header support with `stickyHeader` prop
```

**Wrong PR body template:**
```markdown
## What Changed    ← wrong, use "## Summary"
## Why             ← wrong, use "## Motivation"
## How             ← wrong, use "## Changes"
## Testing         ← not used in this repo
## Related
- Jira: TVO-XXXX  ← not used in this repo
```

**Wrong changeset file name:**
```
.changeset/fuzzy-pots-clap.md         ← auto-generated name, don't use
.changeset/tonic-ui-943.md            ← old convention
.changeset/tonic-ui-pr-943.md         ← correct current convention
```

## Label Conventions

PRs in this repo use labels with the following conventions:

| Label | Usage |
|-------|-------|
| `feature (enhancement)` | New features |
| `bug` | Bug fixes |
| `documentation` | Docs changes |
| `refactor (improvement)` | Refactoring |
| `breaking change` | Breaking changes |
| `build (ci/cd)` | CI/CD changes |
| `dependencies` | Dependency updates |
| `work in progress` | Draft/WIP PRs |
| `review required` | Ready for review |
| `Review effort [1-5]: N` | Review complexity rating |
