// src/repositories/chat.repository.ts
import { injectable } from "tsyringe";
import { prisma } from "../infra/prismaClient";
import { Message } from "../domain/message";

@injectable()
export class ChatRepository {
  async save(
    userId: string,
    role: "user" | "assistant",
    content: string
  ): Promise<void> {
    await prisma.message.create({
      data: { userId, role, content },
    });
  }

  async getHistory(userId: string, limit = 10): Promise<Message[]> {
    const rows = await prisma.message.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
      take: limit,
    });

    return rows.map((r: { role: string; content: any }) => ({
      role: r.role as "user" | "assistant",
      content: r.content,
    }));
  }

  async clearHistory(userId: string): Promise<void> {
    await prisma.message.deleteMany({
      where: { userId },
    });
  }
}
