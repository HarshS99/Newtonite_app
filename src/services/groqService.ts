import { retrieveContext, buildRagSystemPrompt, type RetrievedChunk } from './ragEngine';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timeString: string;
  retrievedSources?: RetrievedChunk[];
  isError?: boolean;
}

const STORAGE_KEY = 'sprout_groq_api_key';
const MODEL_STORAGE_KEY = 'sprout_groq_model';

export const SUPPORTED_MODELS = [
  { id: 'qwen/qwen3.8-27b', label: 'Qwen 3.8 27B (Ultra-fast, Recommended)' },
  { id: 'openai/gpt-oss-120b', label: 'GPT-OSS 120B (Deep Reasoning)' },
  { id: 'openai/gpt-oss-20b', label: 'GPT-OSS 20B (Balanced)' },
  { id: 'llama-3.3-70b-versatile', label: 'Llama 3.3 70B' },
  { id: 'llama-3.1-8b-instant', label: 'Llama 3.1 8B' },
];

export const DEFAULT_MODEL = 'qwen/qwen3.8-27b';

/**
 * Retrieve the active Groq API Key
 */
export function getGroqApiKey(): string {
  const fromStorage = localStorage.getItem(STORAGE_KEY);
  if (fromStorage && fromStorage.trim().length > 0) {
    return fromStorage.trim();
  }
  const fromEnv = import.meta.env.VITE_GROQ_API_KEY;
  if (fromEnv && fromEnv.trim().length > 0) {
    return fromEnv.trim();
  }
  return '';
}

/**
 * Save user-entered Groq API Key to localStorage
 */
export function setGroqApiKey(key: string): void {
  if (key && key.trim().length > 0) {
    localStorage.setItem(STORAGE_KEY, key.trim());
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

/**
 * Get the currently selected Groq model
 */
export function getGroqModel(): string {
  return localStorage.getItem(MODEL_STORAGE_KEY) || DEFAULT_MODEL;
}

/**
 * Save selected Groq model
 */
export function setGroqModel(modelId: string): void {
  localStorage.setItem(MODEL_STORAGE_KEY, modelId);
}

/**
 * Send query to Groq LLM with RAG-retrieved context
 */
export async function sendQueryToGroqRAG(
  query: string,
  history: { role: 'user' | 'assistant'; content: string }[] = []
): Promise<{ text: string; sources: RetrievedChunk[]; modelUsed?: string }> {
  // 1. Retrieve knowledge base context for this query
  const retrievedSources = retrieveContext(query, 3);
  const systemPrompt = buildRagSystemPrompt(retrievedSources);

  const apiKey = getGroqApiKey();

  // If no API key is provided, use our built-in RAG synthesis generator
  if (!apiKey) {
    const offlineAnswer = generateOfflineRagResponse(query, retrievedSources);
    return {
      text: offlineAnswer,
      sources: retrievedSources,
    };
  }

  // 2. Prepare conversation messages
  const messages = [
    { role: 'system', content: systemPrompt },
    ...history.slice(-4), // Last 4 turns for context
    { role: 'user', content: query },
  ];

  const primaryModel = getGroqModel();
  const modelsToTry = Array.from(
    new Set([primaryModel, DEFAULT_MODEL, 'openai/gpt-oss-120b', 'openai/gpt-oss-20b'])
  );

  let lastError: Error | null = null;

  for (const model of modelsToTry) {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.3,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(
            'Invalid Groq API Key. Please verify your key at console.groq.com and re-enter it.'
          );
        }

        const errorData = await response.json().catch(() => null);
        const errMsg = errorData?.error?.message || `HTTP ${response.status}`;

        // If model does not exist or no access, try next model in fallback list
        if (response.status === 404 || errMsg.toLowerCase().includes('model')) {
          console.warn(`Model ${model} not accessible (${errMsg}), trying next candidate...`);
          lastError = new Error(errMsg);
          continue;
        }

        throw new Error(errMsg);
      }

      const data = await response.json();
      const choice = data.choices?.[0];
      const replyText =
        choice?.message?.content?.trim() ||
        (choice?.message?.reasoning ? 'Thinking completed.' : 'Response received.');

      // Save the model that actually succeeded
      setGroqModel(model);

      return {
        text: replyText,
        sources: retrievedSources,
        modelUsed: model,
      };
    } catch (err: any) {
      if (err.message.includes('Invalid Groq API Key')) {
        throw err;
      }
      lastError = err;
    }
  }

  return {
    text: `⚠️ **Unable to connect to live assistant**: ${lastError?.message || 'Please check your connection'}.\n\nYou can still access our verified guidelines and FAQ on the homepage.`,
    sources: retrievedSources,
  };
}

/**
 * Offline knowledge assistant when API key is not yet provided
 */
function generateOfflineRagResponse(query: string, sources: RetrievedChunk[]): string {
  const topDoc = sources[0]?.document;
  if (!topDoc) {
    return `Regarding "${query}": Welcome to Sprout 2.0! Ask me anything about ₹100 micro-investing, PAN/Aadhaar verification, or SEBI safety guidelines.`;
  }

  return `Regarding "${query}", here is what our verified guidelines indicate from **${topDoc.title}**:

${topDoc.content}`;
}
