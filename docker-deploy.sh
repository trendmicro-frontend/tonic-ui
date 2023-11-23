#!/usr/bin/env bash

set -o allexport; source .dockerenv; set +o allexport

if [ -z "$ACR_USERNAME" ]; then
  echo 'Please specify ACR_USERNAME in the `.dockerenv` file'
  exit 1
fi
if [ -z "$ACR_CREDENTIAL" ]; then
  echo 'Please specify ACR_CREDENTIAL in the `.dockerenv` file'
  exit 1
fi

TEAM_ID="tonic-one"
TAG=${1:-latest}

echo "Deploying to prelim environment: ${TEAM_ID}:${TAG}"

docker login -u ${ACR_USERNAME} -p ${ACR_CREDENTIAL} ${ACR_USERNAME}.azurecr.io
docker push ${ACR_USERNAME}.azurecr.io/${TEAM_ID}:${TAG}
