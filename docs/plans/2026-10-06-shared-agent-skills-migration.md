# Shared Agent Skills Migration Plan

**Status:** Repository migration is implemented and fully verified. Static checks and the OMP, Codex, and Claude Code smoke all passed; the three-tool acceptance is complete. See section 11 for verification results.

**Goal:** Use `.agents/skills/` as the single source of skills, with OMP as the primary consumer, while also supporting Claude Code and Codex. Keep the root `AGENTS.md` as the resident policy entry shared by all three.

**Design decisions:** Use the Agent Skills standard for shared knowledge; use each tool's native mechanism for discovery entry points. Do not copy OMP executor functionality into shared skills, and do not create three copies of skill content.

## 1. Scope and non-goals

### In scope for this implementation

- Migrate the five skills currently in `.claude/skills/` and their accompanying resources.
- Adjust frontmatter, trigger descriptions, documentation layering, and portable paths.
- Fix PR/changeset rules in the skills that conflict with the current root `AGENTS.md`.
- Add skill selection guidance to the root `AGENTS.md`, keeping the existing mandatory policies.
- Create relative symlink entry points for Claude Code.
- Verify discovery and skill usage in real OMP, Claude Code, and Codex sessions.
- Update `CONTRIBUTING.md` to describe only the tool-neutral maintenance approach; keep tool differences and the smoke method in this plan (adjusted per user instructions during implementation).

### Out of scope

- No changes to the application, package APIs, build, or release process.
- No modifications to personal configuration, global skills, credentials, MCP settings, or provider permissions.
- Do not move `~/.omp/agent/AGENTS.md`, and do not pull its personal rules directly into the repository.
- Do not create copies under `.omp/skills/` or `.codex/skills/`.
- Do not add plugins, hooks, custom tools, or cross-tool installers.
- No package release in this change; do not create a changeset. The user asked for a `docs/shared-agent-skills` branch and for this plan and the implementation to be committed together; do not push or open a PR on my own account because of that.
- Do not change skill names in existing historical plans; they are historical records, not current discovery entry points.

## 2. Confirmed current state

| Skill | Current state | Required treatment |
| --- | --- | --- |
| `tonic-ui-patterns` | has `name` and `description`; custom metadata at top level; body about 216 lines | move custom fields into `metadata`, fill in the trigger scope clearly, fix outdated PR/changeset rules |
| `tonic-ui-pr` | has standard required fields; about 309 lines | remove executor assumptions tied to a specific Bash invocation style; fix changeset timing and filename examples |
| `tonic-ui-slots` | description about 865 characters; about 481 lines | preserve technical semantics; split detailed API and migration examples into references |
| `tonic-ui-sx` | description about 1,249 characters, over the 1,024-character standard limit; about 462 lines | shorten the description; separate detailed examples; keep the existing evals and fix their skill/package names |
| `tonic-ui-types` | has standard required fields; about 180 lines | keep the main flow; check paths and executor assumptions |

Other confirmed items:

- The root `AGENTS.md` requires: a dedicated branch, PR base `main`, changesets created only after the PR exists, with the filename `.changeset/tonic-ui-pr-<PR_NUMBER>.md`.
- patterns still says base branch `v2`, and shows creating a changeset file with an arbitrary name before obtaining a PR number.
- The PR skill currently shows letter/descriptive suffixes for multiple changesets, inconsistent with the exact filename required by the root file.
- sx's `evals/evals.json` currently uses `agentic-ui-sx` and `@agentic-ui/react`, not this repository's names.
- `.gitignore` does not exclude `.agents/`; no need to widen ignore rules for that.

## 3. Target directory

```text
repo/
├── AGENTS.md                         # shared resident policy and skill selection guidance
├── .agents/
│   └── skills/                       # single editable source of skills
│       ├── tonic-ui-patterns/
│       │   └── SKILL.md
│       ├── tonic-ui-pr/
│       │   └── SKILL.md
│       ├── tonic-ui-slots/
│       │   ├── SKILL.md
│       │   └── references/
│       │       ├── api.md
│       │       └── migration.md
│       ├── tonic-ui-sx/
│       │   ├── SKILL.md
│       │   ├── references/
│       │   │   └── composition-and-verification.md
│       │   └── evals/
│       │       └── evals.json
│       └── tonic-ui-types/
│           └── SKILL.md
├── .claude/
│   └── skills/
│       ├── tonic-ui-patterns -> ../../.agents/skills/tonic-ui-patterns
│       ├── tonic-ui-pr       -> ../../.agents/skills/tonic-ui-pr
│       ├── tonic-ui-slots    -> ../../.agents/skills/tonic-ui-slots
│       ├── tonic-ui-sx       -> ../../.agents/skills/tonic-ui-sx
│       └── tonic-ui-types    -> ../../.agents/skills/tonic-ui-types
└── CONTRIBUTING.md                   # skill maintenance and verification method
```

Keep `.claude/skills/` as a real directory and replace only the five skill subdirectories with relative symlinks. Relative targets are computed from the symlink's own location in `.claude/skills/`; do not use personal absolute paths.

Do not add policy copies in `.agents/AGENTS.md`, `.omp/AGENTS.md`, `.claude/CLAUDE.md`, or `CLAUDE.md`. They could shadow the root-directory policy in OMP's same-layer discovery precedence. If a real installed version needs an extra entry point, record the version and the failure evidence first, then adjust the plan; do not silently copy rules.

## 4. Contracts of the three executors

| Executor | Resident rules | Skill source | Explicit skill use |
| --- | --- | --- | --- |
| OMP (primary) | root `AGENTS.md`; personal native rules stay as-is | the `agents` provider discovers `.agents/skills/`; Claude symlinks may be discovered at the same time | `read skill://tonic-ui-sx`; if skill commands are enabled, `/skill:tonic-ui-sx` |
| Claude Code | root `AGENTS.md`, verified against Claude Code 2.1.292 in the user environment | `.claude/skills/<name>/SKILL.md`, reading the shared source through the symlink | `/tonic-ui-sx` |
| Codex | root `AGENTS.md` | `.agents/skills/`, from the CWD up to the repository root | `$tonic-ui-sx`, or select via `/skills` |

### Required notes for OMP precedence

- OMP's `agents` provider supports `.agents/skills/` and does not depend on the Claude/Codex skill source switches.
- OMP also discovers Claude project skills. Identical files deduplicate by realpath, so the symlink should not produce a second copy of a skill.
- The Claude provider ranks above the agents provider; the source provider in a normal listing may be Claude. Acceptance should check the real files and unique skills, not require the source label to be exactly `agents`.
- Also run one isolated session: temporarily disable Claude project skills, and the five `.agents/skills/` skills must still be discovered. Use only that test session's configuration override; do not write user or project settings.
- Do not disable the whole Claude/Codex provider for deduplication; that would also affect other capabilities and is out of scope.
- Do not use OMP extensions such as `alwaysApply`, `globs`, or `hide` to carry required behavior shared by all three tools.

## 5. Shared content rules

### Responsibility split between AGENTS.md and skills

`AGENTS.md` keeps the policies every task must follow. A skill stores the method, examples, and checklists for a specific task. Do not put commit/push prohibitions, PR timing, or changeset naming only in a skill that loads on demand.

Add a short skill lookup table to the root file:

- Component conventions and repository structure: `tonic-ui-patterns`.
- PR descriptions, commit message drafts, and changesets: `tonic-ui-pr`.
- `slots`, `slotProps`, `useSlot`, or legacy prop migration: `tonic-ui-slots`.
- `sx`, `__sx`, `composeSx`, and style precedence: `tonic-ui-sx`.
- React component JSDoc/props types: `tonic-ui-types`.

Instruct executors to load the relevant skills before the matching task starts; one task may use several skills. This guidance uses skill names and `.agents/skills/<name>/SKILL.md` paths, and does not rely on `skill://` or slash commands.

### Frontmatter

- Each skill has an explicit `name` and `description`.
- `name` matches the parent directory, follows standard naming, and is at most 64 characters.
- `description` is a non-empty string of at most 1,024 characters; put the most important trigger conditions first.
- Move patterns' `version`, `source`, and `analyzed_commits` into `metadata`, with string values.
- Do not add Claude-specific `context`, `agent`, `model`, or `$ARGUMENTS`.
- Do not treat experimental `allowed-tools` as a cross-tool permission guarantee.
- `agents/openai.yaml` is not needed this time; if Codex needs a dedicated UI or invocation policy later, handle it separately.

### Paths, tools, and content layering

- Skill resources in shared body use paths relative to the skill root, for example `references/api.md`.
- Clearly distinguish skill-internal paths from repository-root-relative paths, to avoid mislocation when running from different CWDs.
- Do not use `@path` imports, personal absolute paths, OMP internal URIs, or Claude dynamic shell injection as required mechanisms of the shared body.
- Describe the evidence to obtain, not a required number of Bash tool calls. The executor completes the task with the tools it supports.
- RTK, LSP, special tools, and provider safety rules are handled by host instructions. Do not override them with a generic skill.
- Do not add automatic download, install, or external write steps.
- `SKILL.md` keeps core decisions, required invariants, working steps, and when to read references; detailed examples load on demand.
- Each `SKILL.md` is under 500 lines; the body targets under 5,000 tokens as a recommendation. Line count is not a substitute for tokens.
- References link directly from `SKILL.md`; do not create multi-level reference chains.

## 6. Implementation order

### Phase A: Build the migration inventory

- [x] Record the five skills and all accompanying files; keep sx's existing evals.
- [x] Check frontmatter, paths, tool assumptions, and policy conflicts across the full text of all five skills.
- [x] Record OMP/Codex versions; at the time the Claude Code CLI was not found on PATH (since confirmed ready in this environment); no software installed or upgraded.
- [x] Check the real discovery results and root policies: the five skills have no same-name versions with different content; OMP and Codex both load the root PR policy; personal files untouched.

**Completion criteria:** source and conflict inventory complete; no files or executor behaviors left to fill in by guessing.

### Phase B: Migrate the single source

- [x] Move the five skills and their resources to `.agents/skills/`, keeping skill names.
- [x] Shorten sx's description; keep detailed trigger scenarios in the body.
- [x] Move patterns' custom fields into `metadata`, and fill in concrete usage scenarios.
- [x] Split slots and sx per section 3; preserve technical rules and example semantics.
- [x] Change `agentic-ui-sx`/`@agentic-ui/react` in sx's evals to this project's names; keep the original three cases' expected behavior.
- [x] Remove executor-specific invocation assumptions from shared body, replacing them with tool-neutral operation requirements.

**Completion criteria:** the five standard-format skills read directly from `.agents/skills/`, with no lost content, resources, or broken references.

### Phase C: Unify policies and entry points

- [x] Keep the existing PR/changeset policies in the root `AGENTS.md`; add skill selection guidance.
- [x] Change patterns' base branch to `main`; remove the arbitrary changeset filename instruction.
- [x] Make the PR skill's changeset flow explicit: only after the PR exists and a number is obtained may a file be created, within the scope the user requested.
- [x] Without a PR number, provide only a content draft and explain the missing number; do not create a placeholder/descriptive filename, and do not open a PR on my own account to obtain a number.
- [x] Remove suffix filename examples; the same PR's changeset uses `.changeset/tonic-ui-pr-<PR_NUMBER>.md`, listing affected packages and bumps in Changesets format.
- [x] Replace the five skill subdirectories in `.claude/skills/` with the relative symlinks from section 3.
- [x] Update `CONTRIBUTING.md`: edit only `.agents/skills/`, standard format, references, relative discovery adapters, and verification principles; no primary tool specified.

**Completion criteria:** no policy conflicts, one physical copy of skill content, and three-tool entry points that require no personal configuration changes.

### Phase D: Switch after verification

- [x] All three-tool smoke complete: OMP, Codex, and Claude Code all passed (see section 11.3).
- [x] Remove the temporary configuration overrides created this time; verification scripts ran only in the eval kernel, with no new repository scripts or output files. Original evals kept.
- [x] Record versions, success and failure evidence, and known limitations.
- [x] The remaining Claude Code acceptance holds; the full three-tool migration is complete.

## 7. Verification method

### 7.1 Static checks

Use existing available tools, or a throwaway script that adds no dependencies:

1. Parse the five frontmatters; check `name`, description character limits, and metadata string values.
2. Check each `SKILL.md` line count and all references/assets/scripts link targets.
3. Verify all five Claude entry points are relative symlinks whose realpath equals the corresponding `.agents/skills/<name>`.
4. Verify the resource set before and after migration is identical, except the planned new references and required text changes.
5. Check current skills and entry points for stale source paths, personal paths, or broken references. Paths in entry-point documents referring to `.claude/skills/` remain legal.
6. Compare root-directory policies against the two workflow skills: no `v2` base, no arbitrary changeset filename, no changeset before the PR, no unauthorized external operations.
7. If `skills-ref` is installed, `skills-ref validate` may run additionally; do not install dependencies on my own account for that.

Do not add permanent tests that only check text copying, link counts, or wiring. Do not run the full application build for a pure documentation migration.

### 7.2 Real session verification

Start a fresh session in the repository root and in `packages/react/` each, to avoid judging results by a stale skill cache. Every scenario requires read-only analysis: no source modification, no changeset creation, no external writes.

| Scenario | Operation | Result that must be observed |
| --- | --- | --- |
| Discovery | show/check available skills and their actual sources | five skills available; all physical source files in `.agents/skills/`; no duplicate versions caused by this migration |
| Resident rules | ask the agent to state this project's PR base, changeset timing, and filename | `main`, created after the PR number is known, exact PR-number filename |
| Explicit invocation | use each tool's native way to select the sx skill, asking to explain wrapper vs. consumer override precedence | the skill actually loads, and the answer matches the existing sx rules |
| Resource loading | explicitly select the slots skill, ask it to read the migration reference, then analyze | references resolve; a relative path is not mistaken for a CWD path |
| Automatic selection | without naming the skill, ask about `useSlot` legacy prop migration | evidence the slots skill loaded; do not judge from a plausible-looking answer alone |
| OMP dedup | keep both agents and Claude entry points at once | the same physical skill does not produce an extra namespaced version |
| OMP native shared discovery | a test session with Claude project skills temporarily off | the five shared skills remain available; operation does not depend on the Claude entry |
| Forbidden behavior | request "draft a changeset only; the PR does not exist yet" | draft only: no file created, no guessed PR number, no PR opened, no commit/push |
| Skill behavior | run the existing three sx eval prompts | base uses `__sx`, wrapper override composes correctly, consumer `sx` wins; object spread is not treated as full composition |

Keep evidence from the executor's tool trace, source paths, extensions/skills list, or output; do not rely on the agent's self-reported "read". Verification records must include at least: tool and version, launch CWD, input scenario, load source, and result.

If a tool is not installed, cannot start, or lacks authorization, record the exact missing prerequisite and what was tried. Still complete the other reachable checks, but do not claim three-tool compatibility is verified.

## 8. Final acceptance criteria

- [x] `.agents/skills/` is the only physical source of the five skills.
- [x] OMP uses all five skills in both normal sessions and sessions without Claude project skills.
- [x] OMP deduplicates the Claude symlinks correctly; no same-name/different-content version exists from the migration.
- [x] Claude Code and Codex both discover the five skills when started from the root directory and from `packages/react/`.
- [x] All three read the root PR/changeset policies, with no new entry point shadowing them.
- [x] Explicit invocation, description-based selection, reference loading, and the existing three sx behavior cases have real evidence in all three tools.
- [x] In the OMP, Codex, and Claude Code scenarios run, insufficient prerequisites did not produce a changeset file or self-executed external operations, and no session created or modified any repository file.
- [x] All five frontmatters meet the standard; sx's description is within 1,024 characters; references and symlinks are all valid.
- [x] `CONTRIBUTING.md` describes tool-neutral single source, format, references, and adapter maintenance; tool differences and the smoke method stay in this plan.
- [x] Personal configuration, global skills, credentials, MCP, and application code were not modified.

## 9. Risks and handling

| Risk | Handling |
| --- | --- |
| OMP native/personal skills or context precedence affects results | record the source and verify in an isolated session; do not modify the user's global content |
| Claude's version of `AGENTS.md` support differs from the current environment | test with the real version; on failure, list the prerequisites; do not add a policy copy on my own account |
| Symlink checkout unavailable (for example some Windows setups) | this change uses a symlink-capable checkout; document the limitation; do not silently switch to maintaining multiple copies |
| After splitting long documents, the agent does not read the required references | keep core rules in `SKILL.md`; give explicit read conditions, then verify with the resource-loading scenario |
| Automatic selection is unstable | adjust the description's trigger scope; keep explicit selection available; acceptance must include real automatic-selection evidence |
| Evals or examples lost during the move | build a resource inventory before the move, compare item by item after |

To roll back this uncommitted migration, revert only the paths changed this time: restore the original five physical Claude skills, the root skill guidance, and the CONTRIBUTING changes; remove the shared skills and symlinks created this time. First check for later user modifications; do not use a full-repository reset or bulk deletion of untracked files.

## 10. References

- [Agent Skills specification](https://agentskills.io/specification)
- [Claude Code skills](https://code.claude.com/docs/en/skills)
- [Codex skills](https://developers.openai.com/codex/skills)
- [Codex AGENTS.md](https://developers.openai.com/codex/guides/agents-md)
- OMP local docs: `omp://skills.md`, `omp://context-files.md`. These URIs are for OMP maintainers only; they are not dependencies of the shared skills.

## 11. Implementation and verification record

### 11.1 Deliverables and user adjustments

- Work branch: `docs/shared-agent-skills`. This plan and the implementation went into the same local commit for the later PR; the unrelated `untitled.md` was not included.
- Kept the six original resources (five SKILL.md files, one evals JSON); added three on-demand references.
- The slots API/migration examples and sx's worked examples/transition/regression/prop-getter content moved from the original text without rewriting the technical rules.
- Fixed sx's stale repository references: removed the nonexistent CONTEXT/ADR pointer, kept the inline explanation, and changed the old plan path to the existing `docs/plans/2026-07-02-sx-internals-migration.md`.
- The user confirmed CONTRIBUTING needs no tool positioning: removed the primary tool and per-tool flows; kept only the shared maintenance contract and the link to this plan.
- The user provided the newer Tonic One hook and confirmed Tonic UI has not finished `__sx` integration; the slots/sx entry and API reference distinguish the target contract from current checkout behavior, without changing component code.
- On 2026-10-07 the user confirmed the Claude Code CLI is ready in this environment; the remaining section 7.2 acceptance ran that day and passed (see 11.3).

### 11.2 Static verification

Used the Bun YAML parser and throwaway assertions; all results passed:

| Skill | description characters | SKILL.md lines (excluding trailing blank lines) |
| --- | ---: | ---: |
| tonic-ui-patterns | 195 | 225 |
| tonic-ui-pr | 261 | 313 |
| tonic-ui-slots | 865 | 68 |
| tonic-ui-sx | 265 | 283 |
| tonic-ui-types | 230 | 184 |

Other checks:

- The five names are standard and match their directories; all metadata values are strings.
- All five Claude adapters are relative symlinks with realpath equal to the shared directory.
- Original resources intact; the example/migration blocks moved into references compared block by block. The API reference gained integration status marked as the target contract, with code examples preserved; the listed stale citations were removed.
- The three sx evals' IDs, names, expected_output, and case behavior unchanged; only skill/package names fixed.
- Markdown fences, direct references, AGENTS/CONTRIBUTING local links, and sx's repository source pointers all valid.
- Shared skills do not depend on personal absolute paths, `skill://`, Claude argument injection, or a specific Bash tool call count.
- CONTRIBUTING contains no OMP/Claude Code/Codex tool positioning statements.
- `skills-ref` is not on PATH; no dependencies installed. No application build/test ran, because this change does not touch the application.

### 11.3 Real executor evidence

**OMP 18.4.4**

- Launched discovery for real via `get_available_commands` with `omp --mode rpc --no-ui --no-session --no-extensions`.
- Ran normal discovery and agents-only overrides in the root directory and `packages/react/`, four fresh sessions in total; each listed five `skill:tonic-ui-*` with no extra namespaced copies; stderr empty.
- The agents-only override set only `skills.enableClaudeProject: false` and `skills.enableAgentsProject: true`; the override file was removed, and no persistent settings changed.
- Ran read-only scenarios with `-p --mode json --no-session --no-extensions --tools read --model openai-codex/gpt-6.1-sol --thinking low`.
- Explicit sx selection in the root directory: the trace included `read skill://tonic-ui-sx` and the composition reference; completed the three existing evals, the root PR policy, and a no-PR-number chat draft, exit 0.
- The implicit slots scenario in `packages/react/` selected no skill explicitly: the trace actually read the slots SKILL.md, `references/api.md`, and `references/migration.md`, and answered element precedence, legacy/new props merge, handlers, forced `in`, and ref/style contracts, exit 0.
- All three case answers used `__sx` for base/wrapper, `composeSx` array composition, and kept consumer `sx` independent; they noted the specificity boundary and did not treat shallow object merging as full style composition.
- Visible tool calls in the read-only scenarios above were all `read`; no changeset was created and no external write executed.

**Codex CLI 0.160.1**

- Launched `codex app-server --stdio` for real, completed the initialize handshake, and called `skills/list` with the root and `packages/react/` CWDs, `forceReload: true`.
- Both CWDs returned five enabled skills with paths directly in `.agents/skills/`; errors empty.
- Used `codex exec --ephemeral --json -s read-only -C <cwd>`.
- Explicit sx in `packages/react/`: the command trace actually read the shared SKILL.md, the composition reference, root AGENTS, and the PR skill; the three evals and the no-PR-number draft completed, exit 0, no file_change events.
- Implicit slots in the root: the command trace actually read the slots SKILL.md, both references, and other relevant skills; analysis and root PR policy completed, exit 0. One command in an extra source lookup exited 1 but did not block skill/reference reads or the final analysis.
- Both answered PR base `main` and that `.changeset/tonic-ui-pr-<PR_NUMBER>.md` is created only after the PR exists; no guessed numbers, no files created.

**Claude Code**

- At the time, `claude --version` could not start: `Executable not found in $PATH: "claude"`.
- Checked the common user/Homebrew/system CLI paths, the Claude version directory, and Applications; no usable executor was found.
- The user has since confirmed the Claude Code CLI is ready in this environment: `/Users/cheton/.local/bin/claude`, version 2.1.292, default model `claude-haiku-4-5`. On 2026-10-07 the section 7.2 scenarios ran in seven fresh `claude -p` sessions (four in the root directory, three in `packages/react/`), all exit 0 (8-23 s each), with `--allowedTools "Read,Grep,Glob"` making every session structurally read-only.
- Discovery from the root directory and `packages/react/`: the harness skill catalog (root session) listed all five project skills exactly once, alongside 22 `anthropic-skills:*` plugin skills and built-ins, with no namespaced `tonic-ui-*` copies; both sessions reported all five with physical paths in `.agents/skills/`.
- The root `AGENTS.md` was auto-loaded as an `instructions` attachment (type `Project`) in every session; the resident-rules session quoted the `main` base, the after-PR-creation changeset step, and the exact `.changeset/tonic-ui-pr-<PR_NUMBER>.md` filename from it, with zero tool calls.
- Explicit invocation in the root directory: the `/tonic-ui-sx` prefix was intercepted by the harness, which injected the skill body with base directory `.claude/skills/tonic-ui-sx`; all three sx evals answered per the skill (base via `__sx` with `composeSx`, wrapper override via `__sx`, object-merge fault plus array-composition fix), exit 0.
- Automatic selection in `packages/react/` without naming the skill: the transcript shows a `Skill {skill: tonic-ui-slots}` activation, then Read calls for `references/migration.md` and `references/api.md` through the `.claude/skills/` symlink paths; the answer covered element precedence, handler chaining, ref merge, and `__sx` composition.
- Reference loading in `packages/react/`: the transcript shows the Skill activation plus Read of `.agents/skills/tonic-ui-slots/SKILL.md` and `references/migration.md`; relative paths resolved against the skill directory, not the CWD.
- The no-PR-number scenario replied draft-only with a `<PR_NUMBER>` placeholder and zero tool calls; `git status` and the `.changeset/` listing were unchanged afterwards.

### 11.4 Observed limitations and pre-existing issues

- The first OMP three-case headless run on the default model ended with `Deadline exceeded`, exit 1, after successfully reading the skill/references. Switching to an explicit model available this time, the focused scenario and the full three-case run both finished exit 0. This record does not hide the first failure.
- Some OMP root runs printed an existing MCP warning: `MCP server "tonic-ui" failed to connect: MCP subprocess closed stdout before responding`. Verification used only the read tool and did not rely on that MCP; no MCP settings or code changed.
- `~/.omp/agent/GITHUB_GHEC_DIRECT_ACCESS.md`, referenced by the user's global AGENTS, does not exist; no personal context file was created or modified.
- The Codex slots smoke found a pre-existing documentation/code gap. `packages/react/src/slot/useSlot.js:38-42` splits and composes refs only; other props merge via object spread; the `__sx` composition described in the skill docs is not implemented. The user provided the newer Tonic One implementation and confirmed Tonic UI has not finished integration, so the skill keeps the target rules with an applicability note instead of claiming the local code meets the contract. The gap was not caused by the move; the application was not expanded for it.
- `rtk` is not on PATH; Git operations used native Git; RTK was not installed.
- Claude Code 2.1.292 Glob does not follow symlinked directories: a `.claude/skills/*/SKILL.md` glob returned empty, and one discovery session misreported the five symlinks as missing. The links are valid (the Read tool resolves them, and the harness catalog is unaffected); no repository change needed.
- Claude Code 2.1.292 skill catalog rendered `tonic-ui-types` as a name-only entry without its description, although the SKILL.md frontmatter holds a clean 230-character single-line ASCII description; the other four render fully. Impact: description-based auto-routing of the types skill is degraded in this tool; explicit selection is unaffected.

### 11.5 Guide verification after user clarification

- Re-passed the YAML/description/line-count/symlink/reference checks; the API reference's fenced code examples match the original text, and the migration block and the three eval expectations are unchanged.
- Asked in fresh OMP root and Codex `packages/react/` sessions: does the local hook already compose `props.__sx` and `slotProps.__sx`, and require distinguishing the current state from the Tonic One target.
- Both traces actually read slots, sx, the API reference, and the local hook; exit 0, and both answers explicitly stated that locally only ref composition exists, `__sx` is currently overridden by slot props; the newer target is `composeSx(base, override)`, emitted only when a value is present.
- OMP made read calls only; Codex made read-only command calls with no file_change events. No code was modified and no component tests ran.
