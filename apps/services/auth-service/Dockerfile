# 1. image de base légère
FROM node:18-slim

# 2. répertoire de travail dans le container
WORKDIR /usr/src/app

# 3. copier les manifests pour installer les dépendances
COPY package*.json ./

# 4. installer tout (y compris TypeScript et @types)
RUN npm install

# 5. copier le code source TS
COPY . .

# 6. compiler en JavaScript dans dist/
RUN npm run build

# 7. exposer le port sur lequel tu écoutes dans ton code (4000)
EXPOSE 4000

# 8. démarrer l’app compilée
CMD ["node", "dist/server.js"]