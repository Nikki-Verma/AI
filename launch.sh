#!/bin/sh
svc=$1
environment=$2
echo "Starting application on other than $environment environment. . . ."
echo "Exporting Variables. . . . ."
npm run start
