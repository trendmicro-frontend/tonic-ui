#!/bin/bash

TONIC_UI_VARS=$(env | grep "TONIC_UI_"  | cut -d "=" -f 1)

cp -f templates/versions.mdx.template pages/getting-started/versions.mdx

for var in $TONIC_UI_VARS; do
  sed -i'.bak' -e "s|__${var}__|${!var}|g" pages/getting-started/versions.mdx
  rm -f pages/getting-started/versions.mdx.bak
done
