## Development

### 1. set API keys to `.dev.vars`

```bash
cp .dev.vars.exmaple .dev.vars
```

get API keys and set to `.dev.vars`

- GEMINI_API_KEY : https://aistudio.google.com/app/apikey

### 2. set kv_namespaces id to `wrangler.toml`

https://developers.cloudflare.com/kv/concepts/kv-namespaces/

### 3. run dev server

```
npm install
npm run dev
```

## Deploy

set API keys(`GEMINI_API_KEY`) to enviroment variable

## Endpoint

`/:unixTime/:rssUrl`

- unixTime : the article description for pubDate after this value will be replaced by a auto generated summary (set 0 to replace all)
- rssUrl : target rssUrl
