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

TAG=${1:-latest}

echo "Building Docker image: ${REPO_NAME}:${TAG}"

#docker builder prune
docker image prune -a -f

docker build \
  -t ${REPO_NAME}:${TAG} \
  -t ${ACR_USERNAME}.azurecr.io/${REPO_NAME}:${TAG} \
  -f Dockerfile .
