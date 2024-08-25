import { summerizeWebPage } from './summerizeWebPage';
import type { FeedEntry } from '@extractus/feed-extractor';
import type { ENV } from 'index';

/**
 * RSS記事オブジェクトのdescriptionを要約に置き換え
 * @param ENV APIキー
 * @param KV cloudflare KV
 * @param feedEntries RSS記事オブジェクトの配列
 * @param baseUnixTime 基準unixtime
 * @returns descriptionを要約に置き換えたfeedEntries
 */
export const replaceDescription = (
  ENV: ENV,
  KV: KVNamespace,
  feedEntries: FeedEntry[],
  baseUnixTime: number = 0,
): Promise<FeedEntry[]> => {
  return Promise.all(
    feedEntries.map(async (item) => {
      if (item.link === undefined) return item;

      const cachedDescription = await KV.get(item.link);

      // キャッシュがあればキャッシュを返す
      if (cachedDescription !== null) {
        return {
          ...item,
          description: cachedDescription,
        };
      }

      let description = item.description ?? '';

      // baseUnixTimeより新しい記事のみ要約を生成
      if (baseUnixTime * 1000 <= new Date(item.published ?? '').getTime()) {
        description = await summerizeWebPage(ENV, item.link);
        await KV.put(item.link, description, {
          expirationTtl: 60 * 60 * 24 * 28,
        });
      }

      return {
        ...item,
        description,
      };
    }),
  );
};
