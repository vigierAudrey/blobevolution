// src/server.ts
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import authRoutes from './routes/auth';
import sequelize from './db';

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

// Pour forcer l’écoute sur toutes les interfaces réseau :
const PORT = parseInt(process.env.PORT || '4000', 10);
const HOST = '0.0.0.0';

sequelize
  .authenticate()
  .then(() => console.log('Connexion DB OK 👍'))
  .then(() => sequelize.sync())
  .then(() => console.log('Base synchronisée ✅'))
  .then(() => {
    app.listen(PORT, HOST, () => {
      console.log(`🚀 Auth‐service démarré: http://${HOST}:${PORT}/auth/ping`);
    });
  })
  .catch(err => {
    console.error('Impossible de synchroniser la DB :', err);
    process.exit(1);
  });
