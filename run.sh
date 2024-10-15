#!/bin/bash

docker network create keywords-net 2>/dev/null

docker compose build keywords
docker compose up keywords --abort-on-container-exit --exit-code-from keywords 
docker compose down