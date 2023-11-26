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
az containerapp create \
  --name $CONTAINER_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --environment $CONTAINER_APP_ENVIRONMENT \
  --image $REGISTRY_SERVER/$REPO_NAME \
  --target-port 80 \
  --ingress 'external' \
  --registry-server $REGISTRY_SERVER \
  --query properties.configuration.ingress.fqdn
