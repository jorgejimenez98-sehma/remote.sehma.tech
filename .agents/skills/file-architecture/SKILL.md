---
name: file-architecture
description: Apply the project feature-folder conventions when creating, moving, or restructuring React pages, components, or features.
---

# File Architecture

Read [the complete canonical rules](references/file-architecture.md) before changing frontend structure. This project keeps a portable snapshot of Jorge’s canonical rules from `~/.ai-rules/file-architecture.md`.

Apply the React feature-folder rules under `resources/react/src/features/`. Keep Laravel routes, controllers, configuration, and views in their conventional Laravel directories. Next.js routing and next-intl sections apply only if those tools are introduced later.

For this Laravel + Vite project, `resources/react/src/main.tsx` is the frontend bootstrap and imports feature pages directly. A minimal page with no extracted components does not need an empty components directory or barrel.
