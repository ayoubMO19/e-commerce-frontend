import type { CategoriesResponseDTO } from "../types/api";
import { Link } from "react-router-dom";
import { categoriesService } from "../services/api";
import { useEffect, useState } from "react";

export function Categories() {
  const [categories, setCategories] = useState<CategoriesResponseDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadCategories = async () => {
      try {
        const data = await categoriesService.getAll();
        if (isMounted) {
          setCategories(data);
        }
      } catch {
        if (isMounted) {
          setError("No se han podido cargar las categorías.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="space-y-6">
      <h2 className="text-lg font-semibold tracking-tight text-gray-900">
        Categorías
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {isLoading ? (
          <div className="text-sm text-gray-500">Cargando categorías...</div>
        ) : error ? (
          <div className="text-sm text-red-500">{error}</div>
        ) : (
          categories.map((category) => (
          <Link
            key={category.categoryId}
            to={`/products?category=${category.categoryId}`}
            className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:border-gray-900 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <h3 className="text-center text-2xl font-bold text-black p-4">{category.name}</h3>
            </div>
          </Link>
        )))}
      </div>
    </section>
  );
}
