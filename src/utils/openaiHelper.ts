// src/utils/openaiHelpers.ts
import {
  ChatCompletionSystemMessageParam,
  ChatCompletionUserMessageParam,
  ChatCompletionAssistantMessageParam,
} from "openai/resources/chat/completions";

export type OpenAIMessage =
  | ChatCompletionSystemMessageParam
  | ChatCompletionUserMessageParam
  | ChatCompletionAssistantMessageParam;

export function createOpenAIMessage(
  role: "system" | "user" | "assistant",
  content: string
): OpenAIMessage {
  return { role, content };
}

export function createMessagesFromHistory(
  history: Array<{ role: string; content: string }>
): OpenAIMessage[] {
  return history.map((m) => {
    const role = (
      m.role === "user" || m.role === "assistant" ? m.role : "user"
    ) as "user" | "assistant";
    return createOpenAIMessage(role, m.content);
  });
}
