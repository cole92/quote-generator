# Random Quote Generator (Vanilla JavaScript)

A small web app that generates random quotes and lets you save your favorites. Favorites are stored in **LocalStorage**, and you can sort or clear them anytime.

## Features

- Generate a random quote (text + author)
- Mark/unmark quotes as favorites (heart toggle)
- Favorites modal (view saved quotes)
- Sort favorites (A–Z / Z–A)
- Clear all favorites
- Share a quote via X (Twitter intent link)
- Persistent favorites via LocalStorage

## Tech stack

- HTML / CSS
- JavaScript (ES modules)
- Fetch API
- LocalStorage
- Font Awesome (icons)

## Data source (CORS-safe)

The original public quotes endpoint is blocked by CORS in browsers, so the app loads quotes from a local JSON file:

- `data/quotes.json`

## Run locally

Recommended (local server):

```bash
python3 -m http.server 5173
```

Open:

- http://localhost:5173

## Project structure (high level)

```txt
.
├── index.html
├── css/
├── js/
│   ├── api.js
│   ├── events.js
│   ├── interface.js
│   └── storage.js
└── data/
    └── quotes.json
```

## Status

This is a learning project and may be archived (not actively maintained).

## License

Educational / personal use.
