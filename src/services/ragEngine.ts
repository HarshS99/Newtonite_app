import { KNOWLEDGE_BASE, type KnowledgeDocument } from './ragKnowledgeBase';

export interface RetrievedChunk {
  document: KnowledgeDocument;
  score: number;
  matchedKeywords: string[];
}

/**
 * Tokenize string into lowercase alphanumeric words
 */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 1);
}

/**
 * RAG Retriever: Ranks documents based on keyword match, title relevance,
 * tag boosting, and term frequency.
 */
export function retrieveContext(
  query: string,
  topK: number = 3,
  minScoreThreshold: number = 0.5
): RetrievedChunk[] {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) {
    return [];
  }

  const results: RetrievedChunk[] = [];

  for (const doc of KNOWLEDGE_BASE) {
    let score = 0;
    const matchedKeywords: string[] = [];

    const docContentLower = doc.content.toLowerCase();
    const docTitleTokens = tokenize(doc.title);

    // 1. Keyword tags matching (highest boost)
    for (const kw of doc.keywords) {
      const kwLower = kw.toLowerCase();
      if (query.toLowerCase().includes(kwLower)) {
        score += 3.5;
        matchedKeywords.push(kw);
      } else {
        const kwTokens = tokenize(kwLower);
        const match = kwTokens.some((t) => queryTokens.includes(t));
        if (match) {
          score += 1.8;
          matchedKeywords.push(kw);
        }
      }
    }

    // 2. Title matching (high boost)
    for (const token of queryTokens) {
      if (docTitleTokens.includes(token)) {
        score += 2.0;
      }
    }

    // 3. Content matching (frequency-based)
    for (const token of queryTokens) {
      if (docContentLower.includes(token)) {
        score += 0.8;
      }
    }

    // 4. Exact phrase matching boost
    if (docContentLower.includes(query.toLowerCase().trim())) {
      score += 4.0;
    }

    if (score >= minScoreThreshold) {
      results.push({
        document: doc,
        score,
        matchedKeywords: Array.from(new Set(matchedKeywords)),
      });
    }
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);

  // Return top K chunks, fallback to top document if none pass threshold
  if (results.length === 0 && KNOWLEDGE_BASE.length > 0) {
    return [{ document: KNOWLEDGE_BASE[0], score: 0.1, matchedKeywords: [] }];
  }

  return results.slice(0, topK);
}

/**
 * Build the system prompt injecting retrieved context
 */
export function buildRagSystemPrompt(retrievedChunks: RetrievedChunk[]): string {
  const contextText = retrievedChunks
    .map(
      (chunk, idx) =>
        `[Source ${idx + 1}: ${chunk.document.title}]\n${chunk.document.content}`
    )
    .join('\n\n');

  return `You are Sprout AI, a friendly, empathetic, and strictly compliance-conscious investing assistant for Sprout 2.0.
Your mission is to guide first-time Indian investors in simple, jargon-free English (with support for common Indian financial terms).

GROUNDING INSTRUCTIONS:
- You must base your answers primarily on the retrieved knowledge context provided below.
- Never promise guaranteed returns, capital preservation, or risk-free investing. Mutual funds are subject to market risks.
- Emphasize that users can start exploring with as little as ₹100.
- Reassure first-time investors about electronic KYC via DigiLocker and PAN requirements.
- Keep your answers concise, clear, reassuring, and formatted with bullet points where appropriate.

RETRIEVED KNOWLEDGE CONTEXT:
=======================================
${contextText}
=======================================

If the answer is not in the context, provide a polite, transparent response and recommend contacting human support at support@sproutapp.in.`;
}
