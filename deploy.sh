#!/usr/bin/env bash

docker-compose build
docker-compose push

ssh root@photek.robinvdgriend.nl "cd /srv/www/binnenvisser; git pull;docker-compose pull; docker-compose up -d;"
