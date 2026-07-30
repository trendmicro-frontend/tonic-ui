#!/usr/bin/env bash
set -euo pipefail

# Usage: list-packages.sh [repo-root]
# Prints one line per non-private package under packages/*, tab-separated:
#   <npm-name>\t<packages-dir-name>
# repo-root defaults to the real repo root; pass it explicitly in tests.

repo_root="${1:-"$(cd "$(dirname "$0")/../.." && pwd)"}"

for pkg_json in "$repo_root"/packages/*/package.json; do
  dir="$(basename "$(dirname "$pkg_json")")"
  private=$(jq -r '.private // false' "$pkg_json")
  if [ "$private" = "true" ]; then
    continue
  fi
  name=$(jq -r '.name' "$pkg_json")
  printf '%s\t%s\n' "$name" "$dir"
done
