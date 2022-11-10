#!/bin/sh

MAIN_BRANCH=master
PR_BRANCH=feat/lockfile-maintenance-ci-job-$(date +"%m-%d-%Y")
OWNER=trendmicro-frontend
REPO=tonic-ui
BODY='{"head":''"'${PR_BRANCH}'"'',"base":"master","title":"ci: weekly lockfile maintenance"}'

git checkout $MAIN_BRANCH
git checkout -b $PR_BRANCH
rm -f yarn.lock # remove yarn.lock file instead of using "yarn up" to ensure that the lockfile is generated from scratch
yarn install
git add yarn.lock
git commit -m "ci: weekly lockfile maintenance"
git push --set-upstream origin $PR_BRANCH
curl \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer ${GH_TOKEN}" \
  -d "$BODY" \
  https://api.github.com/repos/$OWNER/$REPO/pulls
