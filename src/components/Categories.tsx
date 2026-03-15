import { Link, useSearchParams } from "react-router-dom";
import { useCategoriesData } from "../hooks/useProductsData";

export function Categories() {
  const { data: categories = [], isLoading } = useCategoriesData();
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get("category");

  return (
    <section className="py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-[1px] w-8 bg-vexa"></div>
        <h2 className="text-[10px] font-black uppercase tracking-[4px] text-zinc-400">
          Explorar Categorías
        </h2>
      </div>

      <div className="flex flex-wrap gap-3">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-10 w-28 animate-pulse rounded-xl bg-zinc-100" />
          ))
        ) : (
          <>
            <Link
              to="/products"
              className={`rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all border ${!currentCategory
                  ? "bg-black text-white border-black shadow-lg shadow-zinc-200"
                  : "bg-white border-zinc-100 text-zinc-500 hover:border-vexa hover:text-black"
                }`}
            >
              Todas
            </Link>

            {categories.map((category) => (
              <Link
                key={category.categoryId}
                to={`/products?category=${category.categoryId}`}
                className={`rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all border ${currentCategory === String(category.categoryId)
                    ? "bg-black text-white border-black shadow-lg shadow-zinc-200"
                    : "bg-white border-zinc-100 text-zinc-500 hover:border-vexa hover:text-black"
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