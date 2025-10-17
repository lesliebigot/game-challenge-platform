# Dictonnaire de données

## Tables principales

### Table Utilisateur

| Attribut            | Type         | Clé          | Description                     |
|---------------------|--------------|--------------|---------------------------------|
| id_utilisateur      | INT          | PK           | Identifiant unique              |
| nom                 | TEXT(50)  |              |               Nom de l'utilisateur                  |
| prenom              | TEXT(50)  |              |                Prenom de l'utilisateur                 |
| email               | TEXT(100) | UK           | Unique   / Email de l'utilisateur                       |
| mot_de_passe        | TEXT(255) |              |            Mot de passe de l'utilisateur                     |
| date_naissance      | DATE         |              |                 Date de naissance de l'utilisateur                |
| id_role             | INT          | FK(ROLE)     | Clé étrangère vers ROLE         |

---
### Table Challenge

| Attribut            | Type         | Clé          | Description                     |
|---------------------|--------------|--------------|---------------------------------|
| id_challenge        | INT          | PK           | Identifiant unique              |
| nom                 | TEXT(100) |              |       Titre du challenge                          |
| description         | TEXT         |              |         Description du challenge                        |
| id_utilisateur      | INT          | FK(UTILISATEUR) | Auteur du challenge          |
| id_jeu              | INT          | FK(JEU)      | Jeu associé                     |

---
### Table Jeu

| Attribut            | Type         | Clé          | Description                     |
|---------------------|--------------|--------------|---------------------------------|
| id_jeu              | INT          | PK           | Identifiant unique              |
| nom                 | TEXT(100) |              |            Titre du jeu                     |
| description         | TEXT         |              |       Description du jeu                          |
| image               | TEXT(255) |              | URL ou chemin de l’image        |
| id_editeur          | INT          | FK(EDITEUR)  | Editeur du jeu                  |
| id_genre            | INT          | FK(GENRE)    | Genre du jeu                    |

---
### Table Editeur


| Attribut            | Type         | Clé          | Description                     |
|---------------------|--------------|--------------|---------------------------------|
| id_editeur          | INT          | PK           | Identifiant unique              |
| nom                 | TEXT(100) |              |           Nom de l'éditeur du jeu                      |

---
### Table Genre

| Attribut            | Type         | Clé          | Description                     |
|---------------------|--------------|--------------|---------------------------------|
| id_genre            | INT          | PK           | Identifiant unique              |
| nom                 | TEXT(50)  |              |      Genre du jeu                           |

---
### Table Plateforme

| Attribut            | Type         | Clé          | Description                     |
|---------------------|--------------|--------------|---------------------------------|
| id_plateforme       | INT          | PK           | Identifiant unique              |
| nom                 | TEXT(50)  |              |        Plateforme(s) du jeu                         |

---
### Table Rôle

| Attribut            | Type         | Clé          | Description                     |
|---------------------|--------------|--------------|---------------------------------|
| id_role             | INT          | PK           | Identifiant unique              |
| nom                 | TEXT(50)  |              |         Rôle de l'utilisateur                        |

---

## Tables d’association (pour les relations plusieurs-à-plusieurs)

### Table d'association PARTICIPE entre les tables Utilisateur et Challenge

| Attribut            | Type         | Clé          | Description                     |
|---------------------|--------------|--------------|---------------------------------|
| id_utilisateur      | INT          | PK, FK(UTILISATEUR) |          Identifiant Utilisateur            |
| id_challenge        | INT          | PK, FK(CHALLENGE)  |          Identifiant Challenge               |
| preuve_video        | TEXT(255) |              | Lien vers la preuve vidéo       |

---
### Table d'association AIME entre les tables Utilisateur et Challenge

| Attribut            | Type         | Clé          | ComDescription                  |
|---------------------|--------------|--------------|---------------------------------|
| id_utilisateur      | INT          | PK, FK(UTILISATEUR) |   Identifiant utilisateur                      |
| id_challenge        | INT          | PK, FK(CHALLENGE)  |            Identifiant Challenge             |

---
### Table d'association PREFERE entre les tables Utilisateur et Jeu

| Attribut            | Type         | Clé          | ComDescription                  |
|---------------------|--------------|--------------|---------------------------------|
| id_utilisateur      | INT          | PK, FK(UTILISATEUR) |     Identifiant utilisateur                                  |
| id_jeu              | INT          | PK, FK(JEU)  |      Identifiant Jeu                   |

---
### Table d'association OPERE entre les tables Jeu et Plateforme

| Attribut            | Type         | Clé          | ComDescription                  |
|---------------------|--------------|--------------|---------------------------------|
| id_jeu              | INT          | PK, FK(JEU)  |    Identifiant Jeu                             |
| id_plateforme       | INT          | PK, FK(PLATEFORME) |            Identifiant Plateforme             |

