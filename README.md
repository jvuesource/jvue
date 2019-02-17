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

```
mvn clean package exec:java
```

# Run Spring Boot
```
mvn clean package spring-boot:run
```