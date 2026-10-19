---
name: tonic-ui-dev
description: Use when building or changing a consuming app with Tonic UI components, choosing a component, looking up its API or examples, or integrating it with existing app wrappers, forms, state and styling. Also use when Tonic UI documentation or an example does not match the app's behavior. Not for library maintenance, token-name mapping, or a requested major-version migration.
---

# Tonic UI app development

Help complete the app's task using official documentation and real examples, while
preserving the app's existing architecture. MCP is a retrieval capability inside
this workflow, not a separate skill or a prerequisite for all development.
Keep methods here, not copied component APIs, release tables or known-issue lists.

## 1. Understand the app and the requested change

- Identify the user-visible behavior, affected screen and acceptance criteria.
  Resolve what the repository already answers before asking the user.
- Follow imports from the actual usage site to its wrapper and underlying Tonic UI
  components. Do not choose the first similarly named component found in a search.
- Inspect the relevant provider/theme scope, form value shape, state ownership,
  callbacks, i18n, permissions and test/analytics attributes. Read only what the task touches.
- Check the relevant dependency declarations, lockfile resolutions and installed
  package metadata when available. They can disagree: distinguish intended locked
  versions from the installed environment. Report a mismatch; do not silently reinstall,
  change dependencies, or assume documentation labeled `v3` matches every installed prerelease.
- Ordinary development needs no upgrade target, release audit or full checklist.

## 2. Find documentation and actual examples

Use existing Tonic UI MCP tools when available; their client-specific prefixes may vary:

1. **`use-docs`**: select a package identifier from the tool's advertised packages.
   Read the returned index and choose pages for the underlying components and the
   behavior needed. An app wrapper's name does not establish its library counterpart.
2. **`fetch-pages`**: pass selected page locations in `{ "urls": [...] }`.
   Read imports, API, callback values, controlled state, styling and composition guidance.
3. **`fetch-codes`**, when examples are needed: resolve a page's `render('./example')`
   relative to that page's directory and pass the absolute example locations in
   `{ "urls": [...] }`. Read the returned implementation, not only the rendered preview.
   Do not guess example names or claim an example was read when retrieval failed.

Retrieve only relevant material. Reading a documentation page or example is not
proof that its API exists in the app's installed package; check relevant declarations
or exports when availability is uncertain. Do not require every task to fetch every tool.

**No usable MCP?** Continue with an existing local checkout, installed package files
or supplied documents/examples. Follow the same index → page → referenced example
path using local reads. Do not start by recommending installation. Only when needed
source material cannot otherwise be reached, offer the local clone/direct-read or
local MCP setup options in [MCP and local sources](references/mcp-and-local-sources.md).
Read that reference when connecting MCP, locating changelogs or handling source-access errors.

## 3. Integrate into the existing app

- Prefer an existing suitable wrapper. Use the official example to understand its
  underlying component, not as an instruction to replace the wrapper.
- Explicitly map library props/callback payloads to the app's contract. Preserve
  object-versus-ID form values, validation, selection ownership and displayed labels.
- Preserve applicable loading/disabled/read-only behavior, focus/portal handling,
  translations, permissions and test/analytics attributes.
- Match existing layout, theme and style-override conventions. Do not add another
  provider, styling system or generic abstraction just to reproduce a documentation demo.
- Introduce a new wrapper only if the requested behavior cannot reasonably use the
  existing one; explain that specific gap. Do not migrate unrelated consumers.
- For token-name/value mapping use `tonic-ui-tokens` as needed; do not copy its data here.
  For an explicitly requested major-version migration use `tonic-ui-upgrade`.
- When current design guidance is relevant, use the design provenance bundled with
  `tonic-ui-tokens`. The upstream Designer Handbook (`1927774846`) and Light Mode guide
  (`2386166626`) snapshots are not Tonic UI-specific guidance; their applicability is
  unverified, so check it rather than treating historic workarounds as standing instructions.

## 4. Verify the requested behavior

Use the app's existing checks and exercise the changed interaction. For example,
verify the resulting form value and label, disabled/permission states, selection,
keyboard focus or overlay placement when those are affected. Do not run unrelated
checklists. A successful build/type check establishes compatibility, not visual correctness.

Report the integration decision, source locations and version limits, changed behavior,
and checks actually exercised. Use `PASS` only for an exercised check that matched the
expectation; `FAIL` for an observed mismatch; `NOT_APPLICABLE` with a reason; and
`UNVERIFIED` for unexercised behavior or missing evidence. Visual claims require
rendered inspection, not successful documentation/token lookup.

## Only when compatibility is in question

If the needed API is absent, behavior differs from its documentation, a historic
issue may apply, or a package update is explicitly being assessed:

1. Resolve the affected package/version and retrieve its `CHANGELOG.md`, preferably
   through available MCP `fetch-pages`. Local reads from a suitable checkout are also valid.
2. For a release delta only, establish exact source and target versions per package
   and select entries in the prerelease-aware interval `(source, target]`, not string order.
   Without both bounds, that delta remains `UNVERIFIED`.
3. Distinguish the release announcement from implementation evidence. Check the
   relevant installed source/declarations or a verified matching repository ref.
   A latest checkout, freshly cloned repository or docs label is not version proof.
4. Report documentation/changelog/source conflicts with both references. Do not
   invent a prop, patch library files, apply an old workaround or propose an upgrade
   solely to make the example fit. State the smallest supported app-level option.

If a required source remains unavailable, name the missing location/version and
continue the parts supported by evidence. Do not fall back to an embedded release snapshot.
Cloning, installing dependencies, modifying client settings or starting a local MCP
service requires the user's authorization for that action; this skill grants none.
