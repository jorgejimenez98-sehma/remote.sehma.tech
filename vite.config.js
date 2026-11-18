import { fileURLToPath } from "node:url"
import react from "@vitejs/plugin-react"
import laravel from "laravel-vite-plugin"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [
    laravel({
      input: "resources/react/src/main.tsx",
      refresh: true
    }),
    react()
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./resources/react/src", import.meta.url))
    }
  }
})
