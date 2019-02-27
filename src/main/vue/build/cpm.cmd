REM ./build/cpm.cmd
REM ncp [source] [dest] [--limit=concurrency limit] [--filter=filter] --stopOnErr

REM clean && mkdir
del "dist/node_modules" /s /q
mkdir "dist/node_modules"

REM core-js
yarn ncp node_modules/core-js dist/node_modules/core-js

REM vue-server-renderer
yarn ncp node_modules/he dist/node_modules/he
yarn ncp node_modules/lodash._reinterpolate dist/node_modules/lodash._reinterpolate
yarn ncp node_modules/lodash.template dist/node_modules/lodash.template
yarn ncp node_modules/lodash.templatesettings dist/node_modules/lodash.templatesettings
yarn ncp node_modules/resolve dist/node_modules/resolve
yarn ncp node_modules/serialize-javascript dist/node_modules/serialize-javascript
yarn ncp node_modules/vue-server-renderer dist/node_modules/vue-server-renderer

REM vue
yarn ncp node_modules/vue dist/node_modules/vue

# vue-router
yarn ncp node_modules/vue-router dist/node_modules/vue-router
