import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
prisma.$connect().catch((e: any) => {
  console.error("Prisma connection error:", e);
  process.exit(1);
});

export async function disconnectPrisma() {
  await prisma.$disconnect();
}
