#!/usr/bin/env bash
set -euo pipefail

# Usage: assemble-packages.sh <staging-dir> [repo-root]
# Builds a Yarn-workspaces monorepo skeleton under <staging-dir> containing
# every non-private package's trimmed manifest and the files listed in its
# "files" field. Built output must already exist on disk -- run
# `yarn build-public` before calling this script.

if [ "$#" -lt 1 ] || [ "$#" -gt 2 ]; then
  echo "Usage: $0 <staging-dir> [repo-root]" >&2
  exit 1
fi

staging_dir="$1"
script_dir="$(cd "$(dirname "$0")" && pwd)"
repo_root="${2:-"$(cd "$script_dir/../.." && pwd)"}"

rm -rf "$staging_dir"
mkdir -p "$staging_dir/packages"

cat > "$staging_dir/package.json" <<'JSON'
{
  "name": "tonic-ui-preview",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "packageManager": "yarn@4.17.1"
}
JSON

cat > "$staging_dir/.yarnrc.yml" <<'YAML'
nodeLinker: node-modules
YAML

copied_any=0
while IFS=$'\t' read -r name dir; do
  pkg_dir="$repo_root/packages/$dir"
  out_dir="$staging_dir/packages/$dir"
  mkdir -p "$out_dir"

  jq '{
    name: .name,
    version: .version,
    description: .description,
    main: .main,
    module: .module,
    types: .types,
    exports: .exports,
    bin: .bin,
    files: .files,
    sideEffects: .sideEffects,
    publishConfig: .publishConfig,
    dependencies: .dependencies,
    peerDependencies: .peerDependencies,
    license: .license,
    repository: .repository
  } | with_entries(select(.value != null))' "$pkg_dir/package.json" > "$out_dir/package.json"

  while IFS= read -r f; do
    src="$pkg_dir/$f"
    if [ -e "$src" ]; then
      mkdir -p "$(dirname "$out_dir/$f")"
      cp -a "$src" "$out_dir/$f"
      copied_any=1
    fi
  done < <(jq -r '(.files // ["dist"])[]' "$pkg_dir/package.json")

  echo "Assembled $name -> packages/$dir"
done < <(bash "$script_dir/list-packages.sh" "$repo_root")

if [ "$copied_any" -eq 0 ]; then
  echo "error: no package files were copied -- did you forget to run 'yarn build-public' first?" >&2
  exit 1
fi
