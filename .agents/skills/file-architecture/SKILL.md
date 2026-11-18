---
name: file-architecture
description: Apply the project feature-folder conventions when creating, moving, or restructuring React pages, components, or features.
---

# File Architecture

Read [the complete canonical rules](references/file-architecture.md) before changing frontend structure. This project keeps a portable snapshot of Jorge’s canonical rules from `~/.ai-rules/file-architecture.md`.

Apply the React feature-folder rules under `resources/react/src/features/`. Keep Laravel routes, controllers, configuration, and views in their conventional Laravel directories. Next.js routing and next-intl sections apply only if those tools are introduced later.

## Shared UI components

The user also requires the folder-per-component rule for shadcn primitives. Use `resources/react/src/components/ui/<name>/<name>.tsx`, such as `ui/button/button.tsx`. Do not leave loose `.tsx` files directly in `ui/`, and do not add a barrel inside every primitive folder.

Use a single shared barrel at `resources/react/src/components/ui/index.ts`. Application code imports from `@/components/ui`. UI primitives that depend on each other import explicit sibling files, such as `../button/button`, to avoid circular imports through that barrel.

Use `pnpm ui:add <component>` for shadcn additions and update previews, and `pnpm ui:info --json` for project context. `scripts/shadcn.mjs` presents the standard flat layout to the official CLI temporarily, then restores the required component folders, updates imports, and regenerates the shared barrel. This project convention overrides upstream examples that show flat UI files.

For this Laravel + Vite project, `resources/react/src/main.tsx` is the frontend bootstrap and imports feature pages directly. A minimal page with no extracted components does not need an empty components directory or barrel.
