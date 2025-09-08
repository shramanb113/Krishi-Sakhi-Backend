import OpenAI from "openai";
import { ENV } from "../config/env";
import { AppError } from "../middlewares/errorHandler";

export const openai = new OpenAI({
  apiKey: ENV.OPENAI_API_KEY,
});

// Helper function for chat completions with retry logic
export async function createChatCompletionWithRetry(
  messages: any[],
  maxRetries: number = 3,
  initialDelay: number = 1000
) {
  let lastError: any;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.2,
        max_tokens: 500,
      });

      return response;
    } catch (error: any) {
      lastError = error;

      if (error.status === 429) {
        // Rate limit - exponential backoff
        const delay = initialDelay * Math.pow(2, attempt - 1);
        console.warn(
          `Rate limited. Retrying in ${delay}ms (attempt ${attempt}/${maxRetries})`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else if (error.status >= 500) {
        // Server error - retry with backoff
        const delay = initialDelay * attempt;
        console.warn(
          `Server error. Retrying in ${delay}ms (attempt ${attempt}/${maxRetries})`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        // Client error - don't retry
        break;
      }
    }
  }

  throw new AppError(
    500,
    `OpenAI API failed after ${maxRetries} attempts: ${lastError?.message}`
  );
}

// Health check for OpenAI
export async function checkOpenAIHealth(): Promise<boolean> {
  try {
    await openai.models.list();
    return true;
  } catch (error) {
    console.error("OpenAI health check failed:", error);
    return false;
  }
}
