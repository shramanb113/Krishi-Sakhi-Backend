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
    try {
      await prisma.message.create({
        data: { userId, role, content },
      });
      console.log(`Saved message for user ${userId}, role: ${role}`);
    } catch (error) {
      console.error("Failed to save message:", error);
      throw new Error("Failed to save chat message");
    }
  }

  async getHistory(userId: string, limit: number = 10): Promise<Message[]> {
    try {
      const rows = await prisma.message.findMany({
        where: { userId },
        orderBy: { createdAt: "asc" },
        take: limit,
      });

      return rows.map((r: { role: string; content: any; createdAt: any }) => ({
        role: r.role as "user" | "assistant",
        content: r.content,
        timestamp: r.createdAt,
      }));
    } catch (error) {
      console.error("Failed to get chat history:", error);
      throw new Error("Failed to fetch chat history");
    }
  }

  async clearHistory(userId: string): Promise<void> {
    try {
      await prisma.message.deleteMany({
        where: { userId },
      });
      console.log(`Cleared all messages for user: ${userId}`);
    } catch (error) {
      console.error("Failed to clear chat history:", error);
      throw new Error("Failed to clear chat history");
    }
  }

  async getRecentMessages(limit: number = 20): Promise<Message[]> {
    try {
      const rows = await prisma.message.findMany({
        orderBy: { createdAt: "desc" },
        take: limit,
      });

      return rows.map(
        (r: { role: string; content: any; userId: any; createdAt: any }) => ({
          role: r.role as "user" | "assistant",
          content: r.content,
          userId: r.userId,
          timestamp: r.createdAt,
        })
      );
    } catch (error) {
      console.error("Failed to get recent messages:", error);
      throw new Error("Failed to fetch recent messages");
    }
  }

  async getMessageCount(userId: string): Promise<number> {
    try {
      return await prisma.message.count({
        where: { userId },
      });
    } catch (error) {
      console.error("Failed to get message count:", error);
      throw new Error("Failed to get message count");
    }
  }
}
