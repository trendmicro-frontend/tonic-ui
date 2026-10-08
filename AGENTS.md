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

OMP is the primary agent. OMP and Codex discover `.agents/skills/` directly;
Claude Code uses the relative symlinks in `.claude/skills/`. Edit only the shared
source in `.agents/skills/`; do not create tool-specific content copies.

Before starting a matching task, load the relevant skill's `SKILL.md`. Use more
than one skill when the task spans multiple areas, and read its linked references
when instructed. The paths below are relative to the repository root, not the CWD.

| Task | Skill instructions |
| --- | --- |
| Component structure, hooks, exports, and repository conventions | [tonic-ui-patterns](.agents/skills/tonic-ui-patterns/SKILL.md) |
| PR descriptions, commit message drafts, and changesets | [tonic-ui-pr](.agents/skills/tonic-ui-pr/SKILL.md) |
| `slots`, `slotProps`, `useSlot`, and legacy component/props migration | [tonic-ui-slots](.agents/skills/tonic-ui-slots/SKILL.md) |
| `sx`, `__sx`, `composeSx`, and style precedence | [tonic-ui-sx](.agents/skills/tonic-ui-sx/SKILL.md) |
| React component JSDoc and props types | [tonic-ui-types](.agents/skills/tonic-ui-types/SKILL.md) |

Skills are task-specific instructions, not replacements for the policies above
or the host agent's tool and safety rules.
