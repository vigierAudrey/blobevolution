"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../db"));
const router = (0, express_1.Router)();
// simple healthcheck
router.get('/ping', (_req, res) => {
    res.send('pong');
});
// register
router.post('/register', async (req, res) => {
    console.log('BODY →', req.body);
    try {
        const { email, password, role } = req.body;
        const existing = await db_1.default.user.findUnique({ where: { email } });
        if (existing) {
            return res.status(400).json({ message: 'Email déjà utilisé' });
        }
        const passwordHash = await bcrypt_1.default.hash(password, 10);
        const user = await db_1.default.user.create({
            data: {
                email,
                passwordHash,
                role: role ?? 'rider'
            }
        });
        return res.status(201).json({
            message: 'Utilisateur créé avec succès',
            user: { id: user.id, email: user.email, role: user.role }
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
});
// login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await db_1.default.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Identifiants invalides' });
        }
        const valid = await bcrypt_1.default.compare(password, user.passwordHash);
        if (!valid) {
            return res.status(400).json({ message: 'Identifiants invalides' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
});
// middleware to protect routes
function authenticate(req, res, next) {
    const header = req.headers.authorization;
    if (!header)
        return res.sendStatus(401);
    const [, token] = header.split(' ');
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        return next();
    }
    catch {
        return res.sendStatus(403);
    }
}
// protected profile endpoint
router.get('/profile', authenticate, async (req, res) => {
    try {
        const { id } = req.user;
        const user = await db_1.default.user.findUnique({
            where: { id },
            select: { id: true, email: true, role: true }
        });
        if (!user) {
            return res.sendStatus(404);
        }
        return res.json(user);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
});
exports.default = router;