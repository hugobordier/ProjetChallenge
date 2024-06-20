# ProjetChallenge

### Dépendances

* Node.js : https://nodejs.org/fr
* npm : https://docs.npmjs.com/getting-started
* MariaDB : https://mariadb.org/download/?t=mariadb&p=mariadb&r=11.4.2&os=windows&cpu=x86_64&pkg=msi&mirror=icam

### Installation

1. Naviguez vers le répertoire racine de 'the homehelp site fin2' et 'tests4'.
2. Exécutez les commandes suivantes pour installer les dépendances nécessaires :
```bash
npm init -y
npm install body-parser cors mysql express
```
# Configuration de la Base de Données

Importez le fichier 'base1(3).sql' fourni dans MariaDB.
Utilisez les identifiants suivants pour vous connecter :
- Nom d'utilisateur : root
- Mot de passe : admin
Assurez-vous que le serveur MariaDB est en cours d'exécution sur le port 3306.

# Exécution du programme

Naviguez vers le répertoire racine de 'the homehelp site fin2' et 'tests4'.
Exécutez la commande suivante dans des terminaux séparés :
```bash
npm start
```