// apps/frontend/src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

declare global {
  // éviter de recréer plusieurs instances en dev
  // @ts-ignore
  var prisma: PrismaClient
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query"],  // optionnel
  });

if (process.env.NODE_ENV !== "production") {
  // @ts-ignore
  global.prisma = prisma;
}
