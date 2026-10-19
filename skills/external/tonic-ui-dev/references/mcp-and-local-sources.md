# MCP and local sources

Use existing readable sources first. Offer setup only when the current task needs
unavailable documentation, examples or changelog evidence. These instructions do
not authorize cloning, installing packages, changing client configuration or starting services.
Never inspect, display or rewrite credentials as part of this workflow.

## Choose the smallest access path

- **MCP tools already available:** use them. Do not suggest another installation.
- **Readable local checkout:** read its docs index, page and referenced example files
  directly. `CHANGELOG.md` and source files can also be read directly. No dependency
  installation or running MCP is needed for existing files. If a page depends on a
  generated file absent from the checkout, report that missing file rather than inventing it.
- **No suitable checkout or tools:** explain the needed source and offer a local
  clone. The user may choose direct file reading after cloning, or running MCP locally.

The canonical repository is
`https://github.com/trendmicro-frontend/tonic-ui.git`.
Before executing a clone, confirm the repository, destination and scope. Reuse an
existing suitable checkout instead of duplicating it. A clone of the latest branch
is not automatically the source for an older installed package: verify the relevant
package version/ref before making compatibility claims.

## Local MCP from a checkout

Consult the checkout's `packages/mcp/README.md`, `packages/mcp/package.json` and root
package-manager declaration for its current setup/build requirements. If dependencies
or build artifacts are missing, explain which project-local install/build actions
are required and obtain authorization before executing them. Do not install globally,
change registries, or copy credential-setup commands into an app.

Once that checkout's MCP build and dependencies are available, its stdio launch is:

```text
command: node
args:
  - <checkout>/packages/mcp/bin/cli.js
  - --config
  - <checkout>/tonic-ui-mcp.config.js
  - --type
  - stdio
```

Replace `<checkout>` with its real absolute path. `stdio` is the CLI default, so
`--type stdio` may be omitted. Register this command through the
client's supported MCP configuration mechanism only when explicitly authorized.
Do not assume a shared configuration file across Claude Code, Codex and omp.
After connection, verify the advertised `use-docs`, `fetch-pages` and `fetch-codes`
tools; perform a relevant read before claiming the connection works.

## Reading a changelog

For a known checkout containing the package, `fetch-pages` accepts `{ "urls": [...] }`:

- An absolute local path to the package's `CHANGELOG.md`.
- Its equivalent `file://` URL.
- A relative path, such as `packages/react/CHANGELOG.md`, when the MCP configuration
  file is at that repository root. Relative paths resolve on the MCP server from the
  configuration file's directory, not from the consuming app's working directory.

This reads content; it does not choose a package version or calculate a release delta.
The current server permits HTTP(S) only for `localhost` and `127.0.0.1`. Do not promise
that a GitHub web/raw URL will work or invent an allow-list configuration option.
Use a local file or an already authorized repository reader instead of bypassing restrictions.

A missing-file or disallowed-domain error is not evidence that no release change exists.
Check the known path/configuration context, try an available local read or supplied
source, and preserve `UNVERIFIED` for findings that still lack evidence. Suggest setup
only if it would address that actual source-access gap, not as a routine prerequisite.
