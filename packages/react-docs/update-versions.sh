#!/bin/bash

TONIC_UI_VARS=$(env | grep "TONIC_UI_"  | cut -d "=" -f 1)

cp -f pages/versions.mdx.template pages/versions.mdx

for var in $TONIC_UI_VARS; do
  sed -i'.bak' -e "s|__${var}__|${!var}|g" pages/versions.mdx
  rm -f pages/versions.mdx.bak
done
