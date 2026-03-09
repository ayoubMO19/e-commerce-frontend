import { Hero } from "../components/Hero";
import { Categories } from "../components/Categories";
import { FeaturedProducts } from "../components/FeaturedProducts";
import { useProductsData } from "../hooks/useProductsData";
import { Loader2, AlertCircle } from "lucide-react";

export default function Home() {
  // TanStack Query se encarga de todo: 
  // Si ya están en caché de la página de productos, data no será undefined
  const { data: products = [], isLoading, isError } = useProductsData();

  return (
    <div className="space-y-12">
      <Hero />
      <Categories />

      <section className="px-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <Loader2 className="h-8 w-8 animate-spin mb-2" />
            <p className="text-sm font-medium uppercase tracking-widest">Cargando...</p>
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center gap-2 py-12 text-red-500">
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm font-medium">No se han podido cargar los productos.</p>
          </div>
        ) : (
          <FeaturedProducts products={products} />
        )}
      </section>
    </div>
  );
}