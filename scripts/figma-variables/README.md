# Figma variable capture tools

These checkout-only tools capture the Tonic One v4 Foundations and Semantic variable libraries as location-redacted snapshots. The captures are independent design evidence; their applicability to Tonic UI v3 is unverified.

## Capture routes

- **Plugin and converter:** Follow the [development plugin instructions](figma-plugin/README.md). Pass both raw downloads to `convert-figma-variables.mjs` using `--from`, and provide an output directory with `--out`. Conversion does not require a Figma API token.
- **REST exporter:** `export-figma-variables.mjs` requires `FIGMA_FOUNDATIONS_FILE_KEY` and `FIGMA_SEMANTIC_FILE_KEY` from an operator with authorized access. Both keys are checked before any token is read or network request is made. It also requires a Figma Enterprise plan and the `file_variables:read` scope.

Both routes share `variable-inventory.mjs` for validation, normalization, and alias resolution. Each final snapshot has null location fields and an identity fingerprint. The raw plugin downloads and the converter's `.payloads/` cache can contain private file keys. Keep them in operator-controlled temporary storage, do not publish them, and do not treat the cache as a safe output artifact. The converter creates an ignore rule for the raw cache and reports the capture time and age when reusing a companion capture.

See the [capture and conversion procedure](../../skills/tonic-ui-tokens-maintenance/references/figma-variable-capture.md) for the authorized workflow, output paths, and independent review steps.