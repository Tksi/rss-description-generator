import { Feed } from 'feed';
import type { FeedData } from '@extractus/feed-extractor';

/**
 * RSS生成
 * @param rss RSSオブジェクト
 * @returns RSS
 */
export const generateRss = (rss: FeedData): string => {
  const feed = new Feed({
    title: rss.title ?? '',
    description: rss.description ?? '',
    id: rss.link ?? '',
    link: rss.link ?? '',
    copyright: '',
    updated: new Date(rss.published ?? ''),
  });

  return feed.atom1();
};
