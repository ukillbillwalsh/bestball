# CFB Draft & Research Tools

A pair of standalone College Football (CFB) DFS / best-ball tools served as a static site.

## Pages

| File | Title |
|------|-------|
| `cfb-draft-companion.html` | CFB Bestball Draft Companion |
| `cfb-research-hub.html` | RPS · CFB Research Hub |

## Data files

All JSON files in the root (`projections.json`, `odds.json`, `injuries.json`, `props.json`, etc.) are loaded client-side by the HTML pages.

## How to run

```bash
python3 -m http.server 5000
```

The **Start application** workflow runs this automatically. Open the preview and navigate to the page you want (e.g. `/cfb-draft-companion.html`).

## User preferences

<!-- Add any user preferences here -->
