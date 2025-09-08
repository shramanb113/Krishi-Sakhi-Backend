// src/repositories/chat.repository.ts
import { injectable } from "tsyringe";
import { prisma } from "../infra/prismaClient";
import { Message } from "../domain/message";
import { IChatRepository } from "./interface";

@injectable()
export class ChatRepository implements IChatRepository {
  async save(
    userId: string,
    role: "user" | "assistant",
    content: string
  ): Promise<void> {
    try {
      await prisma.message.create({
        data: { userId, role, content },
      });
    } catch (error) {
      console.error("Failed to save message:", error);
      throw new Error("Failed to save chat message");
    }
  }

  async findHistory(userId: string, limit: number = 10): Promise<Message[]> {
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
    } catch (error) {
      console.error("Failed to clear chat history:", error);
      throw new Error("Failed to clear chat history");
    }
  }

  async findRecentMessages(limit: number = 20): Promise<Message[]> {
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

  async countMessages(userId: string): Promise<number> {
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
