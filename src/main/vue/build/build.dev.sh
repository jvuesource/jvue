#!/usr/bin/env bash
yarn clean
yarn dev-build
mv dist/index.html dist/index.ssr.html
./build/cpm.sh
echo "build for development success."