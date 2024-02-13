#!/bin/sh
svc=$1
environment=$2

if [[ "$environment" == "production" ]]
then

  echo "Starting application on $environment environment . . ."
  echo "Exporting Variables. . . . ."
  /usr/local/bin/npm run start 

else

  echo "Starting application on $environment environment. . . ."
  echo "Exporting Variables. . . . ."
  /usr/local/bin/npm run start 

fi
