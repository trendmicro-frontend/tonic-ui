#!/bin/sh
#
set -o allexport; source .dockerenv; set +o allexport

if [ -z "$REPO_NAME" ]; then
  echo 'Please specify REPO_NAME in the `.dockerenv` file'
  exit 1
fi

docker stop ${REPO_NAME}
docker rm ${REPO_NAME}
docker run -p 80:80 --detach --name ${REPO_NAME} ${REPO_NAME}:latest
#docker run --privileged -p 80:80 --detach --name ${REPO_NAME} ${REPO_NAME}:latest
#docker exec -it ${REPO_NAME} /bin/sh
