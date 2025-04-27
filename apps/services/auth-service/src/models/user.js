// apps/services/auth-service/src/models/user.js
const { DataTypes }   = require('sequelize');
const sequelize       = require('../db');   // on importe l’instance du point 1

// Définition du modèle "User"
const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('rider', 'professional', 'admin'),
    allowNull: false,
    defaultValue: 'rider'
  }
}, {
  tableName: 'Users',
  timestamps: true      // createdAt / updatedAt
});

// Exporte l’objet User
module.exports = { User };
