## Arborescence de l'application

### Routes publiques (non authentifié)

```
/
├── / (Page d'accueil)
│   ├── Présentation de l'application
│   ├── Challenges populaires (aperçu)
│   ├── Call-to-action inscription/connexion
│   └──lien vers page des jeux
│
├── /login (Connexion)
│   ├── Formulaire de connexion
│   ├── Lien "Mot de passe oublié"
│   └── Lien vers inscription
│
├── /register (Inscription)
│   ├── Formulaire d'inscription
│   ├── Validation email
│   └── Redirection vers profil après inscription
│
├── /forgot-password (Mot de passe oublié)
│   └── Formulaire de réinitialisation
│
├── /games (Liste des jeux)
│   ├── Filtres par type de jeu
│   ├── Recherche
│   └── Pagination (évolution possible)
│
├── /games/:id (Détail du jeu)
│   ├── Description du jeux et des challenges
│   ├── Règles et critères
│   ├── Liste des participations (évolution possible)
│   └── Bouton "Participer" (redirect vers login si non connecté)
│
├── /leaderboard (Classements globaux)
│   ├── Top participants
│   ├── Challenges les plus populaires
│   └── Statistiques publiques
│
├── /about (À propos)
├── /contact (Contact)
├── /privacy-policy (Politique de confidentialité)
└── /legal-mentions (Mentions légales)
```

### Routes privées (authentifié)

```
/dashboard
├── /dashboard (Tableau de bord utilisateur)
│   ├── Mes challenges (En cours / Terminés )
│   ├── Prochains challenges (évolution possible)
│   ├── Mes statistiques
│   └── Activité récente (évolution possible)
│
├── /profile (Mon profil)
│   ├── /profile/edit (Modifier le profil)
│   └── /profile/settings (Paramètres du compte) (évolution possible)
│
├── /challenges/:id/participate (Participer à un challenge)
│   ├── Formulaire de participation
│   ├── Upload de fichiers/médias
│   └── Aperçu avant soumission
│
├── /challenges/:id/edit (Modifier ma participation)
│   └── Edition de la participation (si autorisé)
│
├── /challenges/create (Créer un challenge)
│   ├── Formulaire de création
│   └── Aperçu avant publication
│
├── /voting (Mes votes) (évolution possible)
│   ├── Participations à évaluer
│   ├── Mes votes précédents
│   └── Historique des évaluations
│
├── /notifications (évolution possible)
│   ├── Nouvelles notifications
│   ├── Historique
│   └── Paramètres de notification
│
└── /admin (Administration - si admin)
    ├── /admin/challenges (Gestion des challenges)
    ├── /admin/users (Gestion des utilisateurs)
    ├── /admin/reports (Signalements) (évolution possible)
    └── /admin/analytics (Statistiques détaillées) (évolution possible)
```

### Routes d'erreur

```
/error
├── /401 (Unauthorized)
├── /403 (Forbidden)
├── /404 (Page non trouvée)
├── /500 (Erreur serveur)
└── /maintenance (Maintenance)
```

### Navigation utilisateur type

#### Parcours visiteur anonyme
1. `/` → Découverte de l'application
2. `/games` → Exploration des jeux
3. `/games/:id` → Détail d'un jeu et ses challenges 
4. `/register` → Inscription
5. `/dashboard` → après Première connexion, redirection vers le profil

#### Parcours utilisateur connecté
1. `/dashboard` → Point d'entrée après connexion
2. `/games` → Navigation vers les challenges
3. `/games/:id/participate` → Participation
4. `/voting` → Évaluation des autres participants
5. `/profile` → Gestion du profil

#### Parcours création de challenge
1. `/dashboard` → Point de départ
2. `/challenges/create` → Création
3. `/my-challenges` → Suivi du challenge créé
4. `/admin/challenges` → Validation (si admin)
