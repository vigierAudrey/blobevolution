"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
passport_1.default.serializeUser((user, done) => done(null, user));
passport_1.default.deserializeUser((obj, done) => done(null, obj));
const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const callbackURL = process.env.GOOGLE_CALLBACK_URL || 'http://localhost:4001/auth/google/callback';
passport_1.default.use(new passport_google_oauth20_1.Strategy({ clientID, clientSecret, callbackURL }, async (accessToken, refreshToken, profile, done) => {
    try {
        const account = await prisma.account.findUnique({
            where: {
                provider_providerAccountId: {
                    provider: 'google',
                    providerAccountId: profile.id,
                },
            },
            include: { user: true },
        });
        if (existingAccount) {
            return done(null, existingAccount.user);
        }
        const email = profile.emails?.[0]?.value;
        let user = email
            ? await prisma.user.findUnique({ where: { email } })
            : null;
        if (!user) {
            user = await prisma.user.create({
                data: {
                    email: email || `google-${profile.id}@example.com`,
                    passwordHash: '',
                    role: 'rider',
                },
            });
        }
        await prisma.account.create({
            data: {
                userId: user.id,
                provider: 'google',
                providerAccountId: profile.id,
                accessToken,
                refreshToken,
            },
        });
        return done(null, user);
    }
    catch (err) {
        return done(err);
    }
}));
exports.default = passport_1.default;
