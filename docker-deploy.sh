#!/usr/bin/env bash

set -o allexport; source .dockerenv; set +o allexport

if [ -z "$REPO_NAME" ]; then
  echo 'Please specify REPO_NAME in the `.dockerenv` file'
  exit 1
fi
if [ -z "$ACR_USERNAME" ]; then
  echo 'Please specify ACR_USERNAME in the `.dockerenv` file'
  exit 1
fi
if [ -z "$ACR_CREDENTIAL" ]; then
  echo 'Please specify ACR_CREDENTIAL in the `.dockerenv` file'
  exit 1
fi

TAG=${1:-latest}

echo "Deploying to prelim environment: ${REPO_NAME}:${TAG}"

docker login -u ${ACR_USERNAME} -p ${ACR_CREDENTIAL} ${ACR_USERNAME}.azurecr.io
docker push ${ACR_USERNAME}.azurecr.io/${REPO_NAME}:${TAG}
