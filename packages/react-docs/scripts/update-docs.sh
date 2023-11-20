#!/bin/bash

readonly SCRIPT_PATH=`cd $(dirname $0);pwd`
readonly ROOT_PATH=$(cd ${SCRIPT_PATH}/..; pwd)

node ${SCRIPT_PATH}/update-style-props.mjs \
  ${ROOT_PATH}/pages/styled-system/style-props/index.page.mdx.template \
  ${ROOT_PATH}/pages/styled-system/style-props/index.page.mdx

node ${SCRIPT_PATH}/update-pseudo-style-props.mjs \
  ${ROOT_PATH}/pages/styled-system/pseudo-style-props/index.page.mdx.template \
  ${ROOT_PATH}/pages/styled-system/pseudo-style-props/index.page.mdx

node ${SCRIPT_PATH}/update-tonic-ui-vars.mjs \
  ${ROOT_PATH}/pages/getting-started/versions/index.page.mdx.template \
  ${ROOT_PATH}/pages/getting-started/versions/index.page.mdx
