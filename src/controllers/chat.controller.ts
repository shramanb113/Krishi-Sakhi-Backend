// src/controllers/chat.controller.ts
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ChatService } from "../services/chat.service";
import { AppError } from "../middlewares/errorHandler";

export class ChatController {
  private chatService = container.resolve(ChatService);

  async sendMessage(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      const { message } = req.body;

      if (!userId) {
        throw new AppError(400, "User ID is required");
      }

      const response = await this.chatService.handle(userId, message);

      res.json({
        success: true,
        data: {
          reply: response,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error("Chat controller error:", error);
      throw new AppError(500, "Failed to process chat message");
    }
  }

  async clearChatHistory(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;

      if (!userId) {
        throw new AppError(400, "User ID is required");
      }

      await this.chatService.clearHistory(userId);

      res.json({
        success: true,
        message: "Chat history cleared successfully",
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.error("Clear chat history error:", error);
      throw new AppError(500, "Failed to clear chat history");
    }
  }
}
