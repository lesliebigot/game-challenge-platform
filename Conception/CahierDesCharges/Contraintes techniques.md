# Contraintes techniques

## Technologies

Ces technologies permettent de couvrir tous les aspects du développement full-stack (frontend, backend, base de données, API).

### Frontend

SPA : React + Typescript: composants réutilisables, écosystème riche, compatibilité avec le mobile-first.
CSS : DaisyUI inclut une bonne base d'accessibilité. Les composants sont construits avec les bonnes pratiques (balises sémantiques, contraste). Il faut néanmoins ajouter les attributs "aria-label" et les "alt".

### Backend

Node.js + Express: Légereté, rapidité de développement, cohérence avec Typescript en frontend.

### Base de données

PostgreSQL : robuste, sécurisé, gère bien les relations (utilisateurs, challenges, votes, participations).
ORM : Un ORM inclut automatiquement les requêtes préparées, donc protège des injection SQL. Nous utiliserons Sequelize.

### API

l'API Restful en backend permet une séparation claire des responsabilités backend/frontend et une séparation du déploiement. On peut faire évoluer backend et frontend séparément. Plus facile à maintenir et à débugger.



## Sécurité

### Authentification

JWT pour gérer les sessions utilisateurs. Standardisé, compatible avec React/Node.
Pas de stockage côté serveur : idéal pour les API REST. Chaque requête est indépendante.
Facile pour le frontend : le token est stocké en local et envoyé dans chaque requête.

### Protection des données

* Chiffrement des mots de passes: argon2
* Variables d'environnement pour les secrets (clés API, etc.) via un fichier .env

### Sécurité des API

* Limitation des requêtes (express-rate-limit); CORS configuré pour n'autoriser que le domaine du frontend.
* Validation des données entrantes (ne pas faire confiance aux données venant du client) avec ZOD et sanitizer-HTML pour la protection contre les attaques XSS.

### Failles courantes

#### Contrôle d’accès défaillant
Risque : un utilisateur accède à des ressources non autorisées.

Mesures: vérifier dans le backend que l’ID de l’utilisateur dans le token JWT correspond à l’ID de la ressource demandée.

#### Défaillances cryptographiques

Risque : exposition de données sensibles (mots de passe, tokens, données personnelles) en raison d’un chiffrement insuffisant ou inexistant.

Mesures: utiliser argon2 (via la bibliothèque argon2) pour hacher les mots de passe.

#### Injection SQL

Risque : exécution de code malveillant via des entrées utilisateur non validées.

Mesures: 

* Utiliser un ORM Sequelize ou des requêtes paramétrées pour éviter les injections SQL.
* Valider et sanitizer les entrées avec zod.

#### Défaillances d’identification et d’authentification

Risque : faiblesses dans les mécanismes de connexion (ex : mots de passe faibles, session hijacking).

Mesures: 
* implémenter JWT avec une durée de vie courte (ex : 15 min) et un refresh token.
* Exiger une complexité minimale des mots de passe (8+ caractères, majuscules, chiffres).

### Uploads sécurisés

## Déploiement

### Frontend

Vercel : gratuit pour les projets etudiants, déploiement continu via GitHub. Intègre automatiquement le HTTPS (chiffrement des données sur le réseau).

### Backend

Render : gratuit pour les petites bases de données.

## Responsive

DaiyUI : bibliothèque simple et rapide à utiliser, basée sur Tailwind CSS, qui intègre automatiquement les bonnes pratiques du responsive design. Les composants sont déjà optimisés pour s’adapter parfaitement à toutes les tailles d’écran (mobile, tablette, ordinateur).

## Accessibilité
* Utiliser des balises sémantiques HTML correctes (``<button>, <label>, <header>, <nav>, <main>, <article>`` etc.).
* Attributs aria-label pour les boutons/liens sans texte visible (ex: icônes seules) et alt pour les images et les videos.
* Contraste suffisant entre texte et fond : ratio de contraste d'au moins 4,5:1 à tester avec lighthouse.
* Formulaires bien structurés avec ```<label>``` associés aux ```<input>```.
* Vidéos : ajouter des sous-titres.

## RGPD et mentions légales

## Versionning

## API
https://www.igdb.com/api 
L'api IGDB, gérée par Twitch, permet d'accéder à une large base de données sur les jeux vidéo : titres, genres, plateformes, éditeurs, studios, notes, vidéos, captures d'écran, etc.

## SEO

## Tests

## Conteneurisation

## Eco-conception