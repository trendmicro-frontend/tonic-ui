#!/usr/bin/env bash

set -o allexport; source .dockerenv; set +o allexport

if [ -z "$ACR_USERNAME" ]; then
  echo 'Please specify ACR_USERNAME in the `.dockerenv` file'
  exit 1
fi

TEAM_ID="tonic-one"
TAG=${1:-latest}

echo "Building Docker image: ${TEAM_ID}:${TAG}"

#docker builder prune
docker image prune -a -f

docker build \
  -t ${TEAM_ID}:${TAG} \
  -t ${ACR_USERNAME}.azurecr.io/${TEAM_ID}:${TAG} \
  -f Dockerfile .
