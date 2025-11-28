import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// Provide a fallback DATABASE_URL for build time if not set
// This allows the build to complete even without a real database
const getDatabaseUrl = () => {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  // Fallback for build time (Vercel builds without DATABASE_URL)
  // This is safe because static pages don't actually query the database during build
  return "postgresql://user:password@localhost:5432/veyya?schema=public";
};

export const prisma = globalThis.prisma || new PrismaClient({
  datasources: {
    db: {
      url: getDatabaseUrl(),
    },
  },
});

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
