# 🎮 Game Challenge Platform

> Application web collaborative pour créer et participer à des défis sur vos jeux vidéo préférés.

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.x-4169E1?logo=postgresql)](https://www.postgresql.org/)

---

## 📋 À propos du projet

Game Challenge Platform est une application full stack développée en **3 semaines** dans le cadre de la fin de ma formation CDA à l'École O'Clock (apothéose). Elle permet aux joueurs de :

- 🎯 Créer des défis sur leurs jeux préférés
- 🏆 Participer aux défis lancés par la communauté
- ❤️ Liker leurs défis favoris
- 📊 Découvrir les jeux les plus challengés et les défis populaires
- 👤 Gérer leur profil et suivre leurs participations

**Projet réalisé en équipe de 5 développeurs** avec méthodologie Agile (Scrum, Kanban).

⚠️ Note importante : Ce projet est resté en l'état depuis la fin de ma formation en novembre 2025. Il s'agit d'un travail d'équipe réalisé en conditions d'apprentissage et je suis 
pleinement consciente qu'il nécessite des refactorisations, nettoyages, corrections et améliorations. Vos retours et suggestions d'amélioration sont les bienvenus ! 
N'hésitez pas à ouvrir une issue ou à proposer une pull request.

---

## 🚀 Fonctionnalités principales

### Authentification & Sécurité
- Inscription et connexion sécurisées avec JWT
- Système de refresh token automatique
- Permissions utilisateur avec RBAC (Role-Based Access Control)
- Validation des données avec ZOD
- Hashage des mots de passe avec Argon2

### Gestion des défis
- Création de défis personnalisés sur n'importe quel jeu
- Participation aux défis 
- Modification et suppression de ses propres défis/participations
- Système de likes pour mettre en avant les meilleurs défis

### Filtres & Recherche
- Défis les plus récents
- Défis les plus likés
- Filtrage par jeu vidéo
- Jeux les plus challengés

---

## 🛠️ Stack technique

### Backend
- **Node.js** avec **Express** (API REST)
- **PostgreSQL** (base de données relationnelle)
- **Sequelize** ORM (gestion des modèles et migrations)
- **JWT** (authentification)
- **Argon2** (hashage sécurisé)
- **ZOD** (validation des données)
- Architecture **MVC** avec middleware RBAC

### Frontend
- **React** 
- **DaisyUI** (composants UI)
- **React Router** (navigation)
- Gestion d'état avec hooks (useState, useEffect, useContext)

### DevOps & Outils
- **Git/GitHub** (versioning avec branches de fonctionnalités)
- **Jest** & **Vitest** (tests unitaires et d'intégration)
- **Docker** (containerisation) (bientôt en place)

---

## 📊 Architecture de la base de données

8 tables relationnelles interconnectées :

```
users ──┬──< challenges (créés)
        └──< participations
        
games ──< challenges

challenges ──┬──< participations
             └──< likes
             
platforms ──< games (many-to-many)
publishers ──< games
genres ──< games (many-to-many)
```

**Relations principales :**
- Un utilisateur peut créer plusieurs défis
- Un utilisateur peut participer à plusieurs défis
- Un jeu peut avoir plusieurs défis
- Un défi peut avoir plusieurs participations et likes

---

## 🔌 API Endpoints (exemples)

### Authentification
```
POST   /register          Créer un compte
POST   /signin            Se connecter
POST   /refresh-token     Rafraîchir le token
GET    /logout            Se déconnecter
```

### Défis
```
GET    /challenges                    Liste tous les défis
GET    /challenges/recent             Défis les plus récents
GET    /challenges/top-liked          Défis les plus likés
GET    /challenges/:id                Détails d'un défi
POST   /games/:id/challenges          Créer un défi (auth)
PATCH  /challenges/:id                Modifier son défi (auth + RBAC)
DELETE /challenges/:id                Supprimer son défi (auth + RBAC)
```

### Participations
```
POST   /challenges/:id/participate    Participer à un défi (auth)
PATCH  /challenges/:id/participate    Modifier sa participation (auth)
DELETE /challenges/:id/participate    Annuler sa participation (auth)
```

### Jeux
```
GET    /games                         Liste tous les jeux
GET    /games/most-challenged         Jeux les plus challengés
GET    /games/:id                     Détails d'un jeu
```

---

## 🎯 Mon rôle dans le projet

**Développeuse Full Stack (50% Backend / 50% Frontend) + Product Owner**

### Backend
- Architecture complète de l'API REST en pattern MVC
- Développement du middleware RBAC pour les permissions
- Modélisation et création de la base de données PostgreSQL
- Gestion des relations complexes (many-to-many, eager loading)

### Frontend
- Développement de composants React réutilisables
- Intégration API avec gestion des appels asynchrones
- Implémentation de l'authentification côté client
- Routes protégées et gestion d'état global

### Product Owner
- Rédaction du cahier des charges et définition du MVP
- Création des wireframes et user stories
- Priorisation des fonctionnalités avec l'équipe
- Animation des daily stand-ups et rétrospectives

---

## 📅 Méthodologie Agile

### Phase de conception (1 semaine)
- Wireframes Figma
- Modèle Conceptuel de Données (MCD)
- Diagrammes de séquence UML
- User stories et cahier des charges
- Définition MVP vs fonctionnalités futures

### Phase de développement (2 semaines)
- Daily stand-ups quotidiens
- Gestion Kanban sur GitHub Projects
- Branches de fonctionnalités + Pull Requests
- Revues de code systématiques entre pairs
- Rétrospectives hebdomadaires

---

## 🧪 Tests

- Tests unitaires avec **Jest** (backend)
- Tests de composants avec **Vitest** (frontend)
- Tests d'intégration API
- Validation des middlewares de sécurité

---

## 🚧 Fonctionnalités futures

- [ ] Système de notifications en temps réel
- [ ] Classement global des joueurs
- [ ] Sanitisation de inputs
- [ ] Commentaires sur les défis
- [ ] Partage sur les réseaux sociaux
- [ ] Gestion des votes sur les jeux et les défis
- [ ] Accéssibilité

---

## 👥 Équipe de développement

Projet réalisé par une équipe de 5 développeurs Full Stack JavaScript dans le cadre de la formation O'Clock (Titre Professionnel Concepteur Développeur d'Applications - Niveau 6).

---

## 📞 Contact

**Leslie BIGOT** - Développeuse Full Stack JavaScript  
📧 leslieBIGOT@hotmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/lesliebigot)

---

## 📝 Licence

Ce projet a été réalisé dans un cadre pédagogique.

---

⭐ **N'hésitez pas à mettre une étoile si ce projet vous plaît !**
