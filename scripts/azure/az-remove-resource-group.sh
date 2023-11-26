#!/bin/bash

set -o allexport; source .env; set +o allexport

list="RESOURCE_GROUP LOCATION"
for var in $list; do
  if [ -z "${!var}" ]; then
    echo "Please specify $var in the `.env` file"
    exit 1
  fi
done

RESOURCE_GROUP_EXISTS=$(az group exists --name ${RESOURCE_GROUP})
if [ "$RESOURCE_GROUP_EXISTS" = "false" ]; then
  echo "Resource group $RESOURCE_GROUP does not exist"
  exit 1
fi

echo "Deleting resource group $RESOURCE_GROUP in $LOCATION"
az group delete \
  --name $RESOURCE_GROUP \
  --no-wait \
  --verbose
