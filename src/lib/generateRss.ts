import { Feed } from 'feed';
import type { FeedData, FeedEntry } from '@extractus/feed-extractor';

/**
 * RSS生成
 * @param rss RSSオブジェクト
 * @returns RSS(Atom1.0)
 */
export const generateRss = (rss: FeedData): string => {
  const atom1 = `<?xml version="1.0" encoding="utf-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom">
    <id>${rss.link}</id>
    <title>${rss.title}</title>
    <updated>${rss.published}</updated>
    <generator>https://github.com/Tksi/rss-description-generator</generator>
    <link rel="alternate" href="${rss.link}"/>
    ${(rss.entries ?? []).map((entry) => generateEntries(entry)).join('\n')}
  </feed>
  `;

  return atom1;
};

const generateEntries = (entry: FeedEntry): string => {
  return `<entry>
  <title type="html"><![CDATA[${entry.title}]]></title>
  <id>${entry.id}</id>
  <link href="${entry.link}"/>
  <updated>${entry.published}</updated>
  <summary type="html"><![CDATA[${entry.description}]]></summary>
</entry>`;
};
