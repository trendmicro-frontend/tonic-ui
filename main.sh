#!/bin/sh

while true; do
  node packages/react-docs/server.js
  echo "Server crashed with exit code $?.  Restarting..." >&2
  sleep 3
done
