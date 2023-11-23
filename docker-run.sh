#!/bin/sh

TEAM_ID="tonic-one"

docker stop ${TEAM_ID}
docker rm ${TEAM_ID}
docker run --privileged -p 8000:8000 --detach --name ${TEAM_ID} ${TEAM_ID}:latest
#docker exec -it ${TEAM_ID} /bin/sh
