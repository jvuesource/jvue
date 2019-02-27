#!/usr/bin/env bash
yarn clean
yarn build
mv dist/index.html dist/index.ssr.html
./build/cpm.sh
echo "build for production success."