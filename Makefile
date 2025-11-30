all_start:
	cd be; ./gradlew clean build
	docker rmi -f workout-be:latest
	docker compose up --remove-orphans

be_restart: 
	docker compose stop be
	cd be; ./gradlew clean build
	docker rmi -f workout-be:latest
	docker compose build --no-cache be
	docker compose up -d

all_stop:
	docker compose stop
