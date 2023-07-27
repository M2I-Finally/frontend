# Documentation JSON-SERVER
Dans le dossier `src/app/mockupData` nous avons un fichier db.json qui mock notre base de données.
Afin de faire fonctionner ce jeu de données, il faut lancer un serveur grâce à la dépendance json-server.

Pour que le serveur fonctionne il faut :
- `npm install -g json-server` pour installer la dépendance json-server
- `json-server --watch db.json` va démarrer notre serveur avec le fichier json (veillez à bien être dans le dossier)

En regardant le fichier `mockupData/product.service.ts` on remarque que l'url `http://localhost:3000/products`
contient notre jeu de données concernant les produits.
C'est un observable qui est retourné, il faut donc y faire les manipulations usuelles.

