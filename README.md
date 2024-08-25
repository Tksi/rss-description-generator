## Development

### 1. set API keys to `.dev.vars`

```bash
cp .dev.vars.exmaple .dev.vars
```

get API keys and set to `.dev.vars`

- JINA_API_KEY : https://jina.ai/reader/
- GEMINI_API_KEY : https://aistudio.google.com/app/apikey

### 2. set kv_namespaces id to `wrangler.toml`

https://developers.cloudflare.com/kv/concepts/kv-namespaces/

### 3. run dev server

```
npm install
npm run dev
```

## Deploy

set API keys(`JINA_API_KEY`, `GEMINI_API_KEY`) to enviroment variable
