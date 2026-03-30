FROM alpine/java:21-jre

ARG JAR_FILE=build/libs/*SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
EXPOSE 5005

ENTRYPOINT ["java", "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=0.0.0.0:5005", "-jar", "/app.jar"]
#ENTRYPOINT ["java", "-jar", "/app.jar"]
