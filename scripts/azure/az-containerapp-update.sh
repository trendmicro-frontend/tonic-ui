#!/bin/bash

set -o allexport; source .env; set +o allexport

list="ACR_HOST_NAME APP_NAME CONTAINER_APP_NAME CONTAINER_APP_ENVIRONMENT RESOURCE_GROUP"
for var in $list; do
  if [ -z "${!var}" ]; then
    echo "Please specify $var in the `.env` file"
    exit 1
  fi
done

REGISTRY_SERVER="$ACR_HOST_NAME.azurecr.io"
REPO_NAME="$APP_NAME"

# Deploy your image to a container app
echo "Deploying image ($REGISTRY_SERVER/$REPO_NAME) to container app ($CONTAINER_APP_NAME)"
az containerapp update \
  --name $CONTAINER_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --image $REGISTRY_SERVER/$REPO_NAME:latest
