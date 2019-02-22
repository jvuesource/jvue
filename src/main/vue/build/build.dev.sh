#!/usr/bin/env bash
pwd

# clean
yarn clean
echo "dist clean finish"

# build ssr entry-client
yarn build-entry-client-dev
echo "ssr entry-client build finish"

# build ssr entry-server
yarn build-entry-server-dev
echo "copy ssr entry-server build finish"

# copy ssr modules
echo "copying files..."
mkdir dist/node_modules
# @babel/polyfill
rsync -av node_modules/@babel/polyfill dist/node_modules --exclude=node_modules
# @babel/runtime
rsync -av node_modules/@babel/runtime dist/node_modules --exclude=node_modules
# axios
rsync -av node_modules/ms dist/node_modules --exclude=node_modules
rsync -av node_modules/follow-redirects dist/node_modules --exclude=node_modules
rsync -av node_modules/is-buffer dist/node_modules --exclude=node_modules
rsync -av node_modules/axios dist/node_modules --exclude=node_modules
# bootstrap
rsync -av node_modules/bootstrap dist/node_modules --exclude=node_modules
rsync -av node_modules/bootstrap-vue dist/node_modules --exclude=node_modules
# debug
rsync -av node_modules/debug dist/node_modules --exclude=node_modules
# vue
rsync -av node_modules/vue dist/node_modules --exclude=node_modules
# vue-router
rsync -av node_modules/vue-router dist/node_modules --exclude=node_modules
# lru-cache
rsync -av node_modules/lru-cache dist/node_modules --exclude=node_modules
# source-map
rsync -av node_modules/source-map dist/node_modules --exclude=node_modules
# vue-server-renderer
rsync -av node_modules/he dist/node_modules --exclude=node_modules
rsync -av node_modules/pseudomap dist/node_modules --exclude=node_modules
rsync -av node_modules/resolve dist/node_modules --exclude=node_modules
rsync -av node_modules/serialize-javascript dist/node_modules --exclude=node_modules
rsync -av node_modules/lodash.templatesettings dist/node_modules --exclude=node_modules
rsync -av node_modules/lodash._reinterpolate dist/node_modules --exclude=node_modules
rsync -av node_modules/lodash.template dist/node_modules --exclude=node_modules
rsync -av node_modules/vue-server-renderer dist/node_modules --exclude=node_modules
# vue-web-storage
rsync -av node_modules/vue-web-storage dist/node_modules --exclude=node_modules
# yallist
rsync -av node_modules/yallist dist/node_modules --exclude=node_modules
echo "copy ssr modules finish"

# build server interface
babel src/server.js -o dist/server.js --presets=@babel/preset-env
echo "build server interface finish"

echo "build ssr finished.🌟 "