REM ./build/cpm.cmd
REM ncp [source] [dest] [--limit=concurrency limit] [--filter=filter] --stopOnErr

REM clean && mkdir
del "dist/node_modules" /q
mkdir "dist/node_modules"

REM core-js
yarn ncp node_modules/core-js dist/node_modules/core-js
del -rf dist/node_modules/core-js/modules /q

REM vue-server-renderer
yarn ncp node_modules/he dist/node_modules/he
yarn ncp node_modules/lodash._reinterpolate dist/node_modules/lodash._reinterpolate
yarn ncp node_modules/lodash.template dist/node_modules/lodash.template
yarn ncp node_modules/lodash.templatesettings dist/node_modules/lodash.templatesettings
yarn ncp node_modules/resolve dist/node_modules/resolve
yarn ncp node_modules/serialize-javascript dist/node_modules/serialize-javascript
yarn ncp node_modules/vue-server-renderer dist/node_modules/vue-server-renderer
del dist/node_modules/vue-server-renderer/node_modules /q

REM vue
yarn ncp node_modules/vue dist/node_modules/vue

REM vue-router
yarn ncp node_modules/vue-router dist/node_modules/vue-router

REM axios
yarn ncp node_modules/axios dist/node_modules/axios
yarn ncp node_modules/is-buffer dist/node_modules/is-buffer
yarn ncp node_modules/follow-redirects dist/node_modules/follow-redirects

REM bootstrap-vue
yarn ncp node_modules/bootstrap-vue dist/node_modules/bootstrap-vue
del "dist/node_modules/bootstrap-vue/node_modules" /q
del "dist/node_modules/bootstrap-vue/src" /q

REM circular-json
yarn ncp node_modules/circular-json dist/node_modules/circular-json