import axios from "axios";
import { ENV } from "../config/env";
import { AppError } from "../middlewares/errorHandler";

const HF_BASE = "https://api-inference.huggingface.co/models";
const TIMEOUT = 30000;

interface HFTranslationResponse {
  translation_text: string;
}

async function callHF(
  modelId: string,
  text: string,
  maxRetries: number = 2
): Promise<any> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (ENV.HF_API_KEY) {
    headers["Authorization"] = `Bearer ${ENV.HF_API_KEY}`;
  }

  let lastError: any;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const resp = await axios.post(
        `${HF_BASE}/${modelId}`,
        { inputs: text },
        {
          headers,
          timeout: TIMEOUT,
          validateStatus: (status) => status < 500, // Don't throw for 4xx errors
        }
      );

      if (resp.status === 200) {
        return resp.data;
      }

      if (resp.status === 503) {
        // Model loading - retry after delay
        const delay = 2000 * attempt;
        console.warn(
          `Model ${modelId} is loading. Retrying in ${delay}ms (attempt ${attempt}/${maxRetries})`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      throw new Error(`HTTP ${resp.status}: ${resp.statusText}`);
    } catch (error: any) {
      lastError = error;

      if (error.code === "ECONNABORTED") {
        console.warn(
          `Timeout for ${modelId}. Retrying (attempt ${attempt}/${maxRetries})`
        );
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
      } else if (error.response?.status === 429) {
        // Rate limit - exponential backoff
        const delay = 1000 * Math.pow(2, attempt - 1);
        console.warn(
          `Rate limited. Retrying in ${delay}ms (attempt ${attempt}/${maxRetries})`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        break;
      }
    }
  }

  throw new AppError(
    500,
    `Hugging Face API failed for ${modelId}: ${lastError?.message}`
  );
}

export async function translateMlToEn(text: string): Promise<string> {
  try {
    const out = await callHF("Helsinki-NLP/opus-mt-ml-en", text);

    if (Array.isArray(out) && out[0]?.translation_text) {
      return out[0].translation_text;
    }

    if (typeof out === "object" && out.translation_text) {
      return out.translation_text;
    }

    return String(out);
  } catch (error) {
    console.warn(
      "Malayalam to English translation failed, using original text"
    );
    return text; // Fallback to original text
  }
}

export async function translateEnToMl(text: string): Promise<string> {
  try {
    const out = await callHF("Helsinki-NLP/opus-mt-en-ml", text);

    if (Array.isArray(out) && out[0]?.translation_text) {
      return out[0].translation_text;
    }

    if (typeof out === "object" && out.translation_text) {
      return out.translation_text;
    }

    return String(out);
  } catch (error) {
    console.warn(
      "English to Malayalam translation failed, using original text"
    );
    return text; // Fallback to original text
  }
}

// Health check for Hugging Face
export async function checkHFHealth(): Promise<boolean> {
  try {
    // Test with a simple translation
    const result = await translateEnToMl("hello");
    return result !== "hello"; // If it changed, service is working
  } catch (error) {
    console.error("Hugging Face health check failed:", error);
    return false;
  }
}
