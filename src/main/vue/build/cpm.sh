#!/usr/bin/env bash
# dos2unix ./build/cpm.sh && ./build/cpm.sh
# ncp [source] [dest] [--limit=concurrency limit] [--filter=filter] --stopOnErr

# clean & mkdir
rm -rf dist/node_modules
mkdir -p dist/node_modules

# core-js
yarn ncp node_modules/core-js dist/node_modules/core-js

# vue-server-renderer
yarn ncp node_modules/he dist/node_modules/he
yarn ncp node_modules/lodash._reinterpolate dist/node_modules/lodash._reinterpolate
yarn ncp node_modules/lodash.template dist/node_modules/lodash.template
yarn ncp node_modules/lodash.templatesettings dist/node_modules/lodash.templatesettings
yarn ncp node_modules/resolve dist/node_modules/resolve
yarn ncp node_modules/serialize-javascript dist/node_modules/serialize-javascript
yarn ncp node_modules/vue-server-renderer dist/node_modules/vue-server-renderer

# vue
yarn ncp node_modules/vue dist/node_modules/vue

# vue-router
yarn ncp node_modules/vue-router dist/node_modules/vue-router

# axios
yarn ncp node_modules/axios dist/node_modules/axios
yarn ncp node_modules/is-buffer dist/node_modules/is-buffer
yarn ncp node_modules/follow-redirects dist/node_modules/follow-redirects