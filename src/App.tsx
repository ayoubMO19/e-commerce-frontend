import AppRouter from "./app/router/appRouter.tsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Creamos una instancia del cliente con configuraciones por defecto pro
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
    </QueryClientProvider>
  )
}

export default App;
