const express   = require('express');
const bcrypt    = require('bcrypt');
const jwt       = require('jsonwebtoken');
const { User }  = require('../models/user');

const router = express.Router();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.get('/ping', (req, res) => {
  res.send('pong');
});

// POST /auth/register
router.post('/register', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    // 1) Vérifier si l'email existe déjà
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    // 2) Hasher le mot de passe
    const passwordHash = await bcrypt.hash(password, 10);

    // 3) Créer l’utilisateur en DB
    const user = await User.create({
      email,
      passwordHash,
      role: role || 'rider'
    });

    // 4) Répondre succès
    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      user: { id: user.id, email: user.email, role: user.role }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// POST /auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) Chercher l’utilisateur
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Identifiants invalides' });
    }

    // 2) Vérifier le mot de passe
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(400).json({ message: 'Identifiants invalides' });
    }

    // 3) Générer un JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // 4) Retourner le token
    res.json({ token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

module.exports = router;
