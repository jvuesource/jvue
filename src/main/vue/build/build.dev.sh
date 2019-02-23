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
# browser-process-hrtime
rsync -av node_modules/browser-process-hrtime dist/node_modules --exclude=node_modules
# bootstrap
rsync -av node_modules/bootstrap dist/node_modules --exclude=node_modules
rsync -av node_modules/bootstrap-vue dist/node_modules --exclude=node_modules
# cssstyle
rsync -av --progress node_modules/cssstyle dist/node_modules --exclude=node_modules
# cssom
rsync -av --progress node_modules/cssom dist/node_modules --exclude=node_modules
# debug
rsync -av node_modules/debug dist/node_modules --exclude=node_modules
# html-encoding-sniffer
rsync -av node_modules/html-encoding-sniffer dist/node_modules --exclude=node_modules
# lodash.sortby
rsync -av node_modules/lodash.sortby dist/node_modules --exclude=node_modules
# iconv-lite
rsync -av node_modules/iconv-lite dist/node_modules --exclude=node_modules
# ip-regex
rsync -av --progress node_modules/ip-regex dist/node_modules --exclude=node_modules
# jsdom
rsync -av node_modules/jsdom dist/node_modules --exclude=node_modules
rsync -av node_modules/symbol-tree dist/node_modules --exclude=node_modules
rsync -av node_modules/domexception dist/node_modules --exclude=node_modules
rsync -av node_modules/nwsapi dist/node_modules --exclude=node_modules
rsync -av node_modules/w3c-xmlserializer dist/node_modules --exclude=node_modules
rsync -av node_modules/xml-name-validator dist/node_modules --exclude=node_modules
rsync -av node_modules/parse5 dist/node_modules --exclude=node_modules
rsync -av node_modules/abab dist/node_modules --exclude=node_modules
rsync -av node_modules/request dist/node_modules --exclude=node_modules
rsync -av node_modules/extend dist/node_modules --exclude=node_modules
rsync -av node_modules/json-stringify-safe dist/node_modules --exclude=node_modules
rsync -av node_modules/safe-buffer dist/node_modules --exclude=node_modules
rsync -av node_modules/aws-sign2 dist/node_modules --exclude=node_modules
rsync -av node_modules/aws4 dist/node_modules --exclude=node_modules
rsync -av node_modules/http-signature dist/node_modules --exclude=node_modules
rsync -av node_modules/assert-plus dist/node_modules --exclude=node_modules
rsync -av node_modules/sshpk dist/node_modules --exclude=node_modules
rsync -av node_modules/asn1 dist/node_modules --exclude=node_modules
rsync -av node_modules/ecc-jsbn dist/node_modules --exclude=node_modules
rsync -av node_modules/jsbn dist/node_modules --exclude=node_modules
rsync -av node_modules/tweetnacl dist/node_modules --exclude=node_modules
rsync -av node_modules/jsprim dist/node_modules --exclude=node_modules
rsync -av node_modules/extsprintf dist/node_modules --exclude=node_modules
rsync -av node_modules/verror dist/node_modules --exclude=node_modules
rsync -av node_modules/core-util-is dist/node_modules --exclude=node_modules
rsync -av node_modules/json-schema dist/node_modules --exclude=node_modules
rsync -av node_modules/mime-types dist/node_modules --exclude=node_modules
rsync -av node_modules/mime-db dist/node_modules --exclude=node_modules
rsync -av node_modules/caseless dist/node_modules --exclude=node_modules
rsync -av node_modules/forever-agent dist/node_modules --exclude=node_modules
rsync -av node_modules/form-data dist/node_modules --exclude=node_modules
rsync -av node_modules/combined-stream dist/node_modules --exclude=node_modules
rsync -av node_modules/delayed-stream dist/node_modules --exclude=node_modules
rsync -av node_modules/asynckit dist/node_modules --exclude=node_modules
rsync -av node_modules/isstream dist/node_modules --exclude=node_modules
rsync -av node_modules/is-typedarray dist/node_modules --exclude=node_modules
rsync -av node_modules/qs dist/node_modules --exclude=node_modules
rsync -av node_modules/har-validator dist/node_modules --exclude=node_modules
rsync -av node_modules/ajv dist/node_modules --exclude=node_modules
rsync -av node_modules/uri-js dist/node_modules --exclude=node_modules
rsync -av node_modules/fast-deep-equal dist/node_modules --exclude=node_modules
rsync -av node_modules/json-schema-traverse dist/node_modules --exclude=node_modules
rsync -av node_modules/fast-json-stable-stringify dist/node_modules --exclude=node_modules
rsync -av node_modules/har-schema dist/node_modules --exclude=node_modules
rsync -av node_modules/uuid dist/node_modules --exclude=node_modules
rsync -av node_modules/oauth-sign dist/node_modules --exclude=node_modules
rsync -av node_modules/tunnel-agent dist/node_modules --exclude=node_modules
rsync -av node_modules/performance-now dist/node_modules --exclude=node_modules
rsync -av node_modules/data-urls dist/node_modules --exclude=node_modules
rsync -av node_modules/saxes dist/node_modules --exclude=node_modules
rsync -av node_modules/xmlchars dist/node_modules --exclude=node_modules
rsync -av node_modules/array-equal dist/node_modules --exclude=node_modules
rsync -av node_modules/ws dist/node_modules --exclude=node_modules
rsync -av node_modules/async-limiter dist/node_modules --exclude=node_modules
rsync -av node_modules/request-promise-native dist/node_modules --exclude=node_modules
rsync -av node_modules/request-promise-core dist/node_modules --exclude=node_modules
rsync -av node_modules/lodash dist/node_modules --exclude=node_modules
rsync -av node_modules/stealthy-require dist/node_modules --exclude=node_modules
# pn
rsync -av node_modules/pn dist/node_modules --exclude=node_modules
# psl
rsync -av node_modules/psl dist/node_modules --exclude=node_modules
# safer-buffer
rsync -av node_modules/safer-buffer dist/node_modules --exclude=node_modules
# tough-cookie
rsync -av node_modules/tough-cookie dist/node_modules --exclude=node_modules
# tr46
rsync -av node_modules/tr46 dist/node_modules --exclude=node_modules
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
# w3c-hr-time
rsync -av --progress node_modules/w3c-hr-time dist/node_modules --exclude=node_modules
# whatwg-encoding
rsync -av --progress node_modules/whatwg-encoding dist/node_modules --exclude=node_modules
# whatwg-url
rsync -av --progress node_modules/whatwg-url dist/node_modules --exclude=node_modules
# webidl-conversions
rsync -av --progress node_modules/webidl-conversions dist/node_modules --exclude=node_modules
# whatwg-mimetype
rsync -av --progress node_modules/whatwg-mimetype dist/node_modules --exclude=node_modules
# yallist
rsync -av node_modules/yallist dist/node_modules --exclude=node_modules
echo "copy ssr modules finish"

# build server interface
babel src/server.js -o dist/server.js --presets=@babel/preset-env
echo "build server interface finish"

echo "build ssr finished.🌟 "