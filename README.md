# Build Vue

```
cd vue && npm i -g yarn && yarn && yarn build
```


# Go back to root forder

```
cd ../../jvue
```

# Install j2v8


## linux
```
mvn install:install-file -Dfile=libs/j2v8_linux_x86_64-4.8.0.jar
```
## windows
```
mvn install:install-file -Dfile=libs/j2v8_win32_x86_64-4.8.3.jar
```

# Run CLI

## linux
```
mvn -f pom_linux_x86_x64.xml clean package exec:java
```
## windows
```
mvn clean package exec:java
```

# Run Spring Boot

## linux
```
mvn -f pom_linux_x86_x64.xml clean package spring-boot:run
```
## windows
```
mvn clean package spring-boot:run
```