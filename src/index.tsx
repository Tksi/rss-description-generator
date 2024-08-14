import { Hono } from 'hono';
import { renderer } from './renderer';

type Bindings = {
  KV: KVNamespace;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(renderer);

app.get('/', (c) => {
  return c.render(<h1>Hello!</h1>);
});

app.get('/kv', async (c) => {
  await c.env.KV.put('name', 'test');
  const name = await c.env.KV.get('name');

  return c.render(<h1>Hell! {name}</h1>);
});

export default app;
