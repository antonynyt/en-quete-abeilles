#!/bin/bash

cd "$(dirname "$0")/.."
git pull
docker compose up -d --no-deps --force-recreate --build backend frontend