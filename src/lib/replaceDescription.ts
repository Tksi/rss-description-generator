import { loadEnv } from 'vite';
import { summerizeWebPage } from './summerizeWebPage';
import type { ENV } from 'index';
import type Parser from 'rss-parser';

export const replaceDescription = (
  ENV: ENV,
  KV: KVNamespace,
  rssItems: readonly (Parser.Item & Record<string, unknown>)[],
  baseUnixTime: number = 0,
): Promise<(Parser.Item & Record<string, unknown>)[]> => {
  return Promise.all(
    rssItems.map(async (item) => {
      if (item.link === undefined) return item;

      const cachedContent = await KV.get(item.link);

      // キャッシュがあればキャッシュを返す
      if (cachedContent !== null) {
        return {
          ...item,
          content: cachedContent,
        };
      }

      let content = item.content ?? '';

      // baseUnixTimeより新しい記事のみ要約を生成
      if (baseUnixTime * 1000 <= new Date(item.isoDate ?? '').getTime()) {
        content = await summerizeWebPage(ENV, item.link);
        await KV.put(item.link, content, { expirationTtl: 60 * 60 * 24 * 28 });
      }

      return {
        ...item,
        content,
      };
    }),
  );
};
