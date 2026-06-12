import { GoogleGenAI } from '@google/genai';
import { Readability } from '@mozilla/readability';
import ky from 'ky';
import { parseHTML } from 'linkedom';
import type { ENV } from 'index';
import type { HTMLElement } from 'linkedom';

const getWebPage = async (url: string) => {
  const html = await ky(url).text();
  // @ts-expect-error linkedomの型がおかしい
  const { document } = parseHTML(html);
  const article = new Readability(document, {
    serializer: (el: HTMLElement) => el.textContent,
  }).parse();

  if (article === null) {
    throw new Error('Readability returned null');
  }

  return article.content.replace(/[\t\r]/g, '');
};

/**
 * Webページを要約
 * @param ENV APIキー
 * @param url 記事URL
 * @returns 要約
 */
export const summerizeWebPage = async (ENV: ENV, url: string) => {
  const { GEMINI_API_KEY } = ENV;
  const content = await getWebPage(url);

  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  const prompt = `日本語で2文で要約せよ。\n${content}`;
  const result = await ai.models.generateContent({
    model: 'gemma-4-31b-it',
    contents: prompt,
  });

  return result.text ?? '';
};
