import AppRouter from "./app/router/appRouter.tsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SpeedInsights } from "@vercel/speed-insights/react"

// Configuración global de React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Los datos se consideran "frescos" por 5 minutos
      gcTime: 1000 * 60 * 30,    // Mantener en caché 30 min aunque no se usen
      retry: 1,                 // Si falla, reintentar una vez
      refetchOnWindowFocus: false, // No recargar cada vez que el usuario cambia de pestaña
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <SpeedInsights />
    </QueryClientProvider>
  )
}

export default App;
