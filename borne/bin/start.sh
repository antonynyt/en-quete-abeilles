#!/bin/bash
set -e
export DISPLAY=:0

cd "$(dirname "$0")/.."
docker compose up --force-recreate -d

while ! docker compose ps | grep -q "Up"; do
   sleep 2
   docker compose ps
done

# start the app-wrapper
if [ -f "/home/turbopollen/en-quete-abeilles/borne/app-wrapper/dist/linux-arm64-unpacked/borne-wrapper" ]; then
    echo "Starting app-wrapper..."
    /home/turbopollen/en-quete-abeilles/borne/app-wrapper/dist/linux-arm64-unpacked/borne-wrapper
else
    echo "App-wrapper not found, skipping..."
fi