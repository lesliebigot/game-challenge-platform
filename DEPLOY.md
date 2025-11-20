# 🚀 Déploiement de GamerChallenge

Ce document explique comment l'application est déployée avec **Docker** et **Docker Compose**

# 1. Dockerfile du backend

```dockerfile
FROM node:22-alpine 
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD ["node", "index.js"]
```

- node:22-alpine : image légère, adaptée à la production
- séparation COPY package.json puis npm install = optimisation du cache Docker
- le backend expose son API sur le port 3000
- l’image est autonome : elle n'a besoin que d’un Node.js pour tourner


# 2. Dockerfile du frontend (multi-stage)
```dockerfile
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Pourquoi un multi-stage build ?

- Vite nécessite Node.js pour générer le build final (dist/)
- mais Node n’est pas nécessaire pour servir le build
- donc :
    - étape 1 → build Vite
    - étape 2 → image finale Nginx, légère et sécurisée
- résultat : une image de production optimisée

Pourquoi Nginx ?

- serveur HTTP très performant
- parfait pour servir des fichiers statiques
- configuration adaptée aux SPA (React Router)

# 3. docker-compose.yml

```yml
services:
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: gamer
      POSTGRES_USER: gamer
      POSTGRES_PASSWORD: gamer_password
    ports:
      - "5440:5432"
    volumes:
      - db_data:/var/lib/postgresql/data
    networks:
      - gc_network

  backend:
    build: ./backend
    environment:
      PORT: 3000
      PG_URL: postgres://gamer:gamer_password@gamerchallenge_db:5432/gamer
      JWT_SECRET: monsupersercret
    depends_on:
      - db
    ports:
      - "3000:3000"
    networks:
      - gc_network

  frontend:
    build: ./front
    depends_on:
      - backend
    ports:
      - "5173:80"
    networks:
      - gc_network

volumes:
  db_data:

networks:
  gc_network:

```

Isolation réseau Docker

- les 3 containers utilisent le réseau gc_network
- ils peuvent se joindre via leur nom de service
- le backend appelle Postgres via gamerchallenge_db:5432

Volume persistant db_data

- stocke les données PostgreSQL
- même si le container DB est supprimé : les données survivent

depends_on

- le backend démarre après Postgres
- le frontend démarre après l’API
- garantit un ordre de démarrage logique

Mapping des ports
| Service  | Interne | Externe | Pourquoi ?     |
| -------- | ------- | ------- | -------------- |
| frontend | 80      | 5173    | accès au site  |
| backend  | 3000    | 3000    | accès API      |
| db       | 5432    | 5433    | connexion psql |

# 4. Procédure complète de déploiement

1) Démarrer l’infrastructure
```bash
docker compose up --build -d
```

1) Lancer les migrations
```bash
docker compose exec backend npm run migrate
```

1) Vérifier les services
```bash
docker compose ps
docker compose logs backend -f
docker compose logs frontend -f
```
