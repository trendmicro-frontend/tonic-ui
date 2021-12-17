#!/bin/bash

TONIC_UI_V1_TAGNAME=$(git tag --list '@tonic-ui/react@0.*' --sort="-version:refname" | head -n 1)
TONIC_UI_V1_RELEASE_VERSION=$(echo $TONIC_UI_V1_TAGNAME | awk -F@ '{ print $3 }')
TONIC_UI_V1_RELEASE_DOCUMENTATION=https://trendmicro-frontend.github.io/tonic-ui/react/${TONIC_UI_V1_RELEASE_VERSION}
TONIC_UI_V1_RELEASE_NOTES=https://github.com/trendmicro-frontend/tonic-ui/releases/tag/${TONIC_UI_V1_TAGNAME}

TONIC_UI_V0_TAGNAME=$(git tag --list '@trendmicro/react-styled-ui@0.*' --sort="-version:refname" | head -n 1)
TONIC_UI_V0_RELEASE_VERSION=$(echo $TONIC_UI_V0_TAGNAME | awk -F@ '{ print $3 }')
TONIC_UI_V0_RELEASE_DOCUMENTATION=https://trendmicro-frontend.github.io/tonic-ui/react/${TONIC_UI_V0_RELEASE_VERSION}
TONIC_UI_V0_RELEASE_NOTES=https://github.com/trendmicro-frontend/tonic-ui/releases/tag/${TONIC_UI_V0_TAGNAME}

TONIC_UI_MAIN_BRANCH_NAME=master
TONIC_UI_MAIN_BRANCH_DOCUMENTATION=https://trendmicro-frontend.github.io/tonic-ui
TONIC_UI_MAIN_BRANCH_SOURCE_CODE=https://github.com/trendmicro-frontend/tonic-ui/tree/${TONIC_UI_MAIN_BRANCH_NAME}

sed "s|__TONIC_UI_MAIN_BRANCH_NAME__|${TONIC_UI_MAIN_BRANCH_NAME}|g; s|__TONIC_UI_MAIN_BRANCH_DOCUMENTATION__|${TONIC_UI_MAIN_BRANCH_DOCUMENTATION}|g; s|__TONIC_UI_MAIN_BRANCH_SOURCE_CODE__|${TONIC_UI_MAIN_BRANCH_SOURCE_CODE}|g; s|__TONIC_UI_V1_RELEASE_VERSION__|${TONIC_UI_V1_RELEASE_VERSION}|g; s|__TONIC_UI_V1_RELEASE_DOCUMENTATION__|${TONIC_UI_V1_RELEASE_DOCUMENTATION}|g; s|__TONIC_UI_V1_RELEASE_NOTES__|${TONIC_UI_V1_RELEASE_NOTES}|g; s|__TONIC_UI_V0_RELEASE_VERSION__|${TONIC_UI_V0_RELEASE_VERSION}|g; s|__TONIC_UI_V0_RELEASE_DOCUMENTATION__|${TONIC_UI_V0_RELEASE_DOCUMENTATION}|g; s|__TONIC_UI_V0_RELEASE_NOTES__|${TONIC_UI_V0_RELEASE_NOTES}|g;" \
  pages/versions.mdx.template > pages/versions.mdx
