# GamerChallenges - Plan de Test

## AUTHENTIFICATION
### Test 1 : Inscription valide :
* Action : Remplir le formulaire d'inscription avec email valide, nom, pseudo unique et mot de passe valide, puis cliquer "S'inscrire"
* Résultat attendu : Message de succès, redirection vers la page profile.
 
### Test 2 : Inscription avec email déjà existant :
* Action : Essayer de créer un compte avec un email déjà utilisé
* Résultat attendu : Message d'erreur "Cet email est déjà enregistré"
  
### Test 3 : Inscription avec mot de passe invalide :
* Action : Remplir le formulaire avec un mot de passe de 5 caractères
* Résultat attendu : Message d'erreur "Le mot de passe doit contenir au moins 8 caractères"
  
### Test 4 : Connexion avec identifiants valides :
* Action : Entrer un email et mot de passe corrects, puis cliquer "Se connecter"
* Résultat attendu : Redirection vers la page d'accueil.

### Test 5 : Connexion avec mot de passe incorrect :
* Action : Entrer un email valide mais un mot de passe faux
* Résultat attendu : Message d'erreur "Email ou mot de passe incorrect"

### Test 6 : Déconnexion :
* Action : Cliquer sur le bouton "Déconnexion"
* Résultat attendu : Redirection vers l'accueil, utilisateur n'est plus connecté

## PAGE D'ACCUEIL

### Test 1 : Affichage de la liste défis populaires :
* Action : Aller sur la page d'accueil
* Résultat attendu : Au moins 3 défis s'affichent avec titre et jeu.

## PAGE DES JEUX

### Test 1 : Affichage de la liste des jeux :
* Action : Aller sur la page des jeux
* Résultat attendu : Affichage des jeux avec avec titre.

### Test 2 : Liker un jeu :
* Action : Sur un jeu, cliquer sur l’icône étoile
* Résultat attendu : Le compteur augmente de 1, changement de l’icône étoile.

## GESTION DES CHALLENGES

### Test 1 : Créer un nouveau challenge (utilisateur connecté) :
* Action : Cliquer sur "Proposer un défi", remplir le formulaire (titre, description), puis soumettre
* Résultat attendu : Message de succès, le nouveau défi apparaît dans la liste

### Test 2 : Proposer un challenge sans titre :
* Action : Laisser le titre vide et essayer de soumettre
* Résultat attendu : Message d'erreur "Le titre est obligatoire"

### Test 3 : Consulter les détails d'un challenge :
* Action : Cliquer sur un challenge dans la liste
* Résultat attendu : Affichage du titre, description.

### Test 4 : Bouton " Créer un nouveau challenge " : si non connecté => redirection vers la page de connexion :
* Action : Déconnecter et cliquer sur le Bouton " Créer un nouveau challenge " 
* Résultat attendu :  redirection vers la page de connexion

## PARTICIPATION A UN CHALLENGE

### Test 1 : Afficher mes participations
* Action : Aller dans "Mon profil", section "Mes participations"
* Résultat attendu : Liste de tous les challenges auxquels j'ai participé avec nombre de votes reçus

### Test 2 Liker un challenge
* Action : Sur la page d'un challenge, cliquer sur l’icône pouce
* Résultat attendu : Le compteur augmente de 1, changement de l’icône.

### Test 3 Liker une participation
* Action : Sur un challenge, cliquer sur l’icône pouce
* Résultat attendu : Le compteur augmente de 1, changement de l’icône pouce.
