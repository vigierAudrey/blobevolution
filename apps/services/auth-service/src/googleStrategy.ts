import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import prisma from './db';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
passport.serializeUser((user: any, done) => done(null, user));
passport.deserializeUser((obj: any, done) => done(null, obj));

const clientID = process.env.GOOGLE_CLIENT_ID as string;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET as string;
const callbackURL = process.env.GOOGLE_CALLBACK_URL || 'http://localhost:4001/auth/google/callback';

passport.use(
  new GoogleStrategy(
    { clientID, clientSecret, callbackURL },
    async (accessToken: string, refreshToken: string, profile: Profile, done) => {
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
      } catch (err) {
        return done(err as Error);
      }
    },
  ),
);

export default passport;