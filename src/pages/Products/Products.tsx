import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { ProductResponseDTO } from "../../types/api";
import { useCart } from "../../hooks/useCart";
import { productService } from "../../services/api";

type GadgetCategory = "Audio" | "Gaming" | "Wearables" | "Accesorios";

type GadgetProduct = ProductResponseDTO & {
  category: GadgetCategory;
};

const CATEGORY_FILTERS: GadgetCategory[] = [
  "Audio",
  "Gaming",
  "Wearables",
  "Accesorios",
];

type PriceRangeId = "all" | "0-100" | "100-200" | "200plus";

const PRICE_RANGES: {
  id: PriceRangeId;
  label: string;
  min: number;
  max: number;
}[] = [
  { id: "all", label: "Todos", min: 0, max: Infinity },
  { id: "0-100", label: "Hasta 100 €", min: 0, max: 100 },
  { id: "100-200", label: "100 € - 200 €", min: 100, max: 200 },
  { id: "200plus", label: "Más de 200 €", min: 200, max: Infinity },
];

export default function Products() {
  const { addToCart } = useCart();

  const [products, setProducts] = useState<ProductResponseDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<GadgetCategory[]>(
    []
  );
  const [selectedPriceRange, setSelectedPriceRange] =
    useState<PriceRangeId>("all");

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

  const gadgets: GadgetProduct[] = useMemo(() => {
    const CATEGORY_CYCLE: GadgetCategory[] = [
      "Audio",
      "Gaming",
      "Wearables",
      "Accesorios",
    ];

    return products.map((product, index) => ({
      ...product,
      category: CATEGORY_CYCLE[index % CATEGORY_CYCLE.length],
    }));
  }, [products]);

  const handleCategoryToggle = (category: GadgetCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredGadgets = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase().trim();
    const priceRange = PRICE_RANGES.find(
      (range) => range.id === selectedPriceRange
    )!;

    return gadgets.filter((product) => {
      const matchesSearch =
        !normalizedSearch ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      const matchesPrice =
        product.price >= priceRange.min && product.price <= priceRange.max;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchTerm, selectedCategories, selectedPriceRange, gadgets]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[260px,1fr] gap-6">
      {/* Sidebar de filtros */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="space-y-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-soft">
          <section className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">
              Categories
            </h2>
            <div className="space-y-2">
              {CATEGORY_FILTERS.map((category) => (
                <label
                  key={category}
                  className="flex cursor-pointer items-center justify-between gap-2 rounded-xl px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <span>{category}</span>
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                  />
                </label>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500">
              Price Range
            </h2>
            <div className="space-y-2">
              {PRICE_RANGES.map((range) => (
                <button
                  key={range.id}
                  type="button"
                  onClick={() => setSelectedPriceRange(range.id)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition ${
                    selectedPriceRange === range.id
                      ? "bg-gray-900 text-white"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span>{range.label}</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </aside>

      {/* Contenido principal */}
      <section className="space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            VEXA store
          </h1>
          <p className="text-sm text-gray-500">
            Descubre nuestra selección de productos para mejorar tu día a día.
          </p>
        </header>

        {/* Buscador */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, categoría..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm text-gray-900 placeholder-gray-400 shadow-sm transition focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            />
          </div>
          <p className="hidden text-xs text-gray-500 sm:block">
            {filteredGadgets.length}{" "}
            {filteredGadgets.length === 1 ? "producto" : "productos"}
          </p>
        </div>

        {isLoading ? (
          <div className="text-sm text-gray-500">Cargando productos...</div>
        ) : error ? (
          <div className="text-sm text-red-500">{error}</div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredGadgets.map((product) => (
              <article
                key={product.productId}
                className="flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex-1 space-y-4 p-5">
                  <div className="relative overflow-hidden rounded-2xl bg-gray-50 p-6">
                    <img
                      src={product.urlImage}
                      alt={product.name}
                      className="mx-auto h-40 w-full max-w-[220px] object-contain"
                    />
                  </div>

                  <div className="space-y-2">
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                      {product.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-100 px-5 py-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-base font-semibold text-gray-900">
                      {product.price.toLocaleString("es-ES", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </p>
                    {product.stock > 0 ? (
                      <p className="text-xs text-gray-500">
                        Stock: {product.stock}
                      </p>
                    ) : (
                      <p className="text-xs font-medium text-red-500">
                        Sin stock
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={product.stock <= 0}
                      onClick={() => addToCart(product)}
                      className="inline-flex flex-1 items-center justify-center rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-900 transition hover:border-gray-900 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Add to Cart
                    </button>
                    <button
                      type="button"
                      disabled={product.stock <= 0}
                      className="inline-flex flex-1 items-center justify-center rounded-full bg-black px-3 py-2 text-xs font-semibold text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
