#!/bin/bash

set -o allexport; source .env; set +o allexport

list="RESOURCE_GROUP ACR_HOST_NAME"
for var in $list; do
  if [ -z "${!var}" ]; then
    echo "Please specify $var in the `.env` file"
    exit 1
  fi
done

# Create an Azure Container Registry
echo "Creating Azure Container Registry"
az acr create \
  --resource-group $RESOURCE_GROUP \
  --name $ACR_HOST_NAME \
  --sku Basic \
  --admin-enabled true
