#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../../.."  # repo root

work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT

fixture_root="$work/fixture-repo"
mkdir -p "$fixture_root/packages/foo" "$fixture_root/packages/bar"

cat > "$fixture_root/packages/foo/package.json" <<'JSON'
{ "name": "@tonic-ui/foo", "version": "1.0.0" }
JSON

cat > "$fixture_root/packages/bar/package.json" <<'JSON'
{ "name": "@tonic-ui/bar", "version": "1.0.0", "private": true }
JSON

output=$(bash scripts/pr-preview/list-packages.sh "$fixture_root")

found_foo=$(echo "$output" | awk -F'\t' '$1=="@tonic-ui/foo" && $2=="foo" {print "yes"}')
if [ "$found_foo" != "yes" ]; then
  echo "FAIL: expected a well-formed @tonic-ui/foo entry, got:"
  echo "$output"
  exit 1
fi

if echo "$output" | awk -F'\t' '$1=="@tonic-ui/bar" {found=1} END{exit !found}'; then
  echo "FAIL: private package @tonic-ui/bar should be excluded"
  exit 1
fi

echo "PASS"
