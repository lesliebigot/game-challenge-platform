# Use cases

![]https://editor.plantuml.com/uml/ZPHDSi8m38NtEeMMiCW5M33q4EtUZKKGTUoCVsOwq_OktN8EBbOn2M07dEbEyViKlUGfsOMeV4oz0KFxYD6Xv-uGKREdDhApi7cDR3YeICblOFF6WQVoHVTiEKG_QP2Hs3JVMxp2KAAZcD40bsdATeRm2rQjFv_8OxBOkdw8j8PL8Acj5OgyN4eTaf4QfSEGqkJVdVAwb1JAW4YeAU2HqcTTRG_A6BATb8Fo5rXOST6cuNpoGWTdiNVoNaY042wMCfVNRZdjdUOzFvw7D0oU--bMkMBuOyJ7gRVBibryYfti5OZFo2qFXEVV-Z2NiEP87LsA8tBdRpQAetIFQWq_0DTScsRx9AnSBNCh-geHLgZ7DFy1FWisRrlEE5lHwM7A46RwqusOCPKqvfDgspBZojsfYGitMDYYyfijNTNNwh5hSS-MXimN3s17Lik_wWy0()

## Use Case 1 : Créer un compte

### Acteur principal : Visiteur

* __Objectif__ : Créer un compte pour accéder aux fonctionnalités réservées à l'utilisateur
* __Préconditions__ : être sur le site et accéder à la page d'inscription via un lien dans header.
* __Scénario principal__ :
  * Le visiteur renseigne ses informations (pseudo, email, mot de passe) dans un formulaire d'inscription.
  * Le système vérifie la validité des champs.
  * Le système enregistre le compte. Le système envoie une confirmation de création de compte.
* __Alternatives / erreurs__ :
  * Champs invalides → message d’erreur : adresse mail invalide. le mot de passe ne correspond pas au shéma de validation.
  * Email déjà existant → erreur “email déja utilisé !”.
* __Résultat attendu__ :
  * Le compte est créé et le visiteur devient utilisateur. Redirection page profil.

## Use Case 2: Consulter le site

### Acteur principal: Visiteur

* __Objectif__: voir les challenges les plus populaires sur la page d'accueil
* __Préconditions__ : être sur le site.
* __Scénario principal__ :
  * Le visiteur consulte la liste des jeux pour voir les challenges associés et consulter le détail d'un challenge.
* __Alternatives / erreurs__ :
  * Si clique sur particper à un challenge ou créer un challenge, message : "il faut etre inscrit pour effectuer cette action".
* __Résultat attendu__ :
  * redirection vers page création de compte.

## Use Case 3 : Se connecter à son compte

### Acteur principal: Utilisateur

* __Objectif__: Se connecter à son compte utilisateur
* __Préconditions__ : Avoir créer un compte
* __Scénario principal__ :
  * L'utilisateur renseigne ces identifiants de connexions et accède à la page de son profil
* __Alternatives / erreurs__ :
  * L'utilisateur entre des informations de connexions érronées : message d'erreur.
* __Résultat attendu__ :
  * redirection vers la page de son profil.

## Use Case 4 : Créer un challenge

### Acteur principal : Utilisateur

* __Objectif__: Créer un challenge pour défier d'autres utilisateurs.
* __Préconditions__ : Etre connecté.
* __Scénario principal__ :
  * Soit sur la page de liste de jeux soit sur la page détails d'un jeu : cliquer sur le bouton "Créer un challenge". Redirection vers le formulaire de création d'un challenge.
* __Alternatives / erreurs__ :
  * Si utilisateur non connecté, redirection vers la page de connexion, message : "il faut etre connecté pour effectuer cette action".
* __Résultat attendu__ :
  * Création du challenge dans le système et redirection vers page détails du jeu.

## Use Case 5 : Modifier/supprimer son challenge

### Acteur principal: Utilisateur

* __Objectif__: Modifier/supprimer un challenge dont on est l'auteur.
* __Préconditions__ : Etre connecté, être sur la page de son propre challenge.
* __Scénario principal__ :
  * cliquer sur les boutons modifier ou supprimer. Redirection vers la page du challenge.
* __Alternatives / erreurs__ :
  * Si utilisateur non connecté, redirection vers la page de connexion, message : "il faut etre connecté pour effectuer cette action".
* __Résultat attendu__ :
  * Création du challenge dans le système et redirection vers page détails du jeu.
  

## Use Case 6: Participer à un challenge

### Acteur principal: Utilisateur

* __Objectif__: Participer à un challenge existant.
* __Préconditions__ : Etre connecté, le challenge est créé.
* __Scénario principal__ :
  * Soit sur la page d'un challenge, soit de la page de la page des challenges populaires : cliquer sur le bouton "ajouter le lien vers votre video". Redirection vers la page du challenge
* __Alternatives / erreurs__ :
  * Si utilisateur non connecté, redirection vers la page de connexion, message : "il faut etre connecté pour effectuer cette action".
* __Résultat attendu__ :
  * Ajout 

## Use Case 7 : Modifier/supprimer sa participation à un challenge

* __Objectif__: Modifier/supprimer sa participation à un challenge
* __Préconditions__ : Etre connecté.
* __Scénario principal__ :
  * Sur la page détails d'un challenge : cliquer sur le bouton "Modifier ou supprimer sa participation". Redirection vers les détails d'un challenge.
* __Alternatives / erreurs__ :
  * Si utilisateur non connecté, redirection vers la page de connexion, message : "il faut etre connecté pour effectuer cette action".
* __Résultat attendu__ :
  * Modif ou suppression de la participation dans le système. Redirection vers les détails d'un challenge.

## Use Case 8 : Liker un challenge

### Acteur principal: Utilisateur

* __Objectif__: Liker un challenge
* __Préconditions__ : Etre connecté.
* __Scénario principal__ :
  * Sur la page du challenge, cliquer sur le bouton "Liker".
* __Alternatives / erreurs__ :
  * Si utilisateur non connecté, redirection vers la page de connexion, message : "il faut etre connecté pour effectuer cette action".
* __Résultat attendu__ :
  * Changement de l'icone 'liker'.

## Use Case 9 : Supprimer ou modifier un challenge

### Acteur principal: Administrateur

* __Objectif__: Modérer les challenges inappropriés.
* __Préconditions__ : Etre connecté en tant qu'administrateur.
* __Scénario principal__ :
  * Sur la page du challenge, cliquer sur les boutons supprimer ou modifier le challenge.
* __Alternatives / erreurs__ :
  * ???
* __Résultat attendu__ :
  * Challenge supprimé ou modifié dans le système. Redirection vers la page du challenge.



## Evolutions possibles

### Use Case : Voter pour une participation à un challenge

#### Acteur principal: Utilisateur

* __Objectif__: Evaluer un challenge avec une note de 1 à 5.
* __Préconditions__ : Etre connecté.
* __Scénario principal__ :
  * Sur la page du challenge, cliquer sur le bouton de notation d'une preuve.
* __Alternatives / erreurs__ :
  * Si utilisateur non connecté, redirection vers la page de connexion, message : "il faut etre connecté pour effectuer cette action".
* __Résultat attendu__ :
  * Ajout de la note dans le systeme, modification de la moyenne de la preuve et changement de l'icone de notation.

