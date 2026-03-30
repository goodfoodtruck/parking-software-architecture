.PHONY: up

up:
	docker compose -p parking -f api/docker-compose.yml -f Frontend/docker-compose.yml up -d

stop:
	docker compose -p parking down