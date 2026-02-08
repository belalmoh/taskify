.PHONY: run-web-local run-all-local run-backend-local install-dependencies

run-backend-local:
	@echo "Running docker locally..."
	@docker-compose up -d

	@echo "Running nestjs locally..."
	@cd apps/backend/taskify-nestjs && npm run dev -- --inspect

run-web-local:
	@echo "Running web locally..."
	@cd apps/frontend/taskify-web && npm run dev -- --inspect

run-all-local:
	@make run-web-local &
	@make run-backend-local

install-dependencies:
	@echo "Installing dependencies..."
	@cd apps/backend/taskify-nestjs && npm install
	@cd apps/frontend/taskify-web && npm install