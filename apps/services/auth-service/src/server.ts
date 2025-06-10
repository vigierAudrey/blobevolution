// src/server.ts
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import authRoutes from './routes/auth';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use('/auth', authRoutes);

const PORT = parseInt(process.env.PORT || '4000', 10);
const HOST = '0.0.0.0';

// Fonction d'initialisation
async function startServer() {
  try {
    await prisma.$connect();
    console.log('Connexion DB OK 👍');

    // Si tu veux faire des seeds ou des vérifications ici, tu peux le faire

    app.listen(PORT, HOST, () => {
      console.log(`🚀 Auth‐service démarré: http://${HOST}:${PORT}/auth/ping`);
    });
  } catch (err) {
    console.error('Impossible de se connecter à la DB :', err);
    process.exit(1);
  }
}

startServer();
