#!/usr/bin/env bash

ssh root@goldie.robinvdgriend.nl "cd /srv/binnenvisser; git pull;docker compose pull;docker compose build; docker compose up -d;"
