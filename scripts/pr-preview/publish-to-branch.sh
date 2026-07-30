#!/usr/bin/env bash
set -euo pipefail

# Usage: publish-to-branch.sh <staging-dir> <remote-url> <branch> <commit-message>
# Turns <staging-dir> into a single orphan commit and force-pushes it to
# <branch> on <remote-url>. Never clones the remote -- each call replaces
# the branch's entire history with one fresh commit.

if [ "$#" -ne 4 ]; then
  echo "Usage: $0 <staging-dir> <remote-url> <branch> <commit-message>" >&2
  exit 1
fi

staging_dir="$1"
remote_url="$2"
branch="$3"
message="$4"

abs_staging_dir="$(cd "$staging_dir" && pwd)"

git -C "$abs_staging_dir" init --quiet -b "$branch"
git -C "$abs_staging_dir" config user.name "github-actions[bot]"
git -C "$abs_staging_dir" config user.email "github-actions[bot]@users.noreply.github.com"
git -C "$abs_staging_dir" add -A
git -C "$abs_staging_dir" commit --quiet -m "$message"
git -C "$abs_staging_dir" push --force "$remote_url" "HEAD:refs/heads/$branch"
