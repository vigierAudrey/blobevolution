# 1. Choix de l’image de base
FROM node:18-alpine

# 2. Définir le répertoire de travail
WORKDIR /usr/src/app

# 3. Copier les définitions de dépendances et installer
COPY package*.json ./
RUN npm install

# 4. Copier le code source
COPY . .

# 5. Exposer le port que ton service écoute
EXPOSE 4000

# 6. Commande de démarrage
CMD ["npx", "nodemon", "src/server.js"]
