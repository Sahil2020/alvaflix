# Alvaflix

An original streaming-service web app foundation built with React, Vite, TypeScript, Node.js, and NestJS. The initial catalog uses sample metadata and remote editorial imagery. It does not yet stream full titles or include user accounts.

## Requirements

- Node.js 22.12 or newer (use a supported Node.js LTS release)
- npm 10 or newer
- Internet access for first-time dependency installation and sample artwork/fonts

PostgreSQL is not needed for this first catalog milestone; it will be introduced when persistent accounts, watchlists, and viewing progress are built.

## Run locally

From the repository root:

```sh
npm install
npm run dev
```

Open the Vite URL printed in the terminal (normally `http://localhost:5173`). The NestJS API runs on `http://localhost:3001`. The web app uses sample catalog data if the API is unavailable.

To run one part separately, use `npm run dev:web` or `npm run dev:api`.

## Current functionality

- Responsive home page with featured title carousel controls
- Catalog rows, title details, and title/genre search
- In-memory watchlist interactions
- NestJS health and catalog endpoints with seeded sample titles
- Sample playback interaction that explains where approved media wiring belongs

The watchlist and playback progress are currently browser-session UI only; there is no account/database persistence yet. Sample titles and artwork are placeholders. Replace them with content and assets Alvaflix has permission to use before public launch.

## Configuration

Copy `.env.example` to `.env` if you need to change the API port or frontend API URL. Do not commit `.env` or production credentials. Vite reads `VITE_API_URL` at build time; the API reads `API_PORT` at startup.

## Next milestone

Connect a PostgreSQL database and Prisma migrations, then build account registration/sign-in and account-persistent watchlists. Choose a managed video storage/transcoding/CDN provider after confirming budget, target audience, and media rights; the UI does not contain a working media source yet.

## Project direction

See [PROJECT_BRIEF.md](./PROJECT_BRIEF.md) for the approved product scope, technology decisions, staged roadmap, and ongoing Codex working rules.
