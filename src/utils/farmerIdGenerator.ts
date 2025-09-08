import { prisma } from "../infra/prismaClient";

export async function generateFarmerId(): Promise<string> {
  const MAX_RETRIES = 3;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const farmers = await prisma.farmer.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
        select: { farmerId: true },
      });

      const ksFarmers = farmers.filter((f) => f.farmerId.startsWith("KS"));
      let maxNumber = 0;

      if (ksFarmers.length > 0) {
        const numbers = ksFarmers.map((f) => {
          const num = parseInt(f.farmerId.replace("KS", ""));
          return isNaN(num) ? 0 : num;
        });
        maxNumber = Math.max(...numbers);
      }

      const nextId = `KS${(maxNumber + 1).toString().padStart(3, "0")}`;

      const existing = await prisma.farmer.findUnique({
        where: { farmerId: nextId },
      });

      if (!existing) {
        return nextId;
      }

      await new Promise((resolve) => setTimeout(resolve, 100 * attempt));
    } catch (error) {
      console.error(`Attempt ${attempt} failed to generate farmer ID:`, error);
      if (attempt === MAX_RETRIES) {
        // Final fallback
        return `KS_EMG${Date.now().toString().slice(-6)}`;
      }
    }
  }

  throw new Error("Failed to generate unique farmer ID after retries");
}
