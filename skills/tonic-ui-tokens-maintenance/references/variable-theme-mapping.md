# Review variable-to-theme relations

Use this contributor procedure only for an explicitly authorized, scoped review of named Figma variables or theme paths. It is not a second lookup mechanism: consumer questions use the delivered `tonic-ui-tokens` lookup. Paths starting with `assets/` are relative to `plugins/tonic-ui-tokens/skills/tonic-ui-tokens/`; all other repository paths are relative to the repository root.

## Establish evidence

1. Identify the named variables by library and stable key and the implemented theme paths. Read their exact records in `plugins/tonic-ui-tokens/skills/tonic-ui-tokens/assets/figma-variables/{foundations,semantic}.json` and `assets/tokens.json` under that same skill directory.
2. Read the relevant curated `mappings` rows and source metadata in `assets/figma-mappings.json`. Use authored `codeSyntax` and semantic role or description as evidence; use mode values and alias identities only as corroboration, not as an automatic name, RGB or value-equality join. A reviewed relation states correspondence, not universal equality.
3. For each supported pair, record only modes actually checked. A mode map connects an existing captured mode name to one or more existing theme modes. The captures retain Tonic One v4 library names and modes; their applicability to this checkout's Tonic UI v3 implementation is unverified. Require direct evidence for the exact v3 endpoint and modes; never extend an upstream v4 review by name or import its relation records. Multiple reviewed pairs can connect either endpoint to more than one counterpart.

An absent ledger is valid and all endpoints without a review remain `unreviewed`; it does not prove absence. If authorized review creates a ledger, it has `variableRelationsCoverage: "partial"` and a `variableRelations` array. Persisted entries are `mapped`, `figma-only` or `theme-only`. A `figma-only` or `theme-only` review covers the entire endpoint across captured modes, both named Figma libraries and the current v3 theme snapshot. Add one only after reviewing that complete named scope, and state what was checked in the reason.

## Update only reviewed records

For each reviewed record, include a real `reviewedAt` date (`YYYY-MM-DD`), a specific nonempty `reason`, and any relevant `sourceRows` matching the existing curated `(figma, contentId, version, row)` records exactly. `sourceRows` can be empty when the review relies on independently inspected authored Figma evidence. A mapped record requires both endpoints and a nonempty `modeMap`; absence records have one null endpoint and no mode map. Do not add a ledger merely to fabricate coverage or reconstruct prior v4 reviews.

Compute current snapshot digests using the delivered read-only `relationSnapshotDigests` helper, not a separate hashing convention. For example, after selecting an existing reviewed record's array index, run:

```bash
RELATION_INDEX=0 node --input-type=module <<'NODE'
import { readFile } from 'node:fs/promises';
import { relationSnapshotDigests } from './plugins/tonic-ui-tokens/skills/tonic-ui-tokens/scripts/variable-relations.mjs';
const root = 'plugins/tonic-ui-tokens/skills/tonic-ui-tokens/assets';
const load = async (path) => JSON.parse(await readFile(path, 'utf8'));
const [inventory, mappings, foundations, semantic] = await Promise.all([
  load(`${root}/tokens.json`), load(`${root}/figma-mappings.json`),
  load(`${root}/figma-variables/foundations.json`), load(`${root}/figma-variables/semantic.json`),
]);
const relation = mappings.variableRelations?.[Number(process.env.RELATION_INDEX)];
if (!relation) throw new Error('Select an existing reviewed relation index');
console.log(JSON.stringify(relationSnapshotDigests(relation, inventory, [foundations, semantic]), null, 2));
NODE
```

For a new authorized review, add its checked endpoints and evidence locally first, then compute and record the helper's returned `evidence.snapshots`. Mapped reviews digest their exact variable and token records. Negative reviews digest the theme token inventory and both variable-library inventories because a new possible counterpart changes absence evidence.

A stale relation retains its original review and evidence until an authorized reviewer inspects affected endpoints and modes. Replace its evidence and digests only after that review. If evidence is insufficient, preserve the unresolved record and report validation as incomplete; do not bulk-repin reviews. Capture, conversion or theme regeneration does not authorize relation review or curated source-version changes, and Figma capture does not authorize changing theme implementation.

## Validate and report

Run `node plugins/tonic-ui-tokens/scripts/validate-tokens.mjs` and the affected `plugins/tonic-ui-tokens/skills/tonic-ui-tokens/scripts/__tests__/lookup-provenance.test.mjs` and `plugins/tonic-ui-tokens/scripts/__tests__/token-validation.test.mjs` tests. Query each reviewed endpoint with the consumer lookup and inspect the exact mode map and separate design and implementation values. For example, replace these paths with the endpoints being reviewed:

```bash
node plugins/tonic-ui-tokens/skills/tonic-ui-tokens/scripts/lookup-tokens.mjs --variable 'semantic:Color/text/primary'
node plugins/tonic-ui-tokens/skills/tonic-ui-tokens/scripts/lookup-tokens.mjs --token 'colors.text.primary'
```

Report which endpoints, sources, modes and evidence were reviewed; which records remain stale or unreviewed; and the actual checks and results. Do not disclose private locations, file keys or raw captures. No commit, push or publication is authorized by this procedure alone.
