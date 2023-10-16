#!/bin/bash

command="npm run cy:run"

if [ $# -gt 0 ]; then
  if [ "$1" == "chrome" ]; then
    command="npm run cy:run:chrome"
    echo "Running Cypress with Chrome..."
  elif [ "$1" == "firefox" ]; then
    command="npm run cy:run:firefox"
    echo "Running Cypress with Firefox..."
  fi
fi

$command
