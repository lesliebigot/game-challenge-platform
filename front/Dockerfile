# === Étape 1 : Build du frontend avec Vite ===
FROM node:22-alpine AS build

# Dossier de travail dans le container
WORKDIR /app

# Copier uniquement les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code
COPY . .

# Construire la version de production
RUN npm run build

# === Étape 2 : Image finale Nginx pour servir le build ===
FROM nginx:alpine

# Copier la config Nginx (qu'on va créer juste après)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers générés par Vite dans le dossier public de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exposer le port HTTP du container
EXPOSE 80

# Lancer Nginx au premier plan (sinon le container s'arrête)
CMD ["nginx", "-g", "daemon off;"]
