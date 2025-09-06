import { injectable, inject } from "tsyringe";
import { ChatRepository } from "../repositories/chat.repository";
import { openai } from "../infra/openaiClient";
import { translateMlToEn, translateEnToMl } from "../infra/hfTranslator";
import { KERALA_SYSTEM_PROMPT, FEW_SHOT_EXAMPLES } from "../utils/prompt";
import { AppError } from "../middlewares/errorHandler";
import { IChatService } from "./interface";
import { Message } from "../domain/message";

@injectable()
export class ChatService implements IChatService {
  constructor(
    @inject(ChatRepository)
    private repo: ChatRepository
  ) {}

  async handle(userId: string, textMl: string): Promise<string> {
    try {
      // Malayalam -> English translation
      let textEn = textMl;
      let shouldTranslate = this.isMalayalam(textMl);

      if (shouldTranslate) {
        textEn = await translateMlToEn(textMl);
        console.log(`Translated ML->EN: "${textMl}" -> "${textEn}"`);
      }

      // Save user message
      await this.repo.save(userId, "user", textEn);

      // Load conversation history
      const history = await this.repo.getHistory(userId, 8);

      // Construct messages for OpenAI
      const messages = [
        { role: "system", content: KERALA_SYSTEM_PROMPT },
        ...FEW_SHOT_EXAMPLES.flatMap((ex) => [
          { role: "user", content: ex.user },
          { role: "assistant", content: ex.assistant },
        ]),
        ...history.map((m) => ({ role: m.role, content: m.content })),
        { role: "user", content: textEn },
      ];

      console.log("Sending to OpenAI:", {
        userId,
        messageCount: messages.length,
      });

      // Call OpenAI API
      const resp = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.2,
        max_tokens: 500,
      });

      const assistantEn =
        resp.choices?.[0]?.message?.content?.trim() ||
        "I apologize, but I am unable to provide a response at the moment. Please try again later.";

      console.log(`OpenAI response: "${assistantEn}"`);

      // Save assistant response
      await this.repo.save(userId, "assistant", assistantEn);

      // Translate back to Malayalam if needed
      if (shouldTranslate) {
        const assistantMl = await translateEnToMl(assistantEn);
        console.log(`Translated EN->ML: "${assistantEn}" -> "${assistantMl}"`);
        return assistantMl;
      }

      return assistantEn;
    } catch (error) {
      console.error("Chat service error:", error);

      if (error instanceof Error) {
        throw new AppError(500, `Chat processing failed: ${error.message}`);
      }

      throw new AppError(500, "Unexpected error during chat processing");
    }
  }

  async clearHistory(userId: string): Promise<void> {
    try {
      await this.repo.clearHistory(userId);
      console.log(`Cleared chat history for user: ${userId}`);
    } catch (error) {
      console.error("Failed to clear chat history:", error);
      throw new AppError(500, "Failed to clear chat history");
    }
  }

  async getHistory(userId: string, limit: number = 10): Promise<Message[]> {
    try {
      return await this.repo.getHistory(userId, limit);
    } catch (error) {
      console.error("Failed to get chat history:", error);
      throw new AppError(500, "Failed to fetch chat history");
    }
  }

  private isMalayalam(text: string): boolean {
    // Check for Malayalam Unicode range (approximately U+0D00 to U+0D7F)
    return /[\u0D00-\u0D7F]/.test(text);
  }
}
