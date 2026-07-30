#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../../.."  # repo root

work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT

bare_remote="$work/remote.git"
git init --quiet --bare "$bare_remote"

staging="$work/staging"
mkdir -p "$staging/packages/react"
echo '{"name":"@tonic-ui/react"}' > "$staging/packages/react/package.json"

bash scripts/pr-preview/publish-to-branch.sh "$staging" "$bare_remote" "pr-999" "chore: preview for PR #999"

checkout="$work/checkout"
git clone --quiet --branch pr-999 "$bare_remote" "$checkout"

if [ ! -f "$checkout/packages/react/package.json" ]; then
  echo "FAIL: expected packages/react/package.json in pushed branch"
  exit 1
fi

log_count=$(git -C "$checkout" log --oneline | wc -l)
if [ "$log_count" -ne 1 ]; then
  echo "FAIL: expected exactly 1 commit on orphan branch, found $log_count"
  exit 1
fi

# Re-publish with different content: branch must be replaced, not appended to.
rm -rf "$staging"
mkdir -p "$staging/packages/react-base"
echo '{"name":"@tonic-ui/react-base"}' > "$staging/packages/react-base/package.json"

bash scripts/pr-preview/publish-to-branch.sh "$staging" "$bare_remote" "pr-999" "chore: preview for PR #999 (update)"

rm -rf "$checkout"
git clone --quiet --branch pr-999 "$bare_remote" "$checkout"

if [ -f "$checkout/packages/react/package.json" ]; then
  echo "FAIL: stale content from the previous push should not survive an orphan re-push"
  exit 1
fi

if [ ! -f "$checkout/packages/react-base/package.json" ]; then
  echo "FAIL: expected packages/react-base/package.json after update"
  exit 1
fi

log_count=$(git -C "$checkout" log --oneline | wc -l)
if [ "$log_count" -ne 1 ]; then
  echo "FAIL: expected exactly 1 commit after update, found $log_count"
  exit 1
fi

echo "PASS"
