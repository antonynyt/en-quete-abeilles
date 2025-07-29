#!/bin/bash
set -e

cd "$(dirname "$0")/.."
docker compose up --force-recreate -d

while ! docker compose ps | grep -q "Up"; do
    sleep 2
    docker compose ps
done

if which chromium-browser &>/dev/null; then
    ./borne/bin/launch-screens.sh
else
    exit 1
fi