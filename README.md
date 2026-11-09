# CampusRate
CampusRate est une API REST qui permet de gérer des endroits et leurs avis.
Elle permet de crééer des endroits, de les consulter, de les modifier et de les supprimer.

## Fonctionnalités
- Gestion des endroits (CRUD)
- Gestion des avis (CRUD)
- Filtrage 
- Pagination 
- Validation 
- Gestion des erreurs avec des codes HTTP
- Documentation de l'API avec Swagger / OpenAPI

## Technologies

- NestJS
- TypeScript
- Validation : class-validator / class-transformer
- Documentation : Swagger / OpenAPI
- Persistance : MongoDB / Mongoose
- Sécurité : Helmet, CORS, @nestjs/throttler

## Installation
```bash
# Cloner le dépôt
$ git clone https://github.com/rym31/CampusRate.git
# Allez dans le projet
$ cd CampusRate
# Installer les dépendances
$ npm i
```

## Configuration de MongoDB

Installer MongoDB Community Server 
## Configuration

Copier .env.example dans .env et ajuster au besoin :

- PORT= port de l'API (par défaut 3000)
- NODE_ENV= development
- MONGO_URI= URI MongoDB (ex. mongodb://localhost:27017/campusrate-dev)
- CORS_ORIGINS= origines autorisées, séparées par des virgules

## Démarrage
```
$ npm run start:dev
```
## Documentation Swagger/OpenAPI

- Documentation Swagger : http://localhost:3000/docs
- Documentation OpenAPI : http://localhost:3000/docs/openapi.json

## Principales validations

- Propriétés inconnues ou contrôlées par le serveur (id, createdAt, updatedAt, averageRating, reviewCount) : 400
- Endroit : name (max 100), description (max 1000), category (enum) et address (max 200, unique) obligatoires
- Appréciation : authorName (max 50), rating (entier de 1 à 5) et comment (max 1000) obligatoires
- Les identifiants sont des ObjectId MongoDB (24 caractères hexadécimaux)

## Fonctionnalités optionnelles implantées

- M1 : Ajouter un index pertinent, un index unique et gérer correctement une duplication : index sur reviews.placeId, index unique sur places.address (409 en cas de doublon)
- M2 : Réaliser une agrégation MongoDB pertinente : calcul de averageRating et reviewCount
- M3 : Justifier le choix entre référence et imbrication : les reviews sont référencées (placeId) et non imbriquées, car elles sont consultées seules et leur nombre n'est pas borné
- H1 : Ajouter du rate limiting : 100 requêtes/minute (429)
- H2 : Limiter la taille du corps HTTP et gérer 413 : corps JSON limité à 5 Ko
- H3 : Vérifier le Content-Type et gérer 415 : application/json obligatoire pour POST et PATCH
- H5 : Restreindre explicitement les méthodes HTTP autorisées : GET, POST, PATCH, DELETE
- T1 : Expliquer correctement le rôle de HTTPS dans le README : HTTPS chiffre les échanges entre le client et l'API (TLS). Il est requis en production. CampusRate utilise HTTP seulement en développement local.
- P2 : Sélection explicite des propriétés modifiables : les champs modifiables sont copiés un par un avant d'être envoyés à MongoDB
- P3 : Ajouter une protection supplémentaire contre les injections NoSQL : sanitizeFilter de Mongoose
- L1 : Journalisation des opérations : INFO : méthode, URL et durée de chaque requête

## Limitations connues

- Aucune authentification
- Aucun tests unitaires 

## Design de l'API
Le design de l'API est dans le lien suivant : [Design API](./documentations/design-api.png)

## Lint et compilation
```
# Lint
$ npm run lint

# Compiler
$ npm run build
```

## Vidéo de démonstration

Démonstration des scénarios de vérification du TP2 : [Voir la vidéo](https://youtu.be/vmtMpLCG7Kc)








