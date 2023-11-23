#!/usr/bin/env bash

#set -o allexport; source .env; set +o allexport

#if [ -z "$TEAM_ID" ]; then
#  echo 'Please specify TEAM_ID in the `.env` file'
#  exit 1
#fi

TEAM_ID="tonic-one"
TAG=${1:-latest}

echo "Building Docker image: ${TEAM_ID}:${TAG}"

#docker builder prune
#docker image prune -a -f

docker build \
  -t ${TEAM_ID}:${TAG} \
  -f Dockerfile .
