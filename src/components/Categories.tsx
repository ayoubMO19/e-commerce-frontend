import type { CategoriesResponseDTO } from "../types/api";
import { Link } from "react-router-dom";

const mockCategories: CategoriesResponseDTO[] = [
  { categoryId: 1, name: "Zapatillas" },
  { categoryId: 2, name: "Ropa" },
  { categoryId: 3, name: "Accesorios" },
  { categoryId: 4, name: "Electrónica" },
  { categoryId: 5, name: "Deportes" },
];

export function Categories() {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight text-gray-900">
        Categorías
      </h2>
      <div className="flex flex-wrap gap-3">
        {mockCategories.map((category) => (
          <Link
            key={category.categoryId}
            to={`/products?category=${category.categoryId}`}
            className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-900 hover:bg-gray-50 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
