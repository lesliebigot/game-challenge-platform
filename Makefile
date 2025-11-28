# 🎮 GamerChallenge Makefile
# Gestion simplifiée du projet avec Docker Compose

.PHONY: help install up down restart logs logs-backend logs-frontend logs-db migrate build clean ps status dev-backend dev-frontend lint-backend lint-frontend test

# Couleurs pour l'affichage
BLUE := \033[0;34m
GREEN := \033[0;32m
YELLOW := \033[0;33m
RED := \033[0;31m
NC := \033[0m # No Color

##@ Aide

help: ## Affiche cette aide
	@echo "$(BLUE)🎮 GamerChallenge - Commandes disponibles$(NC)"
	@echo ""
	@awk 'BEGIN {FS = ":.*##"; printf ""} /^[a-zA-Z_-]+:.*?##/ { printf "  $(GREEN)%-20s$(NC) %s\n", $$1, $$2 } /^##@/ { printf "\n$(YELLOW)%s$(NC)\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

##@ Installation et démarrage

install: ## Installation complète du projet (build + up + migrate)
	@echo "$(BLUE)📦 Installation complète de GamerChallenge...$(NC)"
	@$(MAKE) build
	@$(MAKE) up
	@sleep 5
	@$(MAKE) migrate
	@echo "$(GREEN)✅ Installation terminée !$(NC)"
	@echo "$(YELLOW)Frontend:$(NC) http://localhost:5173"
	@echo "$(YELLOW)Backend:$(NC)  http://localhost:3000"

build: ## Construit les images Docker
	@echo "$(BLUE)🔨 Construction des images Docker...$(NC)"
	docker compose build

up: ## Démarre tous les services en arrière-plan
	@echo "$(BLUE)🚀 Démarrage des services...$(NC)"
	docker compose up -d
	@echo "$(GREEN)✅ Services démarrés$(NC)"

down: ## Arrête tous les services
	@echo "$(BLUE)🛑 Arrêt des services...$(NC)"
	docker compose down
	@echo "$(GREEN)✅ Services arrêtés$(NC)"

restart: ## Redémarre tous les services
	@echo "$(BLUE)🔄 Redémarrage des services...$(NC)"
	@$(MAKE) down
	@$(MAKE) up

##@ Base de données

migrate: ## Exécute les migrations de base de données
	@echo "$(BLUE)🗄️  Exécution des migrations...$(NC)"
	docker compose exec backend npm run migrate
	@echo "$(GREEN)✅ Migrations terminées$(NC)"

db-reset: ## Supprime et recrée la base de données
	@echo "$(RED)⚠️  Suppression de la base de données...$(NC)"
	@$(MAKE) down
	docker compose down -v
	@$(MAKE) up
	@sleep 5
	@$(MAKE) migrate
	@echo "$(GREEN)✅ Base de données réinitialisée$(NC)"

db-shell: ## Ouvre un shell PostgreSQL
	@echo "$(BLUE)🐘 Connexion à PostgreSQL...$(NC)"
	docker compose exec db psql -U gamer -d gamer

##@ Logs et monitoring

logs: ## Affiche les logs de tous les services
	docker compose logs -f

logs-backend: ## Affiche les logs du backend
	docker compose logs backend -f

logs-frontend: ## Affiche les logs du frontend
	docker compose logs frontend -f

logs-db: ## Affiche les logs de la base de données
	docker compose logs db -f

ps: ## Liste les services en cours d'exécution
	@docker compose ps

status: ## Affiche le statut détaillé des services
	@echo "$(BLUE)📊 Statut des services$(NC)"
	@docker compose ps
	@echo ""
	@echo "$(YELLOW)Vérification de la santé des services...$(NC)"
	@curl -s http://localhost:5173 > /dev/null && echo "$(GREEN)✅ Frontend: OK$(NC)" || echo "$(RED)❌ Frontend: KO$(NC)"
	@curl -s http://localhost:3000 > /dev/null && echo "$(GREEN)✅ Backend: OK$(NC)" || echo "$(RED)❌ Backend: KO$(NC)"

##@ Développement

dev-backend: ## Lance le backend en mode développement (avec watch)
	@echo "$(BLUE)💻 Démarrage du backend en mode dev...$(NC)"
	cd backend && npm run dev

dev-frontend: ## Lance le frontend en mode développement
	@echo "$(BLUE)💻 Démarrage du frontend en mode dev...$(NC)"
	cd front && npm run dev

lint-backend: ## Vérifie le code du backend avec ESLint
	@echo "$(BLUE)🔍 Linting du backend...$(NC)"
	cd backend && npm run lint || true

lint-frontend: ## Vérifie le code du frontend avec ESLint
	@echo "$(BLUE)🔍 Linting du frontend...$(NC)"
	cd front && npm run lint || true

lint: lint-backend lint-frontend ## Vérifie le code de tout le projet

test-backend: ## Lance les tests du backend
	@echo "$(BLUE)🧪 Tests du backend...$(NC)"
	docker compose exec backend npm test

test-frontend: ## Lance les tests du frontend
	@echo "$(BLUE)🧪 Tests du frontend...$(NC)"
	docker compose exec frontend npm test

test: test-backend test-frontend ## Lance tous les tests

##@ Nettoyage

clean: ## Arrête les services et supprime les volumes
	@echo "$(RED)🧹 Nettoyage complet...$(NC)"
	docker compose down -v
	@echo "$(GREEN)✅ Nettoyage terminé$(NC)"

clean-all: clean ## Nettoyage complet + suppression des images
	@echo "$(RED)🧹 Nettoyage complet avec images...$(NC)"
	docker compose down -v --rmi all
	@echo "$(GREEN)✅ Nettoyage complet terminé$(NC)"

prune: ## Supprime tous les conteneurs, images et volumes inutilisés
	@echo "$(RED)⚠️  Nettoyage Docker complet...$(NC)"
	docker system prune -af --volumes
	@echo "$(GREEN)✅ Nettoyage Docker terminé$(NC)"

##@ Utilitaires

shell-backend: ## Ouvre un shell dans le conteneur backend
	@echo "$(BLUE)🐚 Shell backend...$(NC)"
	docker compose exec backend sh

shell-frontend: ## Ouvre un shell dans le conteneur frontend
	@echo "$(BLUE)🐚 Shell frontend...$(NC)"
	docker compose exec frontend sh

shell-db: ## Ouvre un shell dans le conteneur de base de données
	@echo "$(BLUE)🐚 Shell database...$(NC)"
	docker compose exec db sh

npm-install-backend: ## Installe les dépendances npm du backend
	@echo "$(BLUE)📦 Installation des dépendances backend...$(NC)"
	cd backend && npm install

npm-install-frontend: ## Installe les dépendances npm du frontend
	@echo "$(BLUE)📦 Installation des dépendances frontend...$(NC)"
	cd front && npm install

npm-install: npm-install-backend npm-install-frontend ## Installe toutes les dépendances npm

##@ Production

prod-build: ## Build pour la production
	@echo "$(BLUE)🏭 Build de production...$(NC)"
	docker compose -f docker-compose.yml build --no-cache
	@echo "$(GREEN)✅ Build de production terminé$(NC)"

prod-up: ## Démarre en mode production
	@echo "$(BLUE)🚀 Démarrage en mode production...$(NC)"
	docker compose -f docker-compose.yml up -d
	@echo "$(GREEN)✅ Production démarrée$(NC)"

# Commande par défaut
.DEFAULT_GOAL := help
