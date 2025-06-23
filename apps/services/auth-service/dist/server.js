"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const auth_1 = __importDefault(require("./routes/auth"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rate limiter for auth routes
const authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000, // 1 minute
    max: 5,
    standardHeaders: true,
    legacyHeaders: false
});
app.use('/auth/login', authLimiter);
app.use('/auth/register', authLimiter);
app.use('/auth', auth_1.default);
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
    }
    catch (err) {
        console.error('Impossible de se connecter à la DB :', err);
        process.exit(1);
    }
}
startServer();
