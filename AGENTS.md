# Project instructions

This is a minimal Laravel + React/TypeScript + Vite application derived from the local `staffingapp` project. Use Laravel's conventional backend layout and keep frontend features under `resources/react/src/features/`.

## Required skill

Before creating, moving, or restructuring React pages, components, or features, read `.agents/skills/file-architecture/SKILL.md` and its canonical reference. The skill is versioned in this repository so it works on another machine. Next.js-specific instructions do not apply to Laravel routing.

## Scope

- Write all code identifiers, UI labels, messages, comments, and project documentation in English. Keep the default application locale set to `en`.
- Do not add Bookmed UI.
- Keep Laravel pinned to `12.62.0`, matching the installed and locked version in the local `../api.sehma` repository for `api.sehma.tech`. Do not change this version without a user request.
- Keep the database, business modules, and integrations empty until requested. Do not add models, migrations, seeders, factories, or database autoload namespaces. Do not copy data, secrets, storage, or environment files from the source project.
- Use the local MySQL database `sehma_remote`, file sessions/cache, and synchronous queues. Keep the database empty; do not create tables or run migrations or seeders for this initial page.
- Do not create tests unless the user explicitly requests them. Validate this base with the frontend build, PHP syntax checks, and Laravel route/HTTP checks.
- Keep `deploy.sh`. It uploads only `public/build` over FTP, using this repository's local `git-ftp` settings. Run it only when deployment is requested.
- Use the `github-sehma` SSH host and `~/.ssh/id_ed25519_sehma` for GitHub access. Never inherit the source project's remote or FTP credentials.
- Do not create commits unless the user requests them.
