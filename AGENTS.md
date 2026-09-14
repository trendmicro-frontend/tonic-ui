# AGENTS.md

## PR and Changeset Creation Policy

- Open PRs from a dedicated branch (`fix/<slug>`, `feat/<slug>`, `docs/<slug>`), not from `main`.
- Changeset files MUST contain the PR number: `.changeset/tonic-ui-pr-<PR_NUMBER>.md`. Never use a descriptive-only filename.
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
