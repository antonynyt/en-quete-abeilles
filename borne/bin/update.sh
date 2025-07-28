#!/bin/bash

cd "$(dirname "$0")/.."
docker compose up -d --no-deps --force-recreate --build backend frontend