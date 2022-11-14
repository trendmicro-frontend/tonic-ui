#!/bin/sh

MAIN_BRANCH=master
PR_BRANCH=ci/regular-lockfile-maintenance-$(date +"%m-%d-%Y")
OWNER=trendmicro-frontend
REPO=tonic-ui
BODY='{"head":''"'${PR_BRANCH}'"'',"base":"master","title":"ci: regular lockfile maintenance"}'

git checkout $MAIN_BRANCH
git checkout -b $PR_BRANCH
yarn up
git add yarn.lock
git commit -m "ci: regular lockfile maintenance"
git push --set-upstream origin $PR_BRANCH
curl \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer ${GH_TOKEN}" \
  -d "$BODY" \
  https://api.github.com/repos/$OWNER/$REPO/pulls
