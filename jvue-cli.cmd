:: This script adds aliases for some of the most often used commands for building JVUE
:: to your current command-shell instance.
:: (can be invoked as "jvue-cli.cmd")
@echo off
REM 声明采用UTF-8编码
chcp 65001

doskey cv=cd src/main/vue $*
doskey rv=cd ../../../ $*

doskey vg=npm i -S $*

doskey vl=npm run lint $*

doskey vs=npm run serve $*

echo 当前CMD默认目录：%cd%
echo 开发环境构建脚本路径：%cd%/build/build.dev.cmd
doskey vbuilddev=%cd%/src/main/vue/build/build.dev.cmd
doskey vbd=%cd%/src/main/vue/build/build.dev.cmd
doskey vrd=npm run dev-start
doskey v8rd=npm run v8-dev-start

echo 生产环境构建脚本路径：%cd%/build/build.prod.cmd
doskey vbuild=%cd%/src/main/vue/build/build.prod.cmd
doskey vb=%cd%/src/main/vue/build/build.prod.cmd
doskey vm=%cd%/src/main/vue/build/cpm.cmd
doskey vr=npm run prod-start
doskey v8r=npm run v8-prod-start

echo "用法:"
echo "cv     进入vue项目根目录"
echo "rv     返回java项目根目录"
echo "vg     安装vue依赖"
echo "vl     格式化vue项目代码"
echo "vs     开发环境预览"
echo "vbd    开发环境构建"
echo "vrd    开发环境Express运行"
echo "v8rd   开发环境测试"
echo "vb     生产环境构建"
echo "vm     安装依赖"
echo "vr     生产环境Express运行"
echo "v8r    生产环境测试"