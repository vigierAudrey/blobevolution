# --- 1. étape de build (builder) ---
    FROM node:23-slim AS builder
    WORKDIR /app
    
    # 1.1 Installer toutes les dépendances
    COPY package*.json ./
    RUN npm ci
    
    # 1.2 Générer le client Prisma (lecture de schema.prisma)
    COPY prisma ./prisma
    RUN npx prisma generate
    
    # 1.3 (optionnel) Appliquer les migrations en prod
    ARG DATABASE_URL
    ENV DATABASE_URL=$DATABASE_URL

    RUN npx prisma migrate deploy

    
    # 1.4 Compiler Next.js (Tailwind, TS, etc.)
    COPY . .
    RUN npm run build
    
    
    # --- 2. étape de runtime (runner) ---
    FROM node:23-slim AS runner
    WORKDIR /app
    
    # 2.1 Ne copier que les dépendances de prod
    COPY package*.json ./
    RUN npm ci --production
    
    # 2.2 Récupérer les assets générés
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/prisma ./prisma       # si tu veux garder le client Prisma en prod
    
    # 2.3 Indiquer qu’on est en production
    ENV NODE_ENV=production
    
    # 2.4 Exposer le port Next.js (par défaut 3000)
    EXPOSE 3000
    
    # 2.5 Lancer Next.js
    CMD ["npm","start"]
    
    