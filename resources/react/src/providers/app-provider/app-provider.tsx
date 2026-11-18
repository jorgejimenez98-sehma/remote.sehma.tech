import type { ReactNode } from "react"
import { TooltipProvider } from "@/components/ui"
import { queryClient } from "@/lib/query-client"
import { QueryClientProvider } from "@tanstack/react-query"

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>{children}</TooltipProvider>
    </QueryClientProvider>
  )
}
