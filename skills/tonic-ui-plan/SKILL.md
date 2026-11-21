---
name: tonic-ui-plan
description: Plan Tonic UI repository changes from scope and acceptance criteria through tests, PR preparation, and delivery. Use for a new or revised contributor plan, not standalone PR copy or consuming-app setup.
---

# Plan a Tonic UI change

Follow the repository root `AGENTS.md` and the host's approval rules. Saving a plan does not authorize implementation. Planning or implementation does not authorize commits, pushes, PR creation or updates, publishing, or deployment. Each action needs explicit authorization.

1. **Scope.** Read the current repository policy, affected implementation, and relevant tests. Define the requested deliverables and boundaries. Ask only about unresolved choices that change the design or delivery scope.

   If the user wants the client's native Plan Mode and it is not active, point them to the client's mode control (for example, `/plan` in OMP). Loading this skill does not switch modes; do not try to emulate the control with a tool call.

2. **Specify.** Write a plan another contributor can execute without this conversation: purpose, ordered edits with paths and decided behavior, observable acceptance criteria for each requirement, exact verification commands and expected results, PR preparation, and delivery artifacts. Revise the existing plan for the same work before creating a new `docs/plans/YYYY-MM-DD-<slug>.md` (repository-relative). In read-only plan mode, use only the host's permitted draft and review workflow; save to the repository only when authorized.
   - **Put enforceable rules in the repo.** If a requirement can be checked deterministically, plan an existing lint, type, schema, test, or CI check rather than adding prose to `AGENTS.md` and relying on agents to comply. Name the rule owner, scope, command, and a case that must fail. Prefer reusing the existing checker over adding new infrastructure.
   - **Make hard-to-review patterns explicit.** If a pattern is too easy to misuse, prefer a narrow, enforceable boundary over case-by-case judgment. Verify both prohibited usage and any explicitly allowed exception.
   - **Plan evidence for each changed UI item.** Map each item to an existing or new browser E2E case. Specify the user-visible assertions, relevant states, and how to generate screenshots in the same scenario. Use the repository's opt-in `E2E_SCREENSHOTS=1` and shared screenshot helper, not a new capture pipeline. Add a recording when motion or sequence matters, or a report when it better shows the result.
3. **Review before delivery or implementation.** Compare the draft with the request, current source, tests, and repository policy. For cross-cutting changes, use a read-only second reviewer when the host supports it; otherwise do a separate self-review pass. Give the reviewer the request, draft, and relevant source paths. Require findings with evidence, not an approval-only response.
   - Check that every requested outcome has a concrete step and an observable acceptance criterion, with no unrequested scope or unresolved implementation decisions.
   - Check that paths, APIs, and dependencies exist as described. For moves or renames, check both direct and generated references, and any promised compatibility behavior.
   - Check that each enforceable requirement has a deterministic check, each changed UI item has E2E coverage and a screenshot path, and each verification command runs against the right target and proves the stated result, including relevant negative cases. A development-server check does not prove a production-only behavior.
   - Record the review outcome: blocking findings with evidence and required corrections, or no blockers found. Fix blockers and re-review the affected steps before presenting the plan as ready. If a blocker cannot be resolved, state what remains and do not implement. Review is not user authorization.
4. **Hand off the reviewed plan.** Report the plan path, review outcome, and any unresolved blockers. Label the proposed tests, evidence, and PR work as planned, not completed. End here for a plan-only request. If implementation is separately authorized, use the reviewed plan as its contract and re-review any material change. The plan must state which repository checks and evidence the implementer must deliver before handoff and before adding automation; use the relevant companion skills for execution details.

## Load only the relevant companion skills

| When the plan covers | Read before planning that part |
| --- | --- |
| Library components, hooks, exports, or browser tests | [tonic-ui-patterns](../tonic-ui-patterns/SKILL.md) |
| Slots or legacy slot migration | [tonic-ui-slots](../tonic-ui-slots/SKILL.md) |
| `sx` / `__sx` precedence | [tonic-ui-sx](../tonic-ui-sx/SKILL.md) |
| React prop types or JSDoc | [tonic-ui-types](../tonic-ui-types/SKILL.md) |
| Token snapshots, reports, or regeneration | [tonic-ui-tokens-maintenance](../tonic-ui-tokens-maintenance/SKILL.md) |
| Library versioning or prereleases | [tonic-ui-version](../tonic-ui-version/SKILL.md) |
| PR descriptions, commit drafts, or changesets | [tonic-ui-pr](../tonic-ui-pr/SKILL.md) |

Links are relative to this skill's source directory. When loaded through a discovery adapter, use the target skill by name or resolve the source directory first.
