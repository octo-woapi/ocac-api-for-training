# ocac-api-for-training

## installation

cloner le dépôt

```bash
git clone https://github.com/octo-woapi/ocac-api-for-training.git
# puis acceder au dossier
cd ocac-api-for-training
```

installer les dépendances

```bash
npm install
```

lancer les tests 
```bash
npm test
```

lancer le serveur

```bash
npm start
```

par défaut, le serveur écoute sur la socket [http://0.0.0.0:3000](http://0.0.0.0:3000)

## configuration

Le port et le host peuvent être modifiés si besoin.

pour cela, créé un fichier `.env` à la racine du projet.

```bash
touch .env
```

Dans le fichier d'environnement, définir `HOST` et `PORT` pour paraméter le serveur hôte et le port découte:

```.env
HOST=127.0.0.1
PORT=3030
```

enfin redémarrer le serveur

```bash
npm restart
```
