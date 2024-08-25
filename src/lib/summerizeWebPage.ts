import { GoogleGenerativeAI } from '@google/generative-ai';
import ky from 'ky';
import type { ENV } from 'index';
import type { Options } from 'ky';

const stripLinkFromMarkdown = (markdown: string) => {
  return markdown.replace(/\[(.+?)]\(.+?\)/g, (_, p1) => `[${p1}]()`);
};

const getWebPage = (url: string, JINA_API_KEY?: string) => {
  const headers: Options['headers'] = {
    Accept: 'application/json',
  };

  if (JINA_API_KEY !== undefined) {
    headers.Authorization = `Bearer ${JINA_API_KEY}`;
  }

  return ky<{
    code: number;
    status: number;
    data: {
      title: string;
      url: string;
      content: string;
      usage: {
        tokens: number;
      };
    };
  }>(`https://r.jina.ai/${url}`, { headers })
    .json()
    .then(({ data: { content } }) => stripLinkFromMarkdown(content));
};

export const summerizeWebPage = async (ENV: ENV, url: string) => {
  const { JINA_API_KEY, GEMINI_API_KEY } = ENV;
  const content = await getWebPage(url, JINA_API_KEY);

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const prompt = `日本語で2文で要約せよ。\n${content}`;
  const result = await model.generateContent(prompt);

  return result.response.text();
};
