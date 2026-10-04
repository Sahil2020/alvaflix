# Streaming Service Project Brief

**Status:** Approved starting brief  
**Project name:** Alvaflix  
**Purpose:** Keep the product direction and foundational technical choices stable while the service is built in useful stages.

## 1. Product direction

Build an original, web-based video streaming service with the familiar core experience of subscription video platforms: discover a catalog, inspect titles, save titles, and watch available video. Netflix and Prime Video are references for broad product concepts only. The service must have its own name, visual identity, layout, copy, and code; it must not copy their branding or assets.

The first release is a small, working foundation that can be run locally and later deployed. It is not intended to reproduce every feature or the global infrastructure of a major streaming company.

## 2. Foundational technology decisions

Keep these choices fixed for the initial product and do not replace them casually. Reconsider a choice only when a concrete product or operational requirement cannot be met, document the options and migration cost, and get the owner's agreement before changing it.

| Area | Decision |
| --- | --- |
| Main language | TypeScript for browser and server code |
| Frontend | React with Vite; responsive web app |
| Backend | Node.js API using NestJS |
| Package management | npm with npm workspaces in one Git repository |
| Database | PostgreSQL for accounts, catalog metadata, lists, and viewing progress |
| Database access | Prisma ORM and versioned schema migrations |
| Video playback | Browser video playback using HLS where supported, with a compatible playback library where needed |
| Video storage/delivery | Use a managed video host/CDN when real uploads and streaming are introduced; choose the provider after comparing requirements and cost |
| Hosting | Decide at deployment time based on region, budget, and provider limits; keep app configuration portable through environment variables |

Use the current supported Node.js LTS release when setting up the project. Pin actual dependency versions in the lockfile. Do not adopt extra infrastructure such as Redis, Kubernetes, microservices, or a custom transcoding fleet before a demonstrated need.

## 3. Initial release scope

Build the minimum coherent service in this order:

1. **Project foundation:** repository structure, frontend and API workspaces, shared types only where useful, environment configuration examples, linting/formatting, and a clear local start guide.
2. **Catalog experience:** home page, title rows/cards, title detail view, genres/categories, responsive navigation, and search over seeded catalog data.
3. **Accounts:** registration, sign-in, sign-out, password hashing, and protected account-specific actions. Never store plaintext passwords or commit secrets.
4. **Personal features:** watchlist and basic playback progress saved per account.
5. **Playback:** a player page with play/pause, seek, volume, captions when available, and continue-watching behavior. The first playable videos must be owner-provided, properly licensed, or public-domain/test assets explicitly cleared for use.
6. **Admin/catalog workflow:** a small protected way to add/edit title metadata and attach an approved video source. Keep uploaded media out of the application repository.
7. **Deployment:** deploy the website, API, database, and media delivery with documented environment variables, backups, and a way to roll back releases.

Keep the catalog usable with local seed data before external services are configured. Do not make paid subscriptions or payment processing a launch dependency; add them only after the core catalog and playback flow works and the owner has selected the business model/provider.

## 4. Later roadmap (not part of the first build)

Add these only when the earlier stage is working and there is a clear product need:

- Multiple profiles, parental controls, and profile-specific recommendations.
- Subscription plans, billing, trials, and entitlement checks.
- Better recommendations, analytics, and content discovery.
- Captions/subtitles management, multiple audio tracks, and accessibility refinements.
- Offline downloads, smart TV/mobile apps, DRM, and device management.
- Editorial/admin roles, scheduled releases, localization, and promotional collections.
- Scale work such as background queues, caching, and service separation, guided by observed traffic.

DRM, downloads, television apps, and subscription billing require additional provider, platform, legal, and security decisions; do not imply they are included in the initial web release.

## 5. Content, rights, and security boundaries

- Only ingest or stream videos, posters, artwork, music, and subtitles that the owner has rights or explicit permission to use.
- Do not scrape, proxy, embed, or redistribute Netflix, Prime Video, or other services' protected catalogs or streams.
- Do not commit credentials, signing keys, private media URLs, or production data. Use environment variables and provide a safe `.env.example` with placeholders.
- Validate and authorize all API operations on the server; never rely on frontend checks for access control.
- Protect account data, use secure password hashing, and avoid logging passwords, tokens, or sensitive playback URLs.
- Prefer signed/expiring playback links from the selected media provider when private content is introduced.

## 6. Repository and documentation expectations

Keep the project in one repository. A likely layout is:

```text
apps/
  web/       React + Vite browser application
  api/       NestJS HTTP API
packages/
  shared/    Optional shared validation/types, only if it reduces duplication
docs/
  decisions/ Short records for significant approved architecture changes
```

The exact layout can be adjusted during initial scaffolding, but do not split the repository or add a shared package without a practical reason. Keep `README.md` current with prerequisites, install/start commands, database setup, seed instructions, and deployment notes. Keep this brief as the product direction reference. Record any approved change to a foundational decision in `docs/decisions/` with the reason, alternatives, and migration impact.

## 7. Working rules for future Codex sessions

1. Read this brief and repository guidance before changing project structure or foundational dependencies.
2. Work in small, reviewable stages. Finish the requested stage before adding unrelated features.
3. Preserve the approved stack. Do not rewrite the app or migrate frameworks because a different tool is fashionable.
4. Before proposing a foundational change, explain the unmet requirement, viable alternatives, cost/risk, and migration path; wait for the owner's decision.
5. Keep setup reproducible: commit lockfile and migrations, document configuration, and make seed data safe to rerun.
6. Build a usable interface with original styling and responsive behavior; do not use copied Netflix/Prime assets or claim affiliation.
7. Do not add tests or run test suites unless requested. When verification is requested, report exactly what was run and what remains unverified.
8. Never publish, purchase services, configure a paid provider, or use real customer data without explicit authorization.

## 8. Setup requirements and owner inputs

For local development, use a supported Node.js LTS release, npm, Git, a modern browser, and an editor such as VS Code. PostgreSQL can run locally or through a managed development database. A dedicated GPU is not required for web development; video encoding can be delegated to a managed provider. A stable internet connection is needed for package installation and remote services.

Before production deployment, decide the original service name/domain, target audience/region, initial catalog and rights, monthly budget, account launch policy, media provider, and hosting provider. These can remain placeholders during the first local UI/catalog stage.

## 9. Definition of a first useful milestone

The first milestone is complete when a developer can follow the README on a clean machine, start the web app and API, load seeded titles, browse/search the catalog, open a title page, and play an approved sample video. Account-specific features can follow in the next milestone if needed.
