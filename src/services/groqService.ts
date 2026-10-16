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
const DEFAULT_MODEL = 'llama-3.3-70b-versatile';
const FALLBACK_MODEL = 'llama-3.1-8b-instant';

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
 * Send query to Groq LLM with RAG-retrieved context
 */
export async function sendQueryToGroqRAG(
  query: string,
  history: { role: 'user' | 'assistant'; content: string }[] = []
): Promise<{ text: string; sources: RetrievedChunk[] }> {
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

  // 2. Call Groq OpenAI-compatible Chat Completions endpoint
  try {
    const messages = [
      { role: 'system', content: systemPrompt },
      ...history.slice(-4), // Last 4 turns for context
      { role: 'user', content: query },
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
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
      if (response.status === 429) {
        // Fallback to lighter model if rate limited
        return await fallbackToLighterModel(apiKey, messages, retrievedSources);
      }
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.error?.message || `Groq API returned HTTP ${response.status}`
      );
    }

    const data = await response.json();
    const replyText =
      data.choices?.[0]?.message?.content?.trim() ||
      'I reviewed your question, but could not produce a response. Please reach out to support@sproutapp.in.';

    return {
      text: replyText,
      sources: retrievedSources,
    };
  } catch (error: any) {
    console.error('Groq API Error:', error);
    // If network error or bad key, return clear guidance
    return {
      text: `⚠️ **Could not connect to Groq LLM**: ${error.message}\n\n*Note:* You can update your Groq API key by clicking the ⚙️ Settings icon in the chat header, or add \`VITE_GROQ_API_KEY=your_key\` to your \`.env\` file.`,
      sources: retrievedSources,
    };
  }
}

/**
 * Fallback to faster 8B model if 70B is rate-limited
 */
async function fallbackToLighterModel(
  apiKey: string,
  messages: any[],
  sources: RetrievedChunk[]
): Promise<{ text: string; sources: RetrievedChunk[] }> {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: FALLBACK_MODEL,
      messages,
      temperature: 0.3,
      max_tokens: 450,
    }),
  });

  if (!response.ok) {
    throw new Error('Groq rate limit reached on both 70B and 8B models. Please try again shortly.');
  }

  const data = await response.json();
  return {
    text: data.choices?.[0]?.message?.content?.trim() || 'Response received.',
    sources,
  };
}

/**
 * Offline RAG generator when API key is not yet provided
 */
function generateOfflineRagResponse(query: string, sources: RetrievedChunk[]): string {
  const topDoc = sources[0]?.document;
  if (!topDoc) {
    return `Regarding "${query}": Welcome to Sprout 2.0! Ask me anything about ₹100 micro-investing, PAN/Aadhaar verification, or SEBI safety guidelines.\n\n*💡 To enable live Groq AI responses, please configure your Groq API key in the chat settings or in your \`.env\` file.*`;
  }

  return `Regarding "${query}", here is what our verified knowledge base indicates from **${topDoc.title}**:

${topDoc.content.slice(0, 320)}...

*(💡 Live AI responses powered by Groq Llama 3.3. Click the ⚙️ Key icon above to paste your Groq API key or add it to \`.env\` to enable real-time LLM chat generation.)*`;
}
