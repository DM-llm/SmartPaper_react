import OpenAI from 'openai';

export const createOpenAIClient = () => {
  return new OpenAI({
    apiKey: import.meta.env.VITE_ARK_API_KEY,
    baseURL: 'https://ark.cn-beijing.volces.com/api/v3',
    dangerouslyAllowBrowser: true,
    defaultHeaders: {
      'X-Request-ID': crypto.randomUUID()
    },
    fetch: async (url, options) => {
      const response = await fetch(url, options);
      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`API请求失败: ${response.status}`, {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          errorBody
        });
        throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
      }
      return response;
    }
  });
};