"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
const db_1 = __importDefault(require("./db"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/auth', auth_1.default);
db_1.default
    .authenticate()
    .then(() => console.log('Connexion DB OK 👍'))
    .then(() => db_1.default.sync())
    .then(() => console.log('Base synchronisée ✅'))
    .then(() => {
    const port = Number(process.env.PORT) || 4000;
    app.listen(port, () => console.log(`Auth-service sur port ${port}`));
})
    .catch(err => {
    console.error('Impossible de synchroniser la DB :', err);
    process.exit(1);
});
