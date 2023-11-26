#!/bin/bash

set -o allexport; source .env; set +o allexport

list="SUBSCRIPTION_NAME"
for var in $list; do
  if [ -z "${!var}" ]; then
    echo "Please specify $var in the `.env` file"
    exit 1
  fi
done

# https://learn.microsoft.com/zh-tw/cli/azure/manage-azure-subscriptions-azure-cli
SUBSCRIPTION_ID="$(az account list --query "[?name=='${SUBSCRIPTION_NAME}'].id" --output tsv)"

echo "Setting subscription to $SUBSCRIPTION_NAME ($SUBSCRIPTION_ID)"
az account set --subscription $SUBSCRIPTION_ID
