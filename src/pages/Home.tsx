import { useEffect, useState } from "react";
import { Hero } from "../components/Hero";
import { Categories } from "../components/Categories";
import { FeaturedProducts } from "../components/FeaturedProducts";
import type { ProductResponseDTO } from "../types/api";
import { productService } from "../services/api";

export default function Home() {
  const [products, setProducts] = useState<ProductResponseDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        const data = await productService.getAll();
        if (isMounted) {
          setProducts(data);
        }
      } catch {
        if (isMounted) {
          setError("No se han podido cargar los productos.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-12">
      <Hero />
      <Categories />
      {isLoading ? (
        <div className="text-sm text-gray-500">Cargando productos destacados...</div>
      ) : error ? (
        <div className="text-sm text-red-500">{error}</div>
      ) : (
        <FeaturedProducts products={products} />
      )}
    </div>
  );
}
