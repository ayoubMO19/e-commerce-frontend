import AppRouter from "./app/router/appRouter.tsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SpeedInsights } from "@vercel/speed-insights/react"

// Configuration for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data is considered "fresh" for 5 minutes
      gcTime: 1000 * 60 * 30,    // Keep in cache for 30 minutes even if not used
      retry: 1,                 // If it fails, retry once
      refetchOnWindowFocus: false, // Don't reload each time the user switches tabs
    },
  },
});

// Main App component
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <SpeedInsights />
    </QueryClientProvider>
  )
}

export default App;
