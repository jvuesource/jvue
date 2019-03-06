#!/usr/bin/env bash
# This script adds aliases for some of the most often used commands for building JVUE
# to your current command-shell instance.
# (can be invoked as "source jvue-cli.sh")
alias cv="cd src/main/vue"
alias rv="cd ../../../"

alias vg="npm i -S"

alias vl="npm run lint"

alias vs="npm run serve"

alias vbuilddev="./build/build.dev.sh"
alias vbd="./build/build.dev.sh"
alias vrd="npm run dev-start"
alias v8rd="npm run v8-dev-start"

alias vbuild="./build/build.prod.sh"
alias vm="./build/cpm.sh"
alias vb="./build/build.prod.sh"
alias vr="npm run prod-start"
alias v8r="npm run v8-prod-start"


alias jbuild="mvn clean package -DskipTests"
alias jb="mvn clean package -DskipTests"

alias jruncli="mvn exec:java"
alias jrc="mvn exec:java"

alias jrun="mvn spring-boot:run"
alias jr="mvn spring-boot:run"

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
echo "vm     拷贝依赖"
echo "vr     生产环境Express运行"
echo "v8r    生产环境测试"
echo "jb     构建java项目"
echo "jrc    命令行运行java项目"
echo "jr     web运行java项目"

