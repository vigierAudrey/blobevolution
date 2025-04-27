require('dotenv').config(); // charge tes variables d’environnement (.env)
const express   = require('express');
const { Sequelize } = require('sequelize');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json()); //middleware json> javaS> req.body

console.log('import de authRoutes →', authRoutes)
console.log('typeof authRoutes →', typeof authRoutes)

// Monte le router
app.use('/auth', authRoutes);

// Connexion à PostgreSQL
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  }
);

// Synchronise les modèles puis démarre le serveur
sequelize.sync()
  .then(() => {
    console.log('Base synchronisée ✅');
    app.listen(4000, () => {
      console.log('Auth-service running on port 4000 🚀');
    });
  })
  .catch(err => {
    console.error('Impossible de synchroniser la DB :', err);
  });
