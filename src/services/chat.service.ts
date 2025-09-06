// src/services/chat.service.ts
import { injectable, inject } from "tsyringe";
import { ChatRepository } from "../repositories/chat.repository";
import { openai } from "../infra/openaiClient";
import { translateMlToEn, translateEnToMl } from "../infra/hfTranslator";
import { KERALA_SYSTEM_PROMPT, FEW_SHOT_EXAMPLES } from "../utils/prompt";
import { AppError } from "../middlewares/errorHandler";
import { IChatService } from "./interface";

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
        ...history.map((m: { role: any; content: any }) => ({
          role: m.role,
          content: m.content,
        })),
        { role: "user", content: textEn },
      ];

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

      // Save assistant response
      await this.repo.save(userId, "assistant", assistantEn);

      // Translate back to Malayalam if needed
      if (shouldTranslate) {
        return await translateEnToMl(assistantEn);
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
    } catch (error) {
      console.error("Failed to clear chat history:", error);
      throw new AppError(500, "Failed to clear chat history");
    }
  }

  private isMalayalam(text: string): boolean {
    // Check for Malayalam Unicode range (approximately U+0D00 to U+0D7F)
    return /[\u0D00-\u0D7F]/.test(text);
  }
}
