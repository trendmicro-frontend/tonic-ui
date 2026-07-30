#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../../.."  # repo root

work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT

fixture_root="$work/fixture-repo"
mkdir -p "$fixture_root/packages/foo/dist"
cat > "$fixture_root/packages/foo/package.json" <<'JSON'
{
  "name": "@tonic-ui/foo",
  "version": "1.0.0",
  "main": "dist/index.js",
  "files": ["dist"],
  "dependencies": { "lodash": "^4.0.0" },
  "devDependencies": { "jest": "^29.0.0" }
}
JSON
echo "module.exports = {};" > "$fixture_root/packages/foo/dist/index.js"

mkdir -p "$fixture_root/packages/bar"
cat > "$fixture_root/packages/bar/package.json" <<'JSON'
{ "name": "@tonic-ui/bar", "version": "1.0.0", "private": true }
JSON

staging="$work/staging"
bash scripts/pr-preview/assemble-packages.sh "$staging" "$fixture_root"

if [ ! -f "$staging/package.json" ]; then
  echo "FAIL: expected root package.json in staging dir"
  exit 1
fi

if [ -d "$staging/packages/bar" ]; then
  echo "FAIL: private package bar should not be assembled"
  exit 1
fi

if [ ! -f "$staging/packages/foo/dist/index.js" ]; then
  echo "FAIL: expected packages/foo/dist/index.js to be copied"
  exit 1
fi

if jq -e 'has("devDependencies")' "$staging/packages/foo/package.json" >/dev/null; then
  echo "FAIL: devDependencies should be stripped from the assembled manifest"
  exit 1
fi

if [ "$(jq -r '.name' "$staging/packages/foo/package.json")" != "@tonic-ui/foo" ]; then
  echo "FAIL: expected name to be preserved"
  exit 1
fi

# Guard: fail loudly if a package's declared files never got built.
all_private_root="$work/fixture-repo-unbuilt"
mkdir -p "$all_private_root/packages/bar"
cp "$fixture_root/packages/bar/package.json" "$all_private_root/packages/bar/package.json"

if bash scripts/pr-preview/assemble-packages.sh "$work/staging-empty" "$all_private_root" 2>/dev/null; then
  echo "FAIL: expected assemble-packages.sh to fail when no packages are copied"
  exit 1
fi

echo "PASS"
