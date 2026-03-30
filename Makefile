up:
	docker compose up --remove-orphans

be_build:
	cd be; ./gradlew clean build
	docker rmi -f workout-be:latest

be_restart: 
	docker compose stop be
	cd be; ./gradlew clean build
	docker rmi -f workout-be:latest
	docker compose build --no-cache be
	docker compose up -d

down:
	docker compose stop
