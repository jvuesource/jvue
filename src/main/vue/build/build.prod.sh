#!/usr/bin/env bash
yarn clean
yarn build
./build/cpm.sh
echo "build for production success."