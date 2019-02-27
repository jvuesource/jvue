#!/usr/bin/env bash
yarn clean
yarn dev-build
./build/cpm.sh
echo "build for development success."