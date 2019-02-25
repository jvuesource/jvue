#!/usr/bin/env bash
pwd

# clean
yarn clean
echo "dist clean finish"

# build ssr entry-client
yarn build-entry-client-prod
echo "ssr entry-client build finish"

# build ssr entry-server
yarn build-entry-server-prod
echo "ssr entry-server build finish"

# copy ssr modules
echo "copying files..."
mkdir dist/node_modules
# @babel/polyfill
rsync -am node_modules/@babel/polyfill dist/node_modules --exclude=node_modules
# @babel/runtime
rsync -am node_modules/@babel/runtime dist/node_modules --exclude=node_modules
# axios
rsync -am node_modules/ms dist/node_modules --exclude=node_modules
rsync -am node_modules/follow-redirects dist/node_modules --exclude=node_modules
rsync -am node_modules/is-buffer dist/node_modules --exclude=node_modules
rsync -am node_modules/axios dist/node_modules --exclude=node_modules
# browser-process-hrtime
rsync -am node_modules/browser-process-hrtime dist/node_modules --exclude=node_modules
# bootstrap
rsync -am node_modules/bootstrap dist/node_modules --exclude=node_modules
rsync -am node_modules/bootstrap-vue dist/node_modules --exclude=node_modules
# cssstyle
rsync -am node_modules/cssstyle dist/node_modules --exclude=node_modules
# cssom
rsync -am node_modules/cssom dist/node_modules --exclude=node_modules
# debug
rsync -am node_modules/debug dist/node_modules --exclude=node_modules
# html-encoding-sniffer
rsync -am node_modules/html-encoding-sniffer dist/node_modules --exclude=node_modules
# lodash.sortby
rsync -am node_modules/lodash.sortby dist/node_modules --exclude=node_modules
# iconv-lite
rsync -am node_modules/iconv-lite dist/node_modules --exclude=node_modules
# ip-regex
rsync -am node_modules/ip-regex dist/node_modules --exclude=node_modules
# jsdom
rsync -am node_modules/jsdom dist/node_modules --exclude=node_modules
rsync -am node_modules/symbol-tree dist/node_modules --exclude=node_modules
rsync -am node_modules/domexception dist/node_modules --exclude=node_modules
rsync -am node_modules/nwsapi dist/node_modules --exclude=node_modules
rsync -am node_modules/w3c-xmlserializer dist/node_modules --exclude=node_modules
rsync -am node_modules/xml-name-validator dist/node_modules --exclude=node_modules
rsync -am node_modules/parse5 dist/node_modules --exclude=node_modules
rsync -am node_modules/abab dist/node_modules --exclude=node_modules
rsync -am node_modules/request dist/node_modules --exclude=node_modules
rsync -am node_modules/extend dist/node_modules --exclude=node_modules
rsync -am node_modules/json-stringify-safe dist/node_modules --exclude=node_modules
rsync -am node_modules/safe-buffer dist/node_modules --exclude=node_modules
rsync -am node_modules/aws-sign2 dist/node_modules --exclude=node_modules
rsync -am node_modules/aws4 dist/node_modules --exclude=node_modules
rsync -am node_modules/http-signature dist/node_modules --exclude=node_modules
rsync -am node_modules/assert-plus dist/node_modules --exclude=node_modules
rsync -am node_modules/sshpk dist/node_modules --exclude=node_modules
rsync -am node_modules/asn1 dist/node_modules --exclude=node_modules
rsync -am node_modules/ecc-jsbn dist/node_modules --exclude=node_modules
rsync -am node_modules/jsbn dist/node_modules --exclude=node_modules
rsync -am node_modules/tweetnacl dist/node_modules --exclude=node_modules
rsync -am node_modules/jsprim dist/node_modules --exclude=node_modules
rsync -am node_modules/extsprintf dist/node_modules --exclude=node_modules
rsync -am node_modules/verror dist/node_modules --exclude=node_modules
rsync -am node_modules/core-util-is dist/node_modules --exclude=node_modules
rsync -am node_modules/json-schema dist/node_modules --exclude=node_modules
rsync -am node_modules/mime-types dist/node_modules --exclude=node_modules
rsync -am node_modules/mime-db dist/node_modules --exclude=node_modules
rsync -am node_modules/caseless dist/node_modules --exclude=node_modules
rsync -am node_modules/forever-agent dist/node_modules --exclude=node_modules
rsync -am node_modules/form-data dist/node_modules --exclude=node_modules
rsync -am node_modules/combined-stream dist/node_modules --exclude=node_modules
rsync -am node_modules/delayed-stream dist/node_modules --exclude=node_modules
rsync -am node_modules/asynckit dist/node_modules --exclude=node_modules
rsync -am node_modules/isstream dist/node_modules --exclude=node_modules
rsync -am node_modules/is-typedarray dist/node_modules --exclude=node_modules
rsync -am node_modules/qs dist/node_modules --exclude=node_modules
rsync -am node_modules/har-validator dist/node_modules --exclude=node_modules
rsync -am node_modules/ajv dist/node_modules --exclude=node_modules
rsync -am node_modules/uri-js dist/node_modules --exclude=node_modules
rsync -am node_modules/fast-deep-equal dist/node_modules --exclude=node_modules
rsync -am node_modules/json-schema-traverse dist/node_modules --exclude=node_modules
rsync -am node_modules/fast-json-stable-stringify dist/node_modules --exclude=node_modules
rsync -am node_modules/har-schema dist/node_modules --exclude=node_modules
rsync -am node_modules/uuid dist/node_modules --exclude=node_modules
rsync -am node_modules/oauth-sign dist/node_modules --exclude=node_modules
rsync -am node_modules/tunnel-agent dist/node_modules --exclude=node_modules
rsync -am node_modules/performance-now dist/node_modules --exclude=node_modules
rsync -am node_modules/data-urls dist/node_modules --exclude=node_modules
rsync -am node_modules/saxes dist/node_modules --exclude=node_modules
rsync -am node_modules/xmlchars dist/node_modules --exclude=node_modules
rsync -am node_modules/array-equal dist/node_modules --exclude=node_modules
rsync -am node_modules/ws dist/node_modules --exclude=node_modules
rsync -am node_modules/async-limiter dist/node_modules --exclude=node_modules
rsync -am node_modules/request-promise-native dist/node_modules --exclude=node_modules
rsync -am node_modules/request-promise-core dist/node_modules --exclude=node_modules
rsync -am node_modules/lodash dist/node_modules --exclude=node_modules
rsync -am node_modules/stealthy-require dist/node_modules --exclude=node_modules
# pn
rsync -am node_modules/pn dist/node_modules --exclude=node_modules
# psl
rsync -am node_modules/psl dist/node_modules --exclude=node_modules
# safer-buffer
rsync -am node_modules/safer-buffer dist/node_modules --exclude=node_modules
# tough-cookie
rsync -am node_modules/tough-cookie dist/node_modules --exclude=node_modules
# tr46
rsync -am node_modules/tr46 dist/node_modules --exclude=node_modules
# vue-uweb
rsync -am node_modules/vue-uweb dist/node_modules --exclude=node_modules
# vue
rsync -am node_modules/vue dist/node_modules --exclude=node_modules
# vue-router
rsync -am node_modules/vue-router dist/node_modules --exclude=node_modules
# lru-cache
rsync -am node_modules/lru-cache dist/node_modules --exclude=node_modules
# source-map
rsync -am node_modules/source-map dist/node_modules --exclude=node_modules
# vue-server-renderer
rsync -am node_modules/he dist/node_modules --exclude=node_modules
rsync -am node_modules/pseudomap dist/node_modules --exclude=node_modules
rsync -am node_modules/resolve dist/node_modules --exclude=node_modules
rsync -am node_modules/serialize-javascript dist/node_modules --exclude=node_modules
rsync -am node_modules/lodash.templatesettings dist/node_modules --exclude=node_modules
rsync -am node_modules/lodash._reinterpolate dist/node_modules --exclude=node_modules
rsync -am node_modules/lodash.template dist/node_modules --exclude=node_modules
rsync -am node_modules/vue-server-renderer dist/node_modules --exclude=node_modules
# vue-web-storage
rsync -am node_modules/vue-web-storage dist/node_modules --exclude=node_modules
# w3c-hr-time
rsync -am node_modules/w3c-hr-time dist/node_modules --exclude=node_modules
# whatwg-encoding
rsync -am node_modules/whatwg-encoding dist/node_modules --exclude=node_modules
# whatwg-url
rsync -am node_modules/whatwg-url dist/node_modules --exclude=node_modules
# webidl-conversions
rsync -am node_modules/webidl-conversions dist/node_modules --exclude=node_modules
# whatwg-mimetype
rsync -am node_modules/whatwg-mimetype dist/node_modules --exclude=node_modules
# yallist
rsync -am node_modules/yallist dist/node_modules --exclude=node_modules
# winston 日志组件
rsync -am node_modules/winston dist/node_modules --exclude=node_modules
rsync -am node_modules/logform dist/node_modules --exclude=node_modules
rsync -am node_modules/colors dist/node_modules --exclude=node_modules
rsync -am node_modules/triple-beam dist/node_modules --exclude=node_modules
rsync -am node_modules/readable-stream dist/node_modules --exclude=node_modules
rsync -am node_modules/process-nextick-args dist/node_modules --exclude=node_modules
rsync -am node_modules/isarray dist/node_modules --exclude=node_modules
rsync -am node_modules/inherits dist/node_modules --exclude=node_modules
rsync -am node_modules/util-deprecate dist/node_modules --exclude=node_modules
rsync -am node_modules/async dist/node_modules --exclude=node_modules
rsync -am node_modules/is-stream dist/node_modules --exclude=node_modules
rsync -am node_modules/diagnostics dist/node_modules --exclude=node_modules
rsync -am node_modules/colorspace dist/node_modules --exclude=node_modules
rsync -am node_modules/color dist/node_modules --exclude=node_modules
rsync -am node_modules/color-string dist/node_modules --exclude=node_modules
rsync -am node_modules/color-name dist/node_modules --exclude=node_modules
rsync -am node_modules/simple-swizzle dist/node_modules --exclude=node_modules
rsync -am node_modules/is-arrayish dist/node_modules --exclude=node_modules
rsync -am node_modules/color-convert dist/node_modules --exclude=node_modules
rsync -am node_modules/text-hex dist/node_modules --exclude=node_modules
rsync -am node_modules/enabled dist/node_modules --exclude=node_modules
rsync -am node_modules/env-variable dist/node_modules --exclude=node_modules
rsync -am node_modules/kuler dist/node_modules --exclude=node_modules
rsync -am node_modules/colornames dist/node_modules --exclude=node_modules
rsync -am node_modules/one-time dist/node_modules --exclude=node_modules
rsync -am node_modules/stack-trace dist/node_modules --exclude=node_modules
rsync -am node_modules/winston-transport dist/node_modules --exclude=node_modules
rsync -am node_modules/fast-safe-stringify dist/node_modules --exclude=node_modules
rsync -am node_modules/fecha dist/node_modules --exclude=node_modules
# flatted
rsync -am node_modules/flatted dist/node_modules --exclude=node_modules
echo "copy ssr modules finish"

# build server interface
babel src/server.js -o dist/server.js --presets=@babel/preset-env
echo "build server interface finish"

echo "build ssr finished.🌟"