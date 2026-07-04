/**
 * Thin wrapper around the Groq chat-completions endpoint (OpenAI-compatible),
 * used for the required AI feature (announcement summarizer + optional chat assistant).
 *
 * NOTE: The API key is read from a Vite env var and called directly from the
 * browser for the purposes of this take-home. In a real production deployment
 * this call should be proxied through a backend so the key is never exposed
 * client-side — see README "Trade-offs" for details.
 */

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

interface GroqMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

class GroqClientError extends Error {}

async function callGroq(messages: GroqMessage[], maxTokens = 200): Promise<string> {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY as string | undefined;

  if (!apiKey) {
    throw new GroqClientError('Missing VITE_GROQ_API_KEY. Add it to your .env file to enable AI features.');
  }

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages,
      max_tokens: maxTokens,
      temperature: 0.3,
    }),
  });

  if (!response.ok) {
    throw new GroqClientError(`Groq API error (${response.status}): ${await response.text()}`);
  }

  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content as string | undefined;

  if (!text) {
    throw new GroqClientError('Groq API returned an empty response.');
  }

  return text.trim();
}

export async function summarizeAnnouncement(title: string, body: string): Promise<string> {
  return callGroq(
    [
      {
        role: 'system',
        content:
          'You summarize internal company announcements for busy employees. Reply with 1-2 plain sentences only, no preamble, no markdown. Preserve any dates, deadlines, amounts, or action items exactly as written.',
      },
      {
        role: 'user',
        content: `Title: ${title}\n\nAnnouncement:\n${body}`,
      },
    ],
    120
  );
}

export async function askHrAssistant(question: string, context: string): Promise<string> {
  return callGroq(
    [
      {
        role: 'system',
        content:
          "You are a concise internal HR assistant. Answer only using the employee data context provided. If the answer isn't in the context, say you don't have that information. Keep answers under 3 sentences.",
      },
      {
        role: 'user',
        content: `Context:\n${context}\n\nQuestion: ${question}`,
      },
    ],
    250
  );
}

export { GroqClientError };
