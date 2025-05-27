import { NextResponse } from 'next/server';
import NextAuth, { NextAuthOptions, DefaultSession } from "next-auth";
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";

// Interface pour l'utilisateur retourné par le microservice
interface User {
  id: number;
  email: string;
  role: 'rider' | 'professional' | 'admin';
}

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role?: 'rider' | 'professional' | 'admin';
    } & DefaultSession["user"]
  }

  interface User {
    role?: 'rider' | 'professional' | 'admin';
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const response = await fetch('http://localhost:4001/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password
            }),
          });

          if (!response.ok) {
            return null;
          }

          const userData: User = await response.json();
          
          // Adapter le format de l'utilisateur pour NextAuth
          return {
            id: String(userData.id),
            email: userData.email,
            role: userData.role,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt" as const,
  },
  jwt: {
    // optional: configure token encryption here
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as 'rider' | 'professional' | 'admin';
      }
      return session;
    },
  },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
