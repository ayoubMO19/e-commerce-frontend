import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, AlertCircle, Loader2, X } from "lucide-react";
import { ProductCard } from "../../components/ProductCard";
import { useProductsData, useCategoriesData } from "../../hooks/useProductsData";
import type { CategoriesResponseDTO } from "../../types/api";

// Types and constants
type PriceRangeId = "all" | "0-100" | "100-200" | "200plus";

// Price ranges
const PRICE_RANGES: { id: PriceRangeId; label: string; min: number; max: number }[] = [
  { id: "all", label: "Todos los precios", min: 0, max: Infinity },
  { id: "0-100", label: "Hasta 100 €", min: 0, max: 100 },
  { id: "100-200", label: "100 € - 200 €", min: 100, max: 200 },
  { id: "200plus", label: "Más de 200 €", min: 200, max: Infinity },
];

// Filter props
interface FilterProps {
  isLoadingCategories: boolean;
  categories: CategoriesResponseDTO[];
  selectedCategoryIds: number[];
  selectedPriceRange: PriceRangeId;
  toggleCategory: (id: number) => void;
  setPriceFilter: (rangeId: PriceRangeId) => void;
}

// Filter sidebar
const FilterSidebar = ({
  isLoadingCategories,
  categories,
  selectedCategoryIds,
  selectedPriceRange,
  toggleCategory,
  setPriceFilter,
}: FilterProps) => (
  <div className="space-y-10">
    <section className="space-y-5">
      <h3 className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-900">Categorías</h3>
      <div className="flex flex-col gap-1.5">
        {isLoadingCategories ? (
          <div className="flex justify-center py-4"><Loader2 className="h-5 w-5 animate-spin text-gray-200" /></div>
        ) : (
          categories.map((cat) => (
            <button
              key={cat.categoryId}
              onClick={() => toggleCategory(cat.categoryId)}
              className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-xs font-medium transition-all ${selectedCategoryIds.includes(cat.categoryId)
                ? "bg-gray-900 text-white shadow-sm"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
            >
              {cat.name}
              {selectedCategoryIds.includes(cat.categoryId) && <X className="h-3 w-3 opacity-50" />}
            </button>
          ))
        )}
      </div>
    </section>
    <section className="space-y-5">
      <h3 className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-900">Rango de precio</h3>
      <div className="flex flex-col gap-1.5">
        {PRICE_RANGES.map((range) => (
          <button
            key={range.id}
            onClick={() => setPriceFilter(range.id)}
            className={`rounded-xl px-4 py-2.5 text-left text-xs font-medium transition-all ${selectedPriceRange === range.id
              ? "bg-gray-100 font-bold text-gray-900"
              : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
          >
            {range.label}
          </button>
        ))}
      </div>
    </section>
  </div>
);

// Main component
export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch products and categories
  const { data: products = [], isLoading: isLoadingProducts, isError: isErrorProducts } = useProductsData();
  const { data: categories = [], isLoading: isLoadingCategories } = useCategoriesData();

  // Get selected category IDs from URL params
  const selectedCategoryIds = useMemo(() => {
    const param = searchParams.get("category");
    return param ? param.split(",").map(Number).filter((id) => !isNaN(id)) : [];
  }, [searchParams]);

  // Get selected price range from URL params
  const selectedPriceRange = (searchParams.get("price") as PriceRangeId) || "all";

  // Filter products based on search, category, and price range
  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase().trim();
    const priceRange = PRICE_RANGES.find((r) => r.id === selectedPriceRange) || PRICE_RANGES[0];

    return products.filter((product) => {
      const matchesSearch = !normalizedSearch ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch);
      const matchesCategory = selectedCategoryIds.length === 0 || selectedCategoryIds.includes(product.categoryId);
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchTerm, selectedCategoryIds, selectedPriceRange, products]);

  // Toggle category filter
  const toggleCategory = (id: number) => {
    const newSelection = selectedCategoryIds.includes(id)
      ? selectedCategoryIds.filter((c) => c !== id)
      : [...selectedCategoryIds, id];
    if (newSelection.length > 0) searchParams.set("category", newSelection.join(","));
    else searchParams.delete("category");
    setSearchParams(searchParams);
  };

  // Set price filter
  const setPriceFilter = (rangeId: PriceRangeId) => {
    if (rangeId === "all") searchParams.delete("price");
    else searchParams.set("price", rangeId);
    setSearchParams(searchParams);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm("");
    setSearchParams({});
    setIsMobileMenuOpen(false);
  };

  // Filter props
  const filterProps: FilterProps = {
    isLoadingCategories,
    categories,
    selectedCategoryIds,
    selectedPriceRange,
    toggleCategory,
    setPriceFilter,
  };

  // Error state
  if (isErrorProducts) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-[2.5rem] border border-gray-100 bg-gray-50/50 p-10 text-center">
        <AlertCircle className="mb-4 h-10 w-10 text-gray-300" />
        <h2 className="text-lg font-bold text-gray-900">Catálogo no disponible</h2>
        <p className="text-sm text-gray-500">Estamos actualizando nuestro stock. Inténtalo de nuevo pronto.</p>
      </div>
    );
  }

  // Main content
  return (
    <div className="relative min-h-screen">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <header className="space-y-1">
          <h1 className="text-4xl font-black tracking-tighter text-gray-900">Nuestra Colección</h1>
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
            {filteredProducts.length} Piezas disponibles
          </p>
        </header>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-300" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border border-gray-100 bg-white py-3.5 pl-11 pr-4 text-xs font-medium outline-none shadow-sm focus:border-gray-200"
            />
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex h-[46px] items-center gap-2 rounded-2xl border border-gray-100 bg-white px-5 lg:hidden shadow-sm"
          >
            <SlidersHorizontal className="h-4 w-4 text-gray-900" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-gray-900">Filtros</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[260px,1fr]">
        <aside className="hidden space-y-6 lg:sticky lg:top-24 lg:block lg:self-start">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">Navegación</h2>
            {(selectedCategoryIds.length > 0 || selectedPriceRange !== "all" || searchTerm) && (
              <button onClick={clearAllFilters} className="text-[10px] font-bold uppercase text-gray-400 hover:text-gray-900 transition-colors">
                Limpiar
              </button>
            )}
          </div>
          <div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm">
            <FilterSidebar {...filterProps} />
          </div>
        </aside>
        <main>
          {isLoadingProducts ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-[400px] animate-pulse rounded-[2.5rem] bg-gray-50 border border-gray-100" />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-[3rem] border border-dashed border-gray-200 bg-gray-50/30 py-32 text-center">
              <Search className="mb-4 h-8 w-8 text-gray-200" />
              <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">Sin resultados</p>
              <button onClick={clearAllFilters} className="mt-4 text-[13px] font-bold text-gray-900 underline underline-offset-8">
                Ver catálogo completo
              </button>
            </div>
          ) : (
            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.productId}
                  product={product}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* MOBILE FILTER DRAWER */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end lg:hidden">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative h-full w-[85%] max-w-xs animate-in slide-in-from-right bg-white p-8 shadow-2xl duration-300">
            <div className="mb-10 flex items-center justify-between">
              <h2 className="text-sm font-black uppercase text-gray-900">Filtros</h2>
              <button onClick={() => setIsMobileMenuOpen(false)} className="rounded-full bg-gray-50 p-2"><X className="h-5 w-5" /></button>
            </div>
            <FilterSidebar {...filterProps} />
            <div className="absolute bottom-8 left-8 right-8 space-y-3">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full rounded-2xl bg-gray-900 py-4 text-[11px] font-bold uppercase tracking-widest text-white shadow-lg"
              >
                Ver resultados
              </button>
              <button onClick={clearAllFilters} className="w-full text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Restablecer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}