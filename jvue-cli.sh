#!/usr/bin/env bash
# This script adds aliases for some of the most often used commands for building JVUE
# to your current command-shell instance.
# (can be invoked as "source jvue-cli.sh")
alias cv="cd src/main/vue"
alias rv="cd ../../../"

alias vbuilddev="./build/build.dev.sh"
alias vbd="./build/build.dev.sh"
alias vrd="npm run dev-start"
alias v8rd="npm run v8-dev-start"

alias vbuild="./build/build.prod.sh"
alias vb="./build/build.prod.sh"
alias vr="npm run prod-start"
alias v8r="npm run v8-prod-start"

alias jbuild="mvn clean package -DskipTests"
alias jb="mvn clean package -DskipTests"

alias jruncli="mvn clean package exec:java"
alias jrc="mvn clean package exec:java"

alias jrun="mvn clean package spring-boot:run"
alias jr="mvn clean package spring-boot:run"
