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

export default app;
