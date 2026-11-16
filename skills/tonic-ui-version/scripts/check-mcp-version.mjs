#!/usr/bin/env node
/**
 * Verify the MCP documentation version label agrees with the registry.
 *
 * The label in `tonic-ui-version.config.js` is the source of truth. This checks
 * the MCP config, documentation examples, llms.txt and README version table. It
 * does not check the MCP package's semver.
 *
 * Exits 1 on any mismatch so it can gate a commit.
 */
import { execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveRepoRoot } from './repo-root.mjs';

const require = createRequire(import.meta.url);
const repoRoot = resolveRepoRoot(dirname(fileURLToPath(import.meta.url)));

const read = (rel) => readFileSync(join(repoRoot, rel), 'utf8');

const versionConfigPath = join(repoRoot, 'tonic-ui-version.config.js');
if (!existsSync(versionConfigPath)) {
  console.error(`Could not find tonic-ui-version.config.js at ${versionConfigPath}`);
  console.error('Run this from inside the tonic-ui repo.');
  process.exit(1);
}

const { versions } = require(versionConfigPath);

const git = (cmd) => execSync(`git ${cmd}`, { cwd: repoRoot, stdio: ['ignore', 'pipe', 'ignore'] })
  .toString()
  .trim();

let branch = '';
try {
  branch = git('rev-parse --abbrev-ref HEAD');
} catch {
  /* not a git checkout */
}

// Key "the entry that tracks main" off `branch: 'main'` rather than a flag: the
// registry schema differs across branches (main uses `prerelease: true`, the v2
// branch uses `stable: false`), but the branch name holds under both.
const mainEntry = versions.find((v) => v.branch === 'main');

// Resolving the expected label is the subtle part. CI names the line it validates
// through VALIDATION_BRANCH: on a branch push that's `github.ref_name`, on a PR it's
// `github.event.pull_request.base.ref`. Both workflows also accept suffixed release
// branches (`v2-stg`, `v2-alpha`, `v10-stg` -- see the globs and precheck regex in
// ci-branch.yml / ci-pr.yml). A suffix names a deployment target, not a release line,
// so it resolves to its `vN` prefix. Anything outside that grammar stays unknown.
//
// Locally we usually run on a feature branch (`feat/whatever-v2`), where an exact
// match fails -- and defaulting to main's label would flag every file on a v2-based
// branch. So when there's no exact or release-line match, find which release line
// HEAD actually descends from.
const explicit = process.argv.find((a) => a.startsWith('--label='))?.split('=')[1];

// `v2` -> `v2`; `v2-stg` / `v10-alpha` -> `v2` / `v10`. Everything else -> null.
const releaseLine = (name) => /^(v[1-9][0-9]*)(?:-.+)?$/.exec(name)?.[1] ?? null;

// Exact registry branch first, then the release line of a suffixed branch. Returning
// `exact` lets the caller report which of the two matched.
const lookupBranch = (name) => {
  const exact = versions.find((v) => v.branch === name);
  if (exact) return { entry: exact, exact: true };
  const line = releaseLine(name);
  const entry = line === null ? undefined : versions.find((v) => v.branch === line);
  return entry ? { entry, exact: false } : null;
};

const resolve_ = () => {
  if (explicit) {
    const entry = versions.find((v) => v.label === explicit);
    if (!entry) {
      console.error(`--label=${explicit} does not match any label in the registry.`);
      process.exit(1);
    }
    return { entry, how: 'explicit --label' };
  }

  if (process.env.VALIDATION_BRANCH !== undefined) {
    const requested = process.env.VALIDATION_BRANCH;
    const match = lookupBranch(requested);
    if (!match) {
      console.error(`Unknown validation branch: ${requested}`);
      process.exit(1);
    }
    return {
      entry: match.entry,
      how: match.exact ? 'VALIDATION_BRANCH' : `VALIDATION_BRANCH ${requested} -> release line ${match.entry.branch}`,
    };
  }

  const local = lookupBranch(branch);
  if (local) {
    return {
      entry: local.entry,
      how: local.exact ? 'exact branch match' : `release line ${branch} -> ${local.entry.branch}`,
    };
  }

  // A release branch that is an ancestor of HEAD is a line HEAD descends from.
  // main and the maintenance branches have diverged, so at most one matches.
  const descendsFrom = versions.filter((v) => {
    for (const ref of [`origin/${v.branch}`, v.branch]) {
      try {
        git(`merge-base --is-ancestor ${ref} HEAD`);
        return true;
      } catch {
        /* not an ancestor, or ref missing */
      }
    }
    return false;
  });

  if (descendsFrom.length === 1) {
    return { entry: descendsFrom[0], how: `descends from ${descendsFrom[0].branch}` };
  }
  if (descendsFrom.length > 1) {
    console.error(
      `Ambiguous: HEAD descends from multiple release branches (${descendsFrom.map((v) => v.branch).join(', ')}).`
    );
    console.error('Re-run with --label=<vN> to say which line this branch belongs to.');
    process.exit(1);
  }

  return { entry: mainEntry, how: 'fallback: entry tracking main' };
};

const { entry: expectedEntry, how } = resolve_();

if (!expectedEntry) {
  console.error(`Could not resolve a version for branch "${branch}", and no registry entry tracks main.`);
  console.error('Re-run with --label=<vN>.');
  process.exit(1);
}

const expected = expectedEntry.label;
const isPrerelease = expectedEntry.prerelease === true || expectedEntry.stable === false;

// Each check pulls the label out of one file. `find` returns the label it found,
// or null when the pattern is missing entirely (which is itself a failure worth
// reporting -- it means the file was restructured and this checker went blind).
const checks = [
  {
    file: 'tonic-ui-mcp.config.js',
    note: 'the config the MCP server actually loads',
    find: (s) => s.match(/version:\s*'([^']+)'/)?.[1] ?? null,
  },
  {
    file: 'packages/react-docs/pages/llms.txt',
    note: 'llms.txt heading',
    find: (s) => s.split('\n')[0].match(/^#\s*@tonic-ui\/react\s+(\S+)/)?.[1] ?? null,
  },
  {
    file: 'packages/react-docs/pages/getting-started/mcp/index.page.mdx',
    note: 'sample-config snippet (copy of the root config)',
    find: (s) => s.match(/version:\s*'([^']+)'/)?.[1] ?? null,
  },
  {
    file: 'packages/mcp/README.md',
    note: 'sample-config snippet (copy of the root config)',
    find: (s) => s.match(/version:\s*'([^']+)'/)?.[1] ?? null,
  },
];

console.log(`branch:          ${branch || '(unknown)'}`);
console.log(`expected label:  ${expected}${isPrerelease ? '  (prerelease)' : ''}   [${how}]`);
console.log(`registry:        ${versions.map((v) => `${v.label}->${v.branch}`).join(', ')}\n`);

let failed = 0;

for (const { file, note, find } of checks) {
  if (!existsSync(join(repoRoot, file))) {
    failed += 1;
    console.log(`  x  ${file} — required file not found at ${join(repoRoot, file)} (${note})`);
    continue;
  }
  const found = find(read(file));
  if (found === null) {
    failed += 1;
    console.log(`  !  ${file} — no version literal found; pattern may have moved (${note})`);
  } else if (found !== expected) {
    failed += 1;
    console.log(`  x  ${file} — found "${found}", expected "${expected}"  (${note})`);
  } else {
    console.log(`  ok ${file}`);
  }
}

// README's version table is prose, so check it more loosely: the expected label
// needs a row, and the required "(current)" marker should sit on the label main builds.
const readmePath = join(repoRoot, 'README.md');
if (!existsSync(readmePath)) {
  failed += 1;
  console.log(`  x  README.md — required file not found at ${readmePath}`);
} else {
  const readme = read('README.md');
  const currentMarker = readme.match(/^(\S+)\s*\(current\)/m)?.[1] ?? null;
  const mainLabel = mainEntry?.label ?? expected;

  if (!new RegExp(`^${expected}\\b`, 'm').test(readme)) {
    failed += 1;
    console.log(`  x  README.md — no version-table row for "${expected}"`);
  } else if (!currentMarker) {
    failed += 1;
    console.log(
      `  x  README.md — required "(current)" marker not found; expected a version-table line "${mainLabel} (current)"`
    );
  } else if (currentMarker !== mainLabel) {
    failed += 1;
    console.log(
      `  x  README.md — "(current)" marker says "${currentMarker}" but the registry labels main "${mainLabel}"; ` +
        'reconcile the two (on a maintenance branch the registry is often the stale one, so check both)'
    );
  } else {
    console.log('  ok README.md');
  }
}

console.log(
  failed === 0
    ? '\nAll version labels are in sync.'
    : `\n${failed} mismatch(es). Fix these before committing — see SKILL.md steps 3 and 4.`
);

process.exit(failed === 0 ? 0 : 1);
