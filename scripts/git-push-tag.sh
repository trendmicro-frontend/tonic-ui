#!/bin/bash

# Check if both TAG and COMMIT are provided
if [ -z "$1" ] || [ -z "$2" ]; then
  echo "Usage: $0 <tag> <commit>"
  exit 1
fi

TAG=$1
COMMIT=$2

# Confirm action with the user
read -p "Are you sure you want to push the tag '$TAG' (commit: $COMMIT) to the origin? (y/n): " confirm

if [[ $confirm != [yY] ]]; then
  echo "Operation cancelled."
  exit 1
fi

# Force update the tag and push it to the origin
git tag -f $TAG $COMMIT
git push origin $TAG

echo "Tag '$TAG' updated to commit '$COMMIT' and pushed to origin."
