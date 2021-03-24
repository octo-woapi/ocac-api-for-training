# Pré-requis

- Installer git : https://git-scm.com/book/fr/v2/D%C3%A9marrage-rapide-Installation-de-Git
- Installer VS Code : https://code.visualstudio.com/download
- Installer node : https://nodejs.org/fr/download/

# Déroulement du TP

## Etape 1 : start server

- Récupérer le projet et suivre le `Readme` pour lancer le projet.
- Aller dans votre navigateur à l'URL : `http://0.0.0.0:3000/` : Que voyez-vous ?
- Analyser le fichier `index.js`

## Etape 2 : Ajouter route GET /produits

- Commencer à la fin de l'étape 1 : `git checkout step-1`
- Créer un test sur la route `/produits` (le test passe au rouge => TDD)
- Créer un controller pour lister les produits
- Dans le controlleur, ajouter une route qui renvoit la liste des produits
- Le test passe au vert (TDD)
- Aller dans le navigateur : `http://0.0.0.0:3000/produits`

## Etape 3 : Structurer son code

- Commencer à la fin de l'étape 2 : `git checkout step-2`
- Extraire la lecture des données métier dans un dossier `business` spécifique
- Extraire les données dans un fichier dédié

## Etape 4 : Formatter les données exposées à renvoyer

- Commencer à la fin de l'étape 3 : `git checkout step-3`
- ! Toujours en TDD
- Dans le controller: ajouter une fonction dont la responsabilité est de formater les données à renvoyer.
- Dans cette fonction, supprimer les attributs `code_interne` et `description` qui n'ont pas de raison d'être exposé sur la route `GET /produits`.

## Etape 5 : Ajouter la route détail produit

- Commencer à la fin de l'étape 4 : `git checkout step-4`
- Créer un test sur une nouvelle route `GET /produits/{identifiant-produit}`, exemple : `GET /produits/16146a21-c799-4d01-a7be-8965682d2549`. (Le test passe au rouge)
- Sur le modèle du `GET /produits`, créer un controller pour afficher le détail d'un produit qui s'appuie sur la partie business (inclure la propriété `description`)

## Etape 6 : Enrichissement de l'interceptor

- Commencer à la fin de l'étape 5 : `git checkout step-5`
- Toujours en TDD, ajouter la vérification des données en entrée : l'ID en entrée n'est pas au bon format, la route renvoit une 400
- Renvoyer une erreur 404 dans le cas où un produit n'est pas trouvé

## Etape 7 : Déployer sur Heroku

- Commencer à la fin de l'étape 6 : `git checkout step-6`
- Rendez-vous heroku.com
- Après avoir créé son compte, vous pouvez créer puis déployer une application à partir de son code source publié sur github

## Etape 8 : Ajouter une base de données SQLite 

- Déplacez-vous à l'étape 8 du TP : `git checkout step-8`
- Questions : 
    - A quoi servent les librairies `sqlite3` et `sequelize` ? 
    - Quel est le rôle des `models` ? 
    - A quel moment la base de données est-elle impactée par les modifications ? 
    - Utiliseriez-vous `sqlite3` en production ? 
    - Quelles sont les limites d'une librairie comme `sequelize` ?
