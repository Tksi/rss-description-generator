import { extract } from '@extractus/feed-extractor';
import { Hono } from 'hono';
import { env } from 'hono/adapter';
import { validator } from 'hono/validator';
import { generateRss } from 'lib/generateRss';
import { replaceDescription } from 'lib/replaceDescription';
import * as v from 'valibot';
import { renderer } from './renderer';
import type { FeedData } from '@extractus/feed-extractor';

type Bindings = {
  KV: KVNamespace;
};

export type ENV = {
  JINA_API_KEY: string;
  GEMINI_API_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(renderer);

app.get('/', (c) => {
  return c.render(<h1>Hello!</h1>);
});

const schema = v.object({
  unixTime: v.pipe(
    v.string(),
    v.transform(Number),
    v.number(),
    v.safeInteger(),
  ),
  rssUrl: v.pipe(v.string(), v.url()),
});

app.get(
  '/:unixTime/:rssUrl{.+$}',
  validator('param', async (value, c) => {
    const result = v.safeParse(schema, value);

    if (!result.success) {
      return c.json(result.issues, 422);
    }

    let rss: FeedData;

    try {
      rss = await extract(result.output.rssUrl);
    } catch (err) {
      if (err instanceof Error) {
        return c.json({ rssParseError: err.message }, 422);
      }

      throw err;
    }

    return {
      ...result.output,
      rss,
    };
  }),
  async (c) => {
    // @ts-expect-error Honoのバグ?
    const ENV = env<ENV>(c);
    const { KV } = c.env;
    const { unixTime, rss } = c.req.valid('param');

    rss.entries = await replaceDescription(
      ENV,
      KV,
      rss.entries ?? [],
      unixTime,
    );

    return c.body(generateRss(rss), 200, {
      'Content-type': 'application/xml;charset=utf-8',
    });
  },
);

export default app;
