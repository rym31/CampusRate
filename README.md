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
- Persistance : fichier JSON (node:fs/promises)

## Installation
```bash
# Cloner le dépôt
$ git clone https://github.com/rym31/CampusRate.git
# Allez dans le projet
$ cd CampusRate
# Installer les dépendances
$ npm i
```

## Configuration

Copier .env.example dans .env et ajuster au besoin :

- PORT= le port sur lequel l'API sera accessible (par défaut 3000)
- PLACES_FILE_PATH= le chemin vers le fichier de données
- REVIEWS_FILE_PATH= le chemin vers le fichier de données

## Démarrage
```
$ npm run start:dev
```
## Documentation Swagger/OpenAPI

- Documentation Swagger : http://localhost:3000/docs
- Documentation OpenAPI : http://localhost:3000/docs/openapi.json

## Design de l'API
Le design de l'API est dans le lien suivant : [Design API](./documentations/design-api.png)

## Lint et compilation
```
# Lint
$ npm run lint

# Compiler
$ npm run build
```









