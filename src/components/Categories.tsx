import type { CategoriesResponseDTO } from "../types/api";
import { Link, useSearchParams } from "react-router-dom";
import { categoriesService } from "../services/api";
import { useEffect, useState } from "react";
import { Tag } from "lucide-react";

export function Categories() {
  const [categories, setCategories] = useState<CategoriesResponseDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get("category");

  useEffect(() => {
    let isMounted = true;
    const loadCategories = async () => {
      try {
        const data = await categoriesService.getAll();
        if (isMounted) setCategories(data);
      } catch (error) {
        console.error("Error al cargar categorías", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    loadCategories();
    return () => { isMounted = false; };
  }, []);

  return (
    <section className="py-4">
      <div className="flex items-center gap-2 mb-4">
        <Tag className="h-4 w-4 text-gray-400" />
        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">
          Categorías
        </h2>
      </div>

      <div className="flex flex-wrap gap-2">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-9 w-24 animate-pulse rounded-full bg-gray-100" />
          ))
        ) : (
          <>
            {/* Opción para ver todos */}
            <Link
              to="/products"
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                !currentCategory 
                ? "bg-black text-white shadow-md" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Todas
            </Link>

            {categories.map((category) => (
              <Link
                key={category.categoryId}
                to={`/products?category=${category.categoryId}`}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  currentCategory === String(category.categoryId)
                    ? "bg-black text-white shadow-md"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-black hover:text-black shadow-sm"
                }`}
              >
                {category.name}
              </Link>
            ))}
          </>
        )}
      </div>
    </section>
  );
}