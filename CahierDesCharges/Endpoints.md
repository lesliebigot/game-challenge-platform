# Endpoints


## Utilisateurs (inscription, connexion, profil)
	*	POST /api/register → Inscription utilisateur (création compte)
	*	POST /api/login → Connexion (authentification)
	*	POST /api/logout → Déconnexion
	*	POST /api/forgot-password → Demande de réinitialisation du mot de passe
	*	POST /api/reset-password → Réinitialisation mot de passe avec token
	*	GET /api/profile → Récupérer profil utilisateur connecté
	*	PATCH /api/profile → Mise à jour du profil utilisateur
	*	PATCH /api/profile/settings → Mise à jour paramètres utilisateur

## Jeux
	*	GET /api/games → Liste des jeux (avec filtres, pagination)
	*	GET /api/games/:id → Détail d’un jeu et challenges associés

## Challenges
	*	GET /api/challenges/user → Liste challenges de l’utilisateur (en cours / terminés)
	*	POST /api/challenges → Création d’un challenge
	*	GET /api/challenges/:id → Détail challenge
	*	POST /api/challenges/:id/participate → Participer à un challenge (soumission)
	*	PATCH /api/challenges/:id/participate → Modifier participation (si autorisé)

## Votes / Évaluations (évolutions possibles)
	*	GET /api/voting/pending → Participations à évaluer
	*	GET /api/voting/history → Historique des votes
	*	POST /api/voting → Soumettre un vote ou évaluation

## Notifications (évolutions possibles)
	*	GET /api/notifications → Liste notifications
	*	PATCH /api/notifications/:id/read → Marquer notification comme lue
	*	PATCH /api/notifications/settings → Modifier paramètres notification

## Classements (Leaderboard)
	*	GET /api/leaderboard → Classements globaux, top participants
    
## Administration (si admin)
	*	GET /api/admin/challenges → Gestion challenges
	*	PATCH /api/admin/challenges/:id → Modifier challenge
	*	DELETE /api/admin/challenges/:id → Supprimer challenge
	*	GET /api/admin/users → Gestion utilisateurs
	*	DELETE /api/admin/users/:id → Supprimer un utilisateur
	*	GET /api/admin/reports → Signalements (évolutions possibles)
	*	GET /api/admin/analytics → Statistiques détaillées (évolutions possibles)