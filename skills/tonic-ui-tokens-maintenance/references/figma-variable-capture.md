# Capture Figma variables

This contributor-only procedure describes explicitly authorized Figma capture and local conversion. Consumer lookup uses bundled assets and requires no checkout, Figma access, dependencies, credentials or this skill. All paths and commands below are relative to the repository root.

## Prerequisites and scope

- A repository checkout with the existing Node dependencies available.
- Operator-supplied authorized access to the named Foundations and Semantic libraries. Do not put their private file locations or file keys in delivered resources or reports.
- Explicit authorization for capture, conversion and any affected variable-relation review, separately. Capturing does not authorize changing curated source rows, theme implementation or external publication.
- Explicit authorization before importing a development plugin, reading credentials, changing client configuration or making a network request. Do not install tools or alter credentials or settings as an incidental step.

The captures retain Tonic One v4 names, modes and records. They are independent design snapshots with unverified applicability to Tonic UI v3, not proof of implemented v3 tokens or reviewed correspondences. Keep their locations redacted; do not reconstruct a private location from a fingerprint.

## Download and convert with the development plugin

1. Only if development-plugin import is explicitly authorized, select **Plugins → Development → Import plugin from manifest** in Figma and import `scripts/figma-variables/figma-plugin/manifest.json`. If a previously registered plugin points at an older location, reimport only with that authorization.
2. With authorized access, open the operator-supplied Foundations library, run **Tonic UI Token Export**, wait for reading and alias resolution, and select **Download JSON**. Save the raw download as `foundations.raw.json` in a unique task-owned directory under `$TMPDIR`.
3. Repeat for the operator-supplied Semantic library, saving `semantic.raw.json` in that directory.
4. Only if conversion and its output destination are authorized, set `CAPTURE_DIR` to that directory and run:

   ```bash
   node scripts/figma-variables/convert-figma-variables.mjs \
     --from "$CAPTURE_DIR/foundations.raw.json" \
     --from "$CAPTURE_DIR/semantic.raw.json" \
     --out plugins/tonic-ui-tokens/skills/tonic-ui-tokens/assets/figma-variables
   ```

The downloads and the ignored `.payloads/` cache are private raw inputs, not safe publication artifacts. They can contain file keys. No receiver, localhost permission, REST token or pasted JSON is needed for this route. Do not commit, transmit or copy raw inputs into delivered resources. Extended collections are unsupported and produce an error rather than a partial snapshot.

Capture both libraries on each refresh. A single `--from` input works only when the destination already has a valid cached raw capture of the other library. The converter reports the reused library and its original `exportedAt`; that is older evidence, not a fresh capture. A fresh output directory requires both inputs.

On failure, retain the task-owned downloads while diagnosing the path-specific error; correct the input or destination and rerun with both inputs if still authorized. Do not replace final assets with raw downloads or manually patch `.payloads/`. A disk error can leave a partial output update; conversion succeeds only after both outputs and the cache are written. Remove only task-owned temporary files when no longer needed; never delete an existing operator-owned cache.

## Alternative: authorized REST export

Only when the request separately authorizes network capture, credential use and final asset writes, an operator may supply the two file keys in `FIGMA_FOUNDATIONS_FILE_KEY` and `FIGMA_SEMANTIC_FILE_KEY` and an access token in `FIGMA_TOKEN` or `FIGMA_ACCESS_TOKEN` through an existing authorized environment. Do not ask for or print their values, inspect credential files or put values in commands or delivered files. The exporter verifies both file-key fingerprints before reading a token or contacting the API. With the authorized environment already prepared, use:

```bash
node scripts/figma-variables/export-figma-variables.mjs --source env --out plugins/tonic-ui-tokens/skills/tonic-ui-tokens/assets/figma-variables
```

If file keys, access, authorization or the existing tool are unavailable, report the blocker; do not infer a file key, inspect credentials, install software or change configuration. The REST route is a separate capture, not a prerequisite for offline conversion.

## Inspect and validate

For either route, inspect added, removed and changed variables and each snapshot's `meta.aliasStats.unresolvedByTarget`. Confirm `meta.fileKey` and `meta.figmaUrl` are null and the expected `meta.fileKeySha256` is retained; never print the raw file key or file location. Unresolved aliases retain the available raw ID, stable variable key and name and are not necessarily broken. Inspect affected relation endpoints and their recorded evidence. Change relations only under separate authorization using the directly routed [variable-to-theme review](variable-theme-mapping.md); do not fill gaps by matching names or colors. Report undecided design choices and stale reviews rather than manually transforming records.

After authorized edits and any separately authorized review, verify the local changes:

```bash
node --test scripts/figma-variables/__tests__/figma-variables.test.mjs plugins/tonic-ui-tokens/scripts/__tests__/token-inventory.test.mjs plugins/tonic-ui-tokens/scripts/__tests__/token-validation.test.mjs plugins/tonic-ui-tokens/skills/tonic-ui-tokens/scripts/__tests__/lookup-provenance.test.mjs
node plugins/tonic-ui-tokens/scripts/validate-tokens.mjs
node scripts/skills/validate-skills.mjs
```

Query affected records with the consumer lookup after validation. These offline checks establish local integrity, not that remote files have remained unchanged since capture. Only after local edits and review are snapshots and relation evidence eligible for normal delivery. This procedure does not authorize a commit, push, publication, curated source-version change or theme regeneration.
