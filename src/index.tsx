import { Hono } from 'hono';
import { validator } from 'hono/validator';
import { hello } from 'lib/hello';
import * as v from 'valibot';
import { renderer } from './renderer';

type Bindings = {
  KV: KVNamespace;
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
  validator('param', (value, c) => {
    const result = v.safeParse(schema, value);

    if (!result.success) {
      return c.json(result.issues, 422);
    }

    return result.output;
  }),
  (c) => {
    const { unixTime, rssUrl } = c.req.valid('param');

    console.log(hello());

    return c.render(<h1>{`${unixTime} ${rssUrl}`}</h1>);
  },
);

export default app;
