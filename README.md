# SEHMA Remote

Laravel **12.62.0** base, matching the installed and locked version in `api.sehma.tech` (local directory `../api.sehma`), with React 19, TypeScript 7, and Vite 8. Derived from `staffingapp`, this project includes a single placeholder page. It contains no Bookmed UI, business modules, authentication, integrations, models, migrations, seeders, factories, or data.

Laravel is pinned to the exact version `12.62.0` in `composer.json`. Composer reports security advisories for this version; dependency resolution used `--no-security-blocking` to match the API version as requested. Auditing remains enabled, and no advisories were added to an ignore list.

Direct frontend dependencies were updated to the latest stable releases available on November 18, 2026: React and React DOM 19.3.1, Vite 8.3.8, TypeScript 7.0.2, `@vitejs/plugin-react` 6.3.0, `laravel-vite-plugin` 3.2.1, React/React DOM types 19.3.0, and Node types 26.6.6. `pnpm-lock.yaml` records the resolved versions.

## Development with Laravel Herd

Requirements: PHP 8.2 or later with `pdo_mysql`, Composer, a local MySQL server and client, Node.js 20.19+ or 22.12+, and pnpm. Verified with Node.js 24.20.0. Add Herd's binaries to your terminal's `PATH` if `php`, `composer`, or `herd` are unavailable.

```sh
composer install
cp .env.example .env
php artisan key:generate
mysql -h 127.0.0.1 -P 3306 -u root -e 'CREATE DATABASE IF NOT EXISTS sehma_remote CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;'
pnpm install --frozen-lockfile
pnpm build
```

Herd serves this directory at `http://remote.sehma.tech.test` because it is inside the parked `Herd` directory. If the project is outside a parked directory, run `herd link remote.sehma.tech` from the project root.

To develop with hot reloading:

```sh
pnpm dev
```

Vite automatically detects Herd's certificate when HTTPS is enabled for the site matching this directory's name. If you rename the site, update `APP_URL`; if the site uses an alias different from the directory name, set `detectTls` in `vite.config.js` to the full local domain.

## Frontend code quality

Biome 2.6.8 handles frontend linting, formatting, and import organization. Its configuration follows the basic rules from `app.sehma`: two-space indentation, a 100-character JavaScript line width, optional semicolons, no trailing commas, recommended React rules, accessibility checks, and grouped imports. Logging allows `console.assert`, `error`, `info`, `warn`, and `debug`.

```sh
pnpm lint
pnpm lint:fix
pnpm format
```

`pnpm lint` checks formatting, lint rules, and imports without changing files. `pnpm lint:fix` applies safe fixes, and `pnpm format` only formats files. Checks cover `resources/react/src/`, `scripts/`, `vite.config.js`, `package.json`, `tsconfig.json`, `components.json`, and `biome.json`.

VS Code workspace settings use the recommended `biomejs.biome` extension to format frontend files, apply safe fixes, and organize imports when saving with `Command + S`. Install the recommended extension when opening the project if it is not already installed.

## UI components, forms, and server state

shadcn/ui is initialized with the Base UI `base-nova` preset. Component source files belong to this repository under `resources/react/src/components/ui/`; there is no Bookmed UI dependency. The initial primitives are button, input, textarea, label, field, checkbox, select, separator, dialog, and tooltip.

Each primitive has its own matching folder and filename, with a single shared barrel:

```text
resources/react/src/components/ui/
├── index.ts
├── button/button.tsx
├── checkbox/checkbox.tsx
├── dialog/dialog.tsx
├── field/field.tsx
├── input/input.tsx
├── label/label.tsx
├── select/select.tsx
├── separator/separator.tsx
├── textarea/textarea.tsx
└── tooltip/tooltip.tsx
```

Application code imports from `@/components/ui`. Internal primitive dependencies use explicit sibling paths, such as `../button/button`, to avoid circular imports through the barrel.

Tailwind CSS 4 runs through `@tailwindcss/vite`. The local stylesheet defines the same light and dark color tokens as `app.sehma`, including its teal primary and brand colors. Use semantic classes such as `bg-background`, `text-foreground`, `bg-primary`, and `text-muted-foreground`. Adding the `dark` class to the document root activates the dark palette.

To add another local component:

```sh
pnpm ui:add button
pnpm ui:info --json
```

`components.json` keeps the Base UI preset, source paths, and `@/` aliases configured for the CLI. The project runner in `scripts/shadcn.mjs` temporarily presents existing primitives in the CLI's standard layout, then restores the component folders, rewrites imports, and regenerates `ui/index.ts`. Cleanup also runs when the CLI reports an error. Additions run Biome afterward. Use `pnpm ui:add` instead of invoking `shadcn add` directly; preview updates with `pnpm ui:add <component> --dry-run` before changing existing components.

The official `shadcn` and `migrate-radix-to-base` skills are installed in `.agents/skills/`, alongside the project `file-architecture` skill. Follow the project folder convention when using their upstream examples; the migration skill is only needed for an actual migration.

React Hook Form, Zod, and `@hookform/resolvers` are installed for typed forms. Use `useForm` with `zodResolver`, and connect each controlled input with `Controller` and the local `Field`, `FieldLabel`, and `FieldError` components. Set an input `id` matching its label's `htmlFor`, pass `aria-invalid` from field state, and connect descriptions and errors with `aria-describedby`. Forms should live in their owning feature rather than the shared primitive directory.

TanStack Query is available throughout the application through `AppProvider`. Its shared `QueryClient` lives in `resources/react/src/lib/query-client.ts`; the provider also initializes Base UI tooltips. No API requests, forms, business modules, or database writes are added to the placeholder page.

## Database

The application uses the local MySQL database `sehma_remote` at `127.0.0.1:3306`. The local defaults use the `root` account with an empty password; adjust `DB_USERNAME` and `DB_PASSWORD` in `.env` for your MySQL server. The database stays empty, with no tables or records. There are no models, migrations, seeders, factories, or database autoload namespaces. Do not run migrations or seeders to start this base. Sessions and cache use files, and queues run synchronously.

## Structure

- `app/`, `bootstrap/`, `config/`, `routes/`: conventional Laravel structure.
- `resources/views/app.blade.php`: document that mounts React.
- `resources/react/src/main.tsx`: Vite entry point.
- `resources/react/src/features/landing/home/home.page.tsx`: placeholder page.
- `.agents/skills/file-architecture/`: skill and portable copy of its rules.

## Git

The repository uses branch `main` and has no configured remote. Local author: Jorge Jimenez (`jorge.jimenez@sehma.com`), inherited from the source repository. SSH access uses `github-sehma` and the key `~/.ssh/id_ed25519_sehma`.

When configuring the remote repository, use `git@github-sehma:sehma/<repository>.git`.

## Deploy

The original project's `./deploy.sh` is preserved. The script uploads only the contents of `public/build/`; it does not deploy the Laravel backend. It requires `lftp` and the local `git-ftp.url`, `git-ftp.user`, and `git-ftp.password` settings in `.git/config`. Configure them for the new destination before deploying.

No FTP credentials were copied, and no deployment has been run.
