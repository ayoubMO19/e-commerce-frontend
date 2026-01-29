import type { CategoriesResponseDTO } from "../types/api";
import { Link } from "react-router-dom";

interface CategoryWithImage extends CategoriesResponseDTO {
  imageUrl: string;
}

const mockCategories: CategoryWithImage[] = [
  {
    categoryId: 1,
    name: "Zapatillas",
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop",
  },
  {
    categoryId: 2,
    name: "Ropa",
    imageUrl:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop",
  },
  {
    categoryId: 3,
    name: "Accesorios",
    imageUrl:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop",
  },
  {
    categoryId: 4,
    name: "Electrónica",
    imageUrl:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop",
  },
  {
    categoryId: 5,
    name: "Deportes",
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
  },
];

export function Categories() {
  return (
    <section className="space-y-6">
      <h2 className="text-lg font-semibold tracking-tight text-gray-900">
        Categorías
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {mockCategories.map((category) => (
          <Link
            key={category.categoryId}
            to={`/products?category=${category.categoryId}`}
            className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:border-gray-900 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={category.imageUrl}
                alt={category.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-sm font-semibold text-white drop-shadow-lg">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
