# AGENTS.md

## PR and Changeset Creation Policy

- Commit, push, and create or update PRs only when the user explicitly requests the action. The workflow below does not grant authorization.

- Open PRs from a dedicated branch (`fix/<slug>`, `feat/<slug>`, `docs/<slug>`), not from `main`.
- Changeset files MUST contain the PR number: `.changeset/tonic-ui-pr-<PR_NUMBER>.md`. Never use a descriptive-only filename.
- Use one changeset file per PR, without letter or descriptive suffixes. List all affected publishable packages and their bump types in that file.
- If the PR number is unknown, provide only a changeset content draft. Do not create a placeholder file or open a PR merely to obtain the number.
- The PR number is only known after PR creation, so the changeset is always added after the PR exists:
  1. Commit the code changes (without a changeset) and push the branch.
  2. Open the PR against `main`.
  3. Add `.changeset/tonic-ui-pr-<PR_NUMBER>.md` and commit it to the same PR branch.
- Changeset format (Changesets conventions; package and bump type match the touched package):

  ```md
  ---
  "@tonic-ui/react": patch
  ---

  fix(react/button): <summary of the fix>
  ```

## Shared Agent Skills

OMP is the primary agent. `skills/internal/` owns repository-development skills;
`skills/external/` owns application skills and is the marketplace plugin root.
`.agents/skills/` and `.claude/skills/` each contain the same six direct relative
discovery links to `skills/internal/` only. Edit the physical source, never the adapters.
External application skills are exposed through the plugin, not native adapters;
see [the catalog](skills/README.md).

Before starting a matching task, load the relevant skill's `SKILL.md`. Use more
than one skill when the task spans multiple areas, and read its linked references
when instructed. The paths below are relative to the repository root, not the CWD.

| Task | Skill instructions |
| --- | --- |
| Figma/screenshot token resolution and typography | [tonic-ui-tokens](skills/external/tonic-ui-tokens/SKILL.md) |
| Application frontend development highlights and optional release checks | [tonic-ui-dev](skills/external/tonic-ui-dev/SKILL.md) |
| Consuming application upgrades; current v2-to-v3 migration guidance | [tonic-ui-upgrade](skills/external/tonic-ui-upgrade/SKILL.md) |
| Library component structure, hooks, exports, and repository conventions | [tonic-ui-patterns](skills/internal/tonic-ui-patterns/SKILL.md) |
| Library PR descriptions, commit message drafts, and changesets | [tonic-ui-pr](skills/internal/tonic-ui-pr/SKILL.md) |
| Library `slots`, `slotProps`, `useSlot`, and legacy component/props migration | [tonic-ui-slots](skills/internal/tonic-ui-slots/SKILL.md) |
| Library `sx`, `__sx`, `composeSx`, and style precedence | [tonic-ui-sx](skills/internal/tonic-ui-sx/SKILL.md) |
| Library React component JSDoc and props types | [tonic-ui-types](skills/internal/tonic-ui-types/SKILL.md) |
| Library version bumps, prereleases, and maintenance branches | [tonic-ui-version](skills/internal/tonic-ui-version/SKILL.md) |

Skills are task-specific instructions, not replacements for the policies above
or the host agent's tool and safety rules.
