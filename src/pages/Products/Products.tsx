import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, AlertCircle, Loader2 } from "lucide-react";
import { ProductCard } from "../../components/ProductCard";
import { useProductsData, useCategoriesData } from "../../hooks/useProductsData";

type PriceRangeId = "all" | "0-100" | "100-200" | "200plus";

const PRICE_RANGES: { id: PriceRangeId; label: string; min: number; max: number; }[] = [
  { id: "all", label: "Todos", min: 0, max: Infinity },
  { id: "0-100", label: "Hasta 100 €", min: 0, max: 100 },
  { id: "100-200", label: "100 € - 200 €", min: 100, max: 200 },
  { id: "200plus", label: "Más de 200 €", min: 200, max: Infinity },
];

export default function Products() {
  // --- HOOKS DE TANSTACK QUERY ---
  const { 
    data: products = [], 
    isLoading: isLoadingProducts, 
    isError: isErrorProducts 
  } = useProductsData();
  
  const { 
    data: categories = [], 
    isLoading: isLoadingCategories 
  } = useCategoriesData();

  // --- ESTADOS DE FILTROS ---
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRangeId>("all");

  // Lógica de filtrado
  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase().trim();
    const priceRange = PRICE_RANGES.find(r => r.id === selectedPriceRange)!;

    return products.filter((product) => {
      const matchesSearch = !normalizedSearch || 
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch);

      const matchesCategory = selectedCategoryIds.length === 0 || 
        selectedCategoryIds.includes(product.categoryId);

      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchTerm, selectedCategoryIds, selectedPriceRange, products]);

  const toggleCategory = (id: number) => {
    setSelectedCategoryIds(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const getCategoryName = (id: number) => {
    return categories.find(cat => cat.categoryId === id)?.name || "General";
  };

  // Manejo de Error Crítico
  if (isErrorProducts) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-red-100 bg-red-50 p-10 text-center">
        <AlertCircle className="mb-4 h-10 w-10 text-red-500" />
        <h2 className="text-lg font-bold text-red-900">Error de conexión</h2>
        <p className="text-red-600">No pudimos cargar los productos de VEXA. Por favor, intenta de nuevo más tarde.</p>
      </div>
    );
  }

  const isLoadingInitial = isLoadingProducts || isLoadingCategories;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px,1fr] gap-8">
      {/* Sidebar de Filtros */}
      <aside className="lg:sticky lg:top-24 lg:self-start space-y-6">
        <div className="flex items-center gap-2 px-1">
          <SlidersHorizontal className="h-4 w-4 text-gray-400" />
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500">Filtros</h2>
        </div>

        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm space-y-8">
          {/* Categorías Dinámicas */}
          <section className="space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase">Categorías</h3>
            <div className="flex flex-col gap-2">
              {isLoadingCategories ? (
                <div className="flex justify-center py-4"><Loader2 className="h-5 w-5 animate-spin text-gray-300" /></div>
              ) : (
                categories.map((cat) => (
                  <button
                    key={cat.categoryId}
                    onClick={() => toggleCategory(cat.categoryId)}
                    className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-all ${
                      selectedCategoryIds.includes(cat.categoryId)
                        ? "bg-black text-white shadow-md"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {cat.name}
                    {selectedCategoryIds.includes(cat.categoryId) && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                  </button>
                ))
              )}
            </div>
          </section>

          {/* Rango de Precios */}
          <section className="space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase">Precio</h3>
            <div className="grid grid-cols-1 gap-2">
              {PRICE_RANGES.map((range) => (
                <button
                  key={range.id}
                  onClick={() => setSelectedPriceRange(range.id)}
                  className={`px-3 py-2 text-left text-sm rounded-xl transition-all ${
                    selectedPriceRange === range.id
                      ? "ring-2 ring-black font-semibold text-black"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </section>
        </div>
      </aside>

      {/* Listado de Productos */}
      <main className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <header>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">VEXA Store</h1>
            <p className="text-gray-500 mt-1">Explora productos actualizados en tiempo real.</p>
          </header>
          
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-black focus:ring-0 transition-all shadow-sm outline-none"
            />
          </div>
        </div>

        {isLoadingInitial ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-[400px] animate-pulse rounded-3xl bg-gray-100" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-lg font-medium text-gray-400">No hay productos que coincidan con los filtros.</p>
            <button 
              onClick={() => {setSearchTerm(""); setSelectedCategoryIds([]); setSelectedPriceRange("all");}}
              className="mt-4 text-sm font-bold text-black underline"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.productId} 
                product={product} 
                categoryName={getCategoryName(product.categoryId)} 
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}