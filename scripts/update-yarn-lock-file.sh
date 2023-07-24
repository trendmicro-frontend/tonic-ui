#!/bin/sh

MAIN_BRANCH=master
PR_BRANCH=ci/update-yarn-lock-file-$(date +"%m-%d-%Y")
OWNER=trendmicro-frontend
REPO=tonic-ui
BODY='{"head":''"'${PR_BRANCH}'"'',"base":"master","title":"ci: update yarn.lock file"}'

git checkout $MAIN_BRANCH
yarn up
git add yarn.lock
if [ `git status -s --untracked-files=no | wc -l` -eq 0 ]; then
  exit 0
fi
git checkout -b $PR_BRANCH
git commit -m "ci: update yarn.lock file"
git push --set-upstream origin $PR_BRANCH
curl \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer ${GITHUB_TOKEN}" \
  -d "$BODY" \
  https://api.github.com/repos/$OWNER/$REPO/pulls
