#!/bin/bash

docker compose -f docker-compose-test.yml stop
docker compose -f docker-compose-test.yml rm --force

docker compose -f docker-compose-test.yml up -d mongo-test
docker compose -f docker-compose-test.yml up --build keywords-test
docker compose -f docker-compose-test.yml stop
docker compose -f docker-compose-test.yml rm --force
