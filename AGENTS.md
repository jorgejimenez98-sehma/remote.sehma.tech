# Project instructions

This is a minimal Laravel + React/TypeScript + Vite application derived from the local `staffingapp` project. Use Laravel's conventional backend layout and keep frontend features under `resources/react/src/features/`.

## Required skill

Before creating, moving, or restructuring React pages, components, or features, read `.agents/skills/file-architecture/SKILL.md` and its canonical reference. The skill is versioned in this repository so it works on another machine. Next.js-specific instructions do not apply to Laravel routing.

For shadcn/ui work, also read `.agents/skills/shadcn/SKILL.md`. Use `pnpm ui:info --json` to inspect project context and `pnpm ui:add` for additions or update previews. These project runners invoke the official CLI while preserving the required component folders. The local file-architecture rules take precedence over upstream flat-file examples. `.agents/skills/migrate-radix-to-base/SKILL.md` is available when an actual Radix-to-Base migration is requested.

## Scope

- Write all code identifiers, UI labels, messages, comments, and project documentation in English. Keep the default application locale set to `en`.
- Use Biome for frontend linting, formatting, and import organization. Run `pnpm lint` and `pnpm build` after frontend changes; use `pnpm lint:fix` for safe automatic fixes. Keep Biome scoped to frontend source and configuration files.
- Do not add Bookmed UI.
- Use local shadcn/ui components with the Base UI preset (`base-nova`). Every primitive must live at `resources/react/src/components/ui/<name>/<name>.tsx`, with one shared barrel at `components/ui/index.ts`. Application code imports UI exports from `@/components/ui`; primitive-to-primitive imports use explicit relative file paths to avoid barrel cycles. Do not leave flat `.tsx` files in `components/ui/` or create a barrel in each primitive folder. Use `pnpm ui:add` so CLI additions retain this layout. Do not replace Base UI with Radix UI or import components from Bookmed UI.
- Use the light and dark semantic color tokens from `app.sehma`, defined locally in `resources/react/src/styles/app.css`. Use Tailwind CSS 4 semantic utilities rather than hardcoded colors in components.
- Use React Hook Form with Zod and `@hookform/resolvers` for forms. Connect controls through `Controller` and the local `Field`, `FieldLabel`, and `FieldError` components. Use TanStack Query for server state through the shared `AppProvider` and query client; do not add placeholder API calls or database writes.
- Keep Laravel pinned to `12.62.0`, matching the installed and locked version in the local `../api.sehma` repository for `api.sehma.tech`. Do not change this version without a user request.
- Keep the database, business modules, and integrations empty until requested. Do not add models, migrations, seeders, factories, or database autoload namespaces. Do not copy data, secrets, storage, or environment files from the source project.
- Use the local MySQL database `sehma_remote`, file sessions/cache, and synchronous queues. Keep the database empty; do not create tables or run migrations or seeders for this initial page.
- Do not create tests unless the user explicitly requests them. Validate this base with the frontend build, PHP syntax checks, and Laravel route/HTTP checks.
- Keep `deploy.sh`. It uploads only `public/build` over FTP, using this repository's local `git-ftp` settings. Run it only when deployment is requested.
- Use the `github-sehma` SSH host and `~/.ssh/id_ed25519_sehma` for GitHub access. Never inherit the source project's remote or FTP credentials.
- Do not create commits unless the user requests them.
