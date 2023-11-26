#!/bin/bash

set -o allexport; source .env; set +o allexport

list="RESOURCE_GROUP LOCATION"
for var in $list; do
  if [ -z "${!var}" ]; then
    echo "Please specify $var in the `.env` file"
    exit 1
  fi
done

# Create an Azure resource group
echo "Creating resource group $RESOURCE_GROUP in $LOCATION"
az group create \
  --name $RESOURCE_GROUP \
  --location $LOCATION
