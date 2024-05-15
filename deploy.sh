#!/usr/bin/env bash

ssh root@photek.robinvdgriend.nl "cd /srv/www/binnenvisser; git pull;docker-compose pull;docker-compose build; docker-compose up -d;"
