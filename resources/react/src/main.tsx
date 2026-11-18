import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { HomePage } from "@/features/landing/home/home.page"
import { AppProvider } from "@/providers/app-provider/app-provider"

import "./styles/app.css"

const root = document.getElementById("root")

if (!root) {
  throw new Error("Root element not found.")
}

createRoot(root).render(
  <StrictMode>
    <AppProvider>
      <HomePage />
    </AppProvider>
  </StrictMode>
)
