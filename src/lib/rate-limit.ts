export type AIProvider = 'openai' | 'claude' | 'gemini';

export function getAiProvider(): AIProvider {
  const provider = (process.env.AI_PROVIDER || 'openai').toLowerCase();
  if (provider === 'claude' || provider === 'gemini') return provider;
  return 'openai';
}

export function getConfiguredAiKey(provider: AIProvider) {
  if (provider === 'openai') return process.env.OPENAI_API_KEY;
  if (provider === 'claude') return process.env.CLAUDE_API_KEY;
  return process.env.GEMINI_API_KEY;
}

export function validateAiConfiguration() {
  const provider = getAiProvider();
  const key = getConfiguredAiKey(provider);

  if (!key) {
    return {
      ok: false,
      provider,
      error: `Missing ${provider.toUpperCase()} API key. Configure the corresponding environment variable before using the AI features.`,
    };
  }

  return { ok: true, provider };
}
