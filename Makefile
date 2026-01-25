.PHONY: run-web-local run-all-local run-backend-local

run-backend-local:
	@echo "Running docker locally..."
	@docker-compose up -d

	@echo "Running nestjs locally..."
	@cd apps/backend/taskify-nestjs && npm run dev

run-web-local:
	@echo "Running web locally..."
	@cd apps/frontend/taskify-web && npm run dev -- --inspect

run-all-local:
	@make run-web-local &
	@make run-backend-local