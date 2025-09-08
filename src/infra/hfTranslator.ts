// src/infra/hfTranslator.ts
import axios from "axios";
import { ENV } from "../config/env";
import { AppError } from "../middlewares/errorHandler";

const HF_INFERENCE_API = "https://api-inference.huggingface.co/models";
const TIMEOUT = 30000;

const RATE_LIMIT_CONFIG = {
  MAX_REQUESTS_PER_MINUTE: 60,
  MIN_TIME_BETWEEN_REQUESTS: 1000,

  // Internal queue to manage rate limiting
  requestQueue: [] as Array<{
    resolve: (value: any) => void;
    reject: (error: any) => void;
    modelId: string;
    text: string;
  }>,
  isProcessing: false,
  lastRequestTime: 0,
};

async function callHFInferenceAPI(
  modelId: string,
  text: string,
  maxRetries: number = 3
): Promise<any> {
  return new Promise((resolve, reject) => {
    // Add request to queue
    RATE_LIMIT_CONFIG.requestQueue.push({ resolve, reject, modelId, text });

    // Process queue if not already processing
    if (!RATE_LIMIT_CONFIG.isProcessing) {
      processRequestQueue();
    }
  });
}

async function processRequestQueue(): Promise<void> {
  if (RATE_LIMIT_CONFIG.requestQueue.length === 0) {
    RATE_LIMIT_CONFIG.isProcessing = false;
    return;
  }

  RATE_LIMIT_CONFIG.isProcessing = true;

  const now = Date.now();
  const timeSinceLastRequest = now - RATE_LIMIT_CONFIG.lastRequestTime;
  const timeToWait = Math.max(
    0,
    RATE_LIMIT_CONFIG.MIN_TIME_BETWEEN_REQUESTS - timeSinceLastRequest
  );

  await new Promise((resolve) => setTimeout(resolve, timeToWait));

  const request = RATE_LIMIT_CONFIG.requestQueue.shift();
  if (!request) {
    RATE_LIMIT_CONFIG.isProcessing = false;
    return;
  }

  RATE_LIMIT_CONFIG.lastRequestTime = Date.now();

  try {
    const result = await makeHFAPIRequest(request.modelId, request.text);
    request.resolve(result);
  } catch (error) {
    request.reject(error);
  }

  setTimeout(processRequestQueue, RATE_LIMIT_CONFIG.MIN_TIME_BETWEEN_REQUESTS);
}

async function makeHFAPIRequest(
  modelId: string,
  text: string,
  maxRetries: number = 3
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
      const response = await axios.post(
        `${HF_INFERENCE_API}/${modelId}`,
        { inputs: text },
        {
          headers,
          timeout: TIMEOUT,
          validateStatus: (status) => status < 500,
        }
      );

      if (response.status === 200) {
        return response.data;
      }

      if (response.status === 503) {
        const retryAfter = response.headers["retry-after"] || 10;
        const delay = parseInt(retryAfter) * 1000;
        console.warn(
          `Model ${modelId} is loading. Retrying in ${delay}ms (attempt ${attempt}/${maxRetries})`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      if (response.status === 429) {
        const retryAfter = response.headers["retry-after"] || 30;
        const delay = parseInt(retryAfter) * 1000;
        console.warn(
          `Rate limited by API. Retrying in ${delay}ms (attempt ${attempt}/${maxRetries})`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    } catch (error: any) {
      lastError = error;

      if (error.code === "ECONNABORTED") {
        const delay = 2000 * attempt;
        console.warn(
          `Timeout. Retrying in ${delay}ms (attempt ${attempt}/${maxRetries})`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        break;
      }
    }
  }

  throw new AppError(500, `Hugging Face API failed: ${lastError?.message}`);
}

const translationCache = new Map<string, string>();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour cache

function getCacheKey(modelId: string, text: string): string {
  return `${modelId}:${text}`;
}

export async function translateMlToEn(text: string): Promise<string> {
  const cacheKey = getCacheKey("ml-en", text);

  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }

  try {
    const result = await callHFInferenceAPI("Helsinki-NLP/opus-mt-ml-en", text);
    const translation = extractTranslation(result);

    // Cache the result
    translationCache.set(cacheKey, translation);
    setTimeout(() => translationCache.delete(cacheKey), CACHE_TTL);

    return translation;
  } catch (error) {
    console.warn(
      "Malayalam to English translation failed, using original text"
    );
    return text;
  }
}

export async function translateEnToMl(text: string): Promise<string> {
  const cacheKey = getCacheKey("en-ml", text);

  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }

  try {
    const result = await callHFInferenceAPI("Helsinki-NLP/opus-mt-en-ml", text);
    const translation = extractTranslation(result);

    translationCache.set(cacheKey, translation);
    setTimeout(() => translationCache.delete(cacheKey), CACHE_TTL);

    return translation;
  } catch (error) {
    console.warn(
      "English to Malayalam translation failed, using original text"
    );
    return text;
  }
}

function extractTranslation(result: any): string {
  if (Array.isArray(result) && result[0]?.translation_text) {
    return result[0].translation_text;
  }

  if (typeof result === "object" && result.translation_text) {
    return result.translation_text;
  }

  if (typeof result === "string") {
    return result;
  }

  return String(result);
}
