#!/bin/bash

set -o allexport; source .env; set +o allexport

list="CONTAINER_APP_ENVIRONMENT RESOURCE_GROUP LOCATION"
for var in $list; do
  if [ -z "${!var}" ]; then
    echo "Please specify $var in the `.env` file"
    exit 1
  fi
done

# Create a Container Apps environment
echo "Creating Container Apps environment ($CONTAINER_APP_ENVIRONMENT)"
az containerapp env create \
  --name $CONTAINER_APP_ENVIRONMENT \
  --resource-group $RESOURCE_GROUP \
  --location "$LOCATION"
