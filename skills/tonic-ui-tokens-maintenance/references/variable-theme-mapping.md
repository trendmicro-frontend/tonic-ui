# Variable-to-theme relation report and review

Use the report route to inspect local coverage. The review route is only for an
authorized, scoped review of named Figma variables or theme paths. Consumer questions
use the delivered `tonic-ui-tokens` lookup. Repository paths are root-relative.

## Generate a classified report

From the repository root:

```bash
node plugins/tonic-ui-tokens/scripts/report-token-relations.mjs
node plugins/tonic-ui-tokens/scripts/report-token-relations.mjs --help
node plugins/tonic-ui-tokens/scripts/report-token-relations.mjs > "$TMPDIR/tonic-tonic-ui-relations.md"
```

The first command writes deterministic Markdown to stdout without creating a file;
redirect explicitly only when a file is wanted. It uses the local theme and Figma
variable snapshots and the partial `token-relations.json` ledger, not live Figma. It
does not capture, change assets or authorize a relation review. The shipped Tonic UI
ledger is empty, so all captured endpoints are unreviewed.

The sections are **Mapped**, **Stale reviews**, **Reviewed Figma-only**, **Reviewed
theme-only**, **Unreviewed Figma variables**, and **Unreviewed theme tokens**, in that
order. A current negative review is a scoped reviewed absence; unreviewed means no review,
not absence. A stale review keeps its original status and evidence but is not a current
counterpart. Counts are rows, not distinct endpoints: every review is included, so an
endpoint with multiple reviews appears multiple times. Unreviewed endpoints appear once.
Groups use Figma library/collection or theme scale, with missing endpoints identified.

The report can contain internal token names or review reasons. Do not publish it without
authorization, and remove only the temporary output you created when no longer needed.
See the [script guide](../../../scripts/README.md#token-relations-report) for details.

## Establish review evidence

1. Identify named variables by library and stable key and implemented theme paths. Read
   the exact captured records in
   `plugins/tonic-ui-tokens/skills/tonic-ui-tokens/assets/figma-variables/{foundations,semantic}.json`
   and theme records in `assets/tokens.json` under the same skill directory.
2. Use authored Figma `codeSyntax`, semantic role and description as evidence; use mode
   values and alias identities only as corroboration, never as an automatic name, RGB or
   value-equality join. A reviewed relation states correspondence, not universal equality.
3. For each supported pair record only modes actually checked. A mode map connects an
   existing Figma mode to one or more existing theme modes. These location-redacted
   captures retain Tonic One v4 names and modes, whose applicability to Tonic UI v3 is
   unverified. Require direct evidence for the exact v3 endpoint and modes; never import
   upstream v4 reviews. Either endpoint can have multiple reviews.

The ledger's coverage is `partial`. An entry is `mapped`, `figma-only`, or `theme-only`;
an endpoint with no review is unreviewed, not absent. An absence review covers the entire
endpoint across captured modes and both named libraries plus the current theme snapshot.
Add one only after checking that complete scope and stating it in the reason.

## Update only reviewed records

Include a real `reviewedAt` date (`YYYY-MM-DD`), a specific nonempty `reason`, and a
`sourceRows` array. Existing source rows are historical citations and must remain
verbatim unless an authorized review changes them; they are not checked against a
maintained alias table or evidence of current wiki content. Each citation has a nonempty
`figma` string, a nonempty string or positive safe integer `contentId`, a positive safe
integer `version`, and a nonempty string or positive safe integer `row`. The array can
be empty for independently inspected authored Figma evidence. A mapped record requires
both endpoints and a nonempty `modeMap`; absence records have one null endpoint and no
mode map.

Compute snapshot digests using the delivered read-only `relationSnapshotDigests` helper,
not a separate hashing convention. Select an existing reviewed record's array index;
the shipped empty ledger has no index until an authorized review is recorded:

```bash
RELATION_INDEX=0 node --input-type=module <<'NODE'
import { readFile } from 'node:fs/promises';
import { relationSnapshotDigests } from './plugins/tonic-ui-tokens/skills/tonic-ui-tokens/scripts/variable-relations.mjs';
const root = 'plugins/tonic-ui-tokens/skills/tonic-ui-tokens/assets';
const load = async (path) => JSON.parse(await readFile(path, 'utf8'));
const [inventory, relations, foundations, semantic] = await Promise.all([
  load(`${root}/tokens.json`), load(`${root}/token-relations.json`),
  load(`${root}/figma-variables/foundations.json`), load(`${root}/figma-variables/semantic.json`),
]);
const relation = relations.variableRelations[Number(process.env.RELATION_INDEX)];
if (!relation) throw new Error('Select an existing reviewed relation index');
console.log(JSON.stringify(relationSnapshotDigests(relation, inventory, [foundations, semantic]), null, 2));
NODE
```

For a new review, add checked endpoints and evidence locally first, then record the
helper's `evidence.snapshots`. Mapped reviews digest their exact variable and token
records; negative reviews digest the theme inventory and both variable-library
inventories. Citation metadata alone does not change endpoint digests.

A stale relation retains its original review and evidence until an authorized reviewer
inspects affected endpoints and modes. Replace evidence and digests only after review.
If evidence is insufficient, report validation as incomplete; do not bulk-repin.
Capture or regeneration does not authorize reviewing relations or changing theme source.

## Validate and report a review

Run `node plugins/tonic-ui-tokens/scripts/validate-tokens.mjs` and the affected tests
named in [Figma variable capture](figma-variable-capture.md). Query reviewed endpoints
with the consumer matcher and inspect exact mode maps and separate implementation and
design values:

```bash
node plugins/tonic-ui-tokens/skills/tonic-ui-tokens/scripts/lookup-tokens.mjs --figma-variable 'semantic:Color/text/primary'
node plugins/tonic-ui-tokens/skills/tonic-ui-tokens/scripts/lookup-tokens.mjs --theme-token 'colors.text.primary'
```

Report endpoints, sources, modes and evidence reviewed, stale/unreviewed records, and
actual checks and results. Do not disclose private locations, file keys or raw captures.
No commit, push or publication is authorized by this procedure alone.
