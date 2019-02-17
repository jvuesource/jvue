# Build Vue

```bash
cd src/main/vue && npm i -g yarn && yarn && yarn build
```

# Go back to root forder

```bash
cd ../../../../jvue
```

# Install j2v8

## linux
```bash
mvn install:install-file -Dfile=libs/j2v8_linux_x86_64-4.8.0.jar
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