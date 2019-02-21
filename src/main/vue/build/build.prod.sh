#!/usr/bin/env bash
pwd

# clean
yarn clean
echo "dist clean finish"

# build ssr entry-client
cross-env NODE_ENV=production SSR_ENV=ssrc webpack --config build/webpack.client.config.js --progress --hide-modules
echo "ssr entry-client build finish"

# build ssr entry-server
cross-env NODE_ENV=production SSR_ENV=ssrs webpack --config build/webpack.server.config.js --progress --hide-modules
echo "ssr entry-server build finish"

# copy ssr modules
echo "copying files..."
mkdir dist/node_modules
# axios
cp -av -r node_modules/ms/ dist/node_modules
cp -av -r node_modules/follow-redirects/ dist/node_modules
cp -av -r node_modules/is-buffer/ dist/node_modules
cp -av -r node_modules/axios/ dist/node_modules
# bootstrap
cp -av -r node_modules/bootstrap/ dist/node_modules
cp -av -r node_modules/bootstrap-vue/ dist/node_modules
# vue
cp -av -r node_modules/vue/ dist/node_modules
# vue-router
cp -av -r node_modules/vue-router/ dist/node_modules
# lru-cache
cp -av -r node_modules/lru-cache/ dist/node_modules
# vue-server-renderer
cp -av -r node_modules/he/ dist/node_modules
cp -av -r node_modules/pseudomap/ dist/node_modules
cp -av -r node_modules/resolve/ dist/node_modules
cp -av -r node_modules/serialize-javascript/ dist/node_modules
cp -av -r node_modules/lodash.templatesettings/ dist/node_modules
cp -av -r node_modules/lodash._reinterpolate/ dist/node_modules
cp -av -r node_modules/lodash.template/ dist/node_modules
cp -av -r node_modules/vue-server-renderer/ dist/node_modules
# vue-web-storage
cp -av -r node_modules/vue-web-storage/ dist/node_modules
echo "copy ssr modules finish"

# build server interface
babel src/server.js -o dist/server.js --presets=@babel/preset-env
echo "build server interface finish"

echo "build ssr finished.🌟 "