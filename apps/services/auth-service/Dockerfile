# --- 1. Build stage ---
    FROM node:18-slim AS builder
    WORKDIR /usr/src/app
    
    # 1.1 On copie seulement package*.json et on installe
    COPY package*.json ./
    RUN npm ci
    
    # 1.2 On copie le dossier Prisma et on génère le client
    COPY prisma ./prisma
    RUN npx prisma generate
    
    # 1.3 On copie le code TypeScript, le tsconfig, on compile
    COPY src ./src
    COPY tsconfig.json ./
    RUN npm run build
    
    # --- 2. Runtime stage ---
    FROM node:18-slim AS runner
    WORKDIR /usr/src/app
    
    # 2.1 On ne copie que package*.json et on installe en mode production
    COPY package*.json ./
    RUN npm ci --production
    
    # 2.2 On importe le build et le client Prisma depuis le builder
    COPY --from=builder /usr/src/app/dist ./dist
    COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma
    
    # 2.3 Variables d'env et port
    ENV NODE_ENV=production
    # (La DATABASE_URL sera injectée par docker-compose)
    EXPOSE 4000
    
    # 2.4 Démarrage
    CMD ["node", "dist/server.js"]
    