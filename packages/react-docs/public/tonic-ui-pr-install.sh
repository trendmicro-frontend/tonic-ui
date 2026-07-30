#!/usr/bin/env bash
# Tonic UI preview installer.
#
# Sets up Yarn Berry, wires the current project to install @tonic-ui/*
# packages from a tonic-ui-previews PR branch, and (optionally) runs the
# install right away.
#
# Usage:
#   curl -fsSL <docs-host>/tonic-ui-pr-install.sh | bash -s -- <pr-number>
#   wget -qO- <docs-host>/tonic-ui-pr-install.sh | bash -s -- <pr-number>
#
# Run with no PR number to only set up the project (no install performed).

set -euo pipefail

REPO_URL="https://github.com/trendmicro-frontend/tonic-ui-previews.git"
PR_NUMBER="${1:-}"

if [ -n "$PR_NUMBER" ] && ! [[ "$PR_NUMBER" =~ ^[0-9]+$ ]]; then
  echo "Usage: tonic-ui-pr-install.sh [pr-number]" >&2
  exit 1
fi

command -v node >/dev/null 2>&1 || { echo "node is required. Install Node.js first: https://nodejs.org"; exit 1; }
command -v git >/dev/null 2>&1 || { echo "git is required. Install git first."; exit 1; }

if ! command -v yarn >/dev/null 2>&1; then
  if command -v corepack >/dev/null 2>&1; then
    echo "Enabling corepack to provide yarn..."
    corepack enable
  else
    echo "yarn is required and no corepack was found to provision it." >&2
    echo "Install Node.js 16.10+ (ships with corepack) or yarn manually, then re-run this script." >&2
    exit 1
  fi
fi

if [ ! -f package.json ]; then
  echo "No package.json found, creating one..."
  yarn init -y
fi

echo "Upgrading Yarn to the latest stable release..."
yarn set version stable

YARNRC=".yarnrc.yml"
touch "$YARNRC"
grep -q '^nodeLinker:' "$YARNRC" || echo 'nodeLinker: node-modules' >> "$YARNRC"
if ! grep -q "$REPO_URL" "$YARNRC"; then
  if grep -q '^approvedGitRepositories:' "$YARNRC"; then
    printf '  - "%s"\n' "$REPO_URL" >> "$YARNRC"
  else
    {
      echo 'approvedGitRepositories:'
      printf '  - "%s"\n' "$REPO_URL"
    } >> "$YARNRC"
  fi
fi

if [ ! -f yarn.lock ]; then
  echo "Running initial yarn install..."
  yarn install
fi

mkdir -p scripts
cat > scripts/update-tonic-ui-pr.js << 'JSEOF'
#!/usr/bin/env node

// Upgrades Yarn to the latest stable release, regenerates the @tonic-ui/*
// `dependencies` and `resolutions` entries in package.json to point at a
// tonic-ui-previews PR branch (pr-<number>), then runs `yarn install`.
//
// Usage: node scripts/update-tonic-ui-pr.js <pr-number>

const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const REPO_URL = 'https://github.com/trendmicro-frontend/tonic-ui-previews.git';
const SCOPE = '@tonic-ui';

function run(cmd, args, opts = {}) {
  execFileSync(cmd, args, { stdio: 'inherit', ...opts });
}

function withoutScope(obj = {}, scope) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (!key.startsWith(`${scope}/`)) result[key] = value;
  }
  return result;
}

// yarn.lock pins git `head=` deps to the commit they resolved to. If the same
// PR branch text is still in package.json (no descriptor change), yarn install
// trusts the existing lockfile entry and won't notice new commits pushed to
// the branch. Drop those entries so install is forced to re-resolve them.
function pruneLockfileEntries(lockfilePath, descriptors) {
  if (!fs.existsSync(lockfilePath)) return;
  const blocks = fs.readFileSync(lockfilePath, 'utf8').split('\n\n');
  const kept = blocks.filter((block) => {
    const headerLine = block.split('\n', 1)[0];
    return !descriptors.some((descriptor) => headerLine.includes(descriptor));
  });
  fs.writeFileSync(lockfilePath, kept.join('\n\n'));
}

function main() {
  const prNumber = process.argv[2];
  if (!prNumber || !/^\d+$/.test(prNumber)) {
    console.error('Usage: node scripts/update-tonic-ui-pr.js <pr-number>');
    process.exit(1);
  }
  const branch = `pr-${prNumber}`;

  console.log('Upgrading Yarn to the latest stable release...');
  run('yarn', ['set', 'version', 'stable']);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tonic-ui-previews-'));
  let pkgNames;
  try {
    run('git', ['clone', '--no-checkout', '--depth', '1', '--filter=blob:none', '--branch', branch, REPO_URL, tmpDir]);
    run('git', ['sparse-checkout', 'init', '--cone'], { cwd: tmpDir });
    run('git', ['sparse-checkout', 'set', 'packages'], { cwd: tmpDir });
    run('git', ['checkout', branch], { cwd: tmpDir });

    const packagesDir = path.join(tmpDir, 'packages');
    pkgNames = fs.readdirSync(packagesDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => {
        const pkgJsonPath = path.join(packagesDir, entry.name, 'package.json');
        if (!fs.existsSync(pkgJsonPath)) return null;
        return JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8')).name;
      })
      .filter((name) => name && name.startsWith(`${SCOPE}/`))
      .sort();
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }

  if (!pkgNames || pkgNames.length === 0) {
    console.error(`No ${SCOPE}/* packages found under packages/* on branch ${branch}`);
    process.exit(1);
  }

  const entries = {};
  for (const name of pkgNames) {
    entries[name] = `${REPO_URL}#workspace=${name}&head=${branch}`;
  }

  const pkgJsonPath = path.join(__dirname, '..', 'package.json');
  const rootPkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));

  rootPkg.dependencies = { ...withoutScope(rootPkg.dependencies, SCOPE), ...entries };
  rootPkg.resolutions = { ...withoutScope(rootPkg.resolutions, SCOPE), ...entries };

  fs.writeFileSync(pkgJsonPath, JSON.stringify(rootPkg, null, 2) + '\n');

  console.log(`\nUpdated ${pkgNames.length} ${SCOPE}/* package(s) to ${branch}:`);
  pkgNames.forEach((name) => console.log(`  - ${name}`));

  const lockfilePath = path.join(__dirname, '..', 'yarn.lock');
  pruneLockfileEntries(lockfilePath, Object.values(entries));

  console.log('\nRunning yarn install...');
  run('yarn', ['install']);
}

main();
JSEOF

node -e '
const fs = require("fs");
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
pkg.scripts = pkg.scripts || {};
pkg.scripts["tonic-ui:pr"] = "node scripts/update-tonic-ui-pr.js";
fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2) + "\n");
'

echo "Done. Added scripts/update-tonic-ui-pr.js and the \"tonic-ui:pr\" package.json script."

if [ -n "$PR_NUMBER" ]; then
  echo "Installing @tonic-ui/* from pr-$PR_NUMBER..."
  yarn tonic-ui:pr "$PR_NUMBER"
else
  echo "Run 'yarn tonic-ui:pr <pr-number>' to install @tonic-ui/* packages from a PR branch."
fi
