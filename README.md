# 🎮 GamerChallenge

GamerChallenge est une application web permettant de gérer des jeux et challenges associés.
Le projet est entièrement conteneurisé avec **Docker**, et comprend :

- un **frontend React/Vite** servi par **Nginx**
- un **backend Node.js/Express** utilisant **Sequelize**
- une **base de données PostgreSQL**

L’objectif est d’obtenir un déploiement **reproductible**, **documenté** et compatible avec les exigences du **Titre Professionnel DWWM** (CP10/CP11).

---

## 1. Architecture du projet
.
├── backend
│   ├── controllers
│   ├── database
│   ├── Dockerfile
│   ├── eslint.config.js
│   ├── http
│   ├── index.js
│   ├── middlewares
│   ├── node_modules
│   ├── package.json
│   ├── package-lock.json
│   ├── permissions
│   ├── router.js
│   └── schemas
├── DEPLOY.md
├── DEVOPS.md
├── docker-compose.yml
├── Docs
│   ├── CahierDesCharges
│   ├── cahierDesCharges.md
│   ├── Conception
│   └── pdf
├── front
│   ├── Dockerfile
│   ├── eslint.config.js
│   ├── index.html
│   ├── nginx.conf
│   ├── node_modules
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   ├── README.md
│   ├── src
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── @types
│   └── vite.config.ts
└── README.md

### Diagramme d’architecture

  [ Navigateur ]
         |
  http://localhost:5173
         |
    [ Nginx ]
         |
  http://localhost:3000
         |
     [ Backend ]
         |
      Sequelize
         |
    [ PostgreSQL ]

## 2. Prérequis

Docker ≥ 25
Docker Compose ≥ 2.24
git
psql (optionnel)

## 3. Installation et lancement

1. Cloner le projet :

```bash
git clone <repo>
cd gamerchallenge
```

2. Démarrer l'infrastructure :
```bash
docker compose up --build -d
```

3. Exécuter les migrations dans la base :
```bash
docker compose exec backend npm run migrate
```

4. Accéder à l'application
| Service     | URL                                            |
| ----------- | ---------------------------------------------- |
| Frontend    | [http://localhost:5173](http://localhost:5173) |
| API Backend | [http://localhost:3000](http://localhost:3000) |
| PostgreSQL  | localhost:5433 (psql)                          |

5. Commandes utiles
```bash
docker compose ps
docker compose logs backend -f
docker compose logs frontend -f
docker compose down
docker compose down -v   # supprime la base
```