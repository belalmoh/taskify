.PHONY: run-web-local run-gateway-local run-board-local run-insight-local run-all-local

run-web-local:
	@echo "Running web locally..."
	@cd apps/frontend/taskify-web && npm run dev -- --inspect

run-gateway-local:
	@echo "Running gateway locally..."
	@cd apps/backend/taskify-gateway && npm run dev

run-board-local:
	@echo "Running board locally..."
	@cd apps/backend/taskify-board && npm run dev

run-insight-local:
	@echo "Running insight locally..."
	@cd apps/backend/taskify-insight && npm run dev

run-all-local:
	@make run-web-local &
	@make run-gateway-local &
	@make run-board-local &
	@make run-insight-local