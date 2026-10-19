# Language and evidence rules

Output conventions for the `tonic-ui-upgrade` skill. They keep plans portable across harnesses and honest about what was actually verified.

## Language

- **Respond in the user's language.** Match the language of the user's request; do not force English.
- **Preserve verbatim** — never translate, reformat or "correct": package names, version strings, token paths, prop/API identifiers, file paths, source file names, commands, error/warning text quoted from source, and repository/branch names.

## Evidence labels

Every actionable statement cites where it came from. Prefer a concrete `path` or `path:detail` over a vague reference.

- **Source** — a target-version file/declaration, e.g. `packages/react/src/popper/Popper.js`.
- **Manifest** — `package.json` peer/dependency metadata.
- **Changelog** — `packages/*/CHANGELOG.md`, naming the version that introduced the change.
- **Guide** — the public migration pages under `packages/react-docs/pages/migrations/`.
- **Inference** — a conclusion you drew but did not observe directly; mark it explicitly (`[INFERENCE]`) and state the basis.

When a **guide** and the **source** disagree, report the conflict with both paths; do not silently pick one or "fix" the library.

## Classification discipline

- Distinguish four outcomes for every item: **necessary**, **deprecated but still supported**, **optional adoption**, **manual decision**.
- A deprecation is not a removal. Most v3 API changes add `slots`/`slotProps` alongside the deprecated prop, merged with the new one winning — so an old prop working is the expected case.
- **Do not claim a crash, a compile error or a breakage** without source, a declaration, or a reproducible failure. An obsolete prop, a TS error, an ignored prop, and a runtime crash are four different claims.
- Do not extrapolate a "universal" rule (e.g. a universal prerelease pin, a mandatory full token rewrite) from one package's metadata.
- Do not present DataGrid or chart packages as Tonic UI packages: they are absent from this repository. Mark those checks NOT_APPLICABLE unless the app separately owns such a package.

## Capability and portability

- Describe **capabilities**, not host-specific tooling. Do not require slash commands, a particular CLI, a specific model/provider, `allowed-tools`, host URIs, or a mandatory MCP server.
- The docs MCP is optional. When it is unavailable, use a local checkout, installed packages, or the user's exports; state the freshness limit instead of inventing an answer.
- Do not invent codemods, MCP tools, props or versions. `@tonic-ui/codemod` exists in this repository (`packages/codemod/`, with the `style-props-to-sx` transform under `src/style-props-to-sx`) but a v2→v3 application codemod is not among them — do not promise one.
- Reference external sibling skills by name and data role: `tonic-ui-tokens` for token resolution and `tonic-ui-dev` for frontend highlights. Library releases are separate internal work, never an app-upgrade step.

## Honesty about verification

- Report only checks you actually ran. Compilation is not visual/interaction proof.
- Mark unexercised surfaces explicitly as unverified rather than implying they pass.
- Do not restate a plan as if it were a result; keep "to do", "done" and "n/a" distinct.
