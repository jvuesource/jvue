#!/usr/bin/env bash
# dos2unix ./build/cpm.sh && ./build/cpm.sh
# ncp [source] [dest] [--limit=concurrency limit] [--filter=filter] --stopOnErr

# clean & mkdir
rm -rf dist/node_modules
mkdir -p dist/node_modules

# core-js
npm run ncp node_modules/core-js dist/node_modules/core-js

# vue-server-renderer
npm run ncp node_modules/he dist/node_modules/he
npm run ncp node_modules/lodash._reinterpolate dist/node_modules/lodash._reinterpolate
npm run ncp node_modules/lodash.template dist/node_modules/lodash.template
npm run ncp node_modules/lodash.templatesettings dist/node_modules/lodash.templatesettings
npm run ncp node_modules/resolve dist/node_modules/resolve
npm run ncp node_modules/serialize-javascript dist/node_modules/serialize-javascript
npm run ncp node_modules/vue-server-renderer dist/node_modules/vue-server-renderer
rm -rf dist/node_modules/vue-server-renderer/node_modules

# vue
npm run ncp node_modules/vue dist/node_modules/vue

# vue-router
npm run ncp node_modules/vue-router dist/node_modules/vue-router

# axios
npm run ncp node_modules/axios dist/node_modules/axios
npm run ncp node_modules/is-buffer dist/node_modules/is-buffer
npm run ncp node_modules/follow-redirects dist/node_modules/follow-redirects

# bootstrap-vue
npm run ncp node_modules/bootstrap-vue dist/node_modules/bootstrap-vue
rm -rf dist/node_modules/bootstrap-vue/node_modules
rm -rf dist/node_modules/bootstrap-vue/src

# circular-json
npm run ncp node_modules/circular-json dist/node_modules/circular-json

# source-map
npm run ncp node_modules/source-map dist/node_modules/source-map