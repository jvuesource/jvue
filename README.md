# Build Vue

```bash
cd src/main/vue && npm i -g yarn && yarn
```

 To get started:

    yarn run dev

  To build & start for production:

    yarn run build
    yarn start

  To test:

    yarn run test

# Go back to root forder

```bash
cd ../../../../jvue
```

# Install j2v8

## linux
```bash
mvn install:install-file -Dfile=libs/j2v8_linux_x86_64-4.8.0.jar
```

or

```bash
mvn install:install-file -Dfile=libs/j2v8_linux_x86_64-4.8.3.jar
```

## windows
```bash
mvn install:install-file -Dfile=libs/j2v8_win32_x86_64-4.8.3.jar
```

# Run CLI

## linux
```bash
mvn -f pom_linux_x86_x64.xml clean package exec:java
```
## windows
```bash
mvn clean package exec:java
```

# Run Spring Boot

## linux
```bsah
mvn -f pom_linux_x86_x64.xml clean package spring-boot:run
```
## windows
```bsah
mvn clean package spring-boot:run
```

# Start Tomcat

```
# 切换到root用户
su
cd /home/soft/apache-tomcat-9.0.16/bin && ./catalina.sh run
```