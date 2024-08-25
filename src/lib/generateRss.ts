import { Feed } from 'feed';
import type Parser from 'rss-parser';

export const generateRss = (
  rss: Parser.Output<Record<string, unknown>> & Record<string, unknown>,
): string => {
  const feed = new Feed({
    title: rss.title ?? '',
    description: rss.description ?? '',
    id: rss.link ?? '',
    link: rss.link ?? '',
    copyright: '',
  });

  return feed.atom1();
};
