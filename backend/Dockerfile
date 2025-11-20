# 1) Image de base : Node.js léger
FROM node:22-alpine

# 2) Dossier de travail dans le container
WORKDIR /usr/src/app

# 3) Copier les fichiers de dépendances
COPY package*.json ./

# 4) Installer les dépendances
RUN npm install

# 5) Copier le reste du code backend
COPY . .

# 6) Variables d'environnement par défaut
ENV NODE_ENV=production
ENV PORT=3000

# 7) Exposer le port sur lequel l'API écoute dans le container
EXPOSE 3000

# 8) Commande de démarrage
CMD ["node", "index.js"]
