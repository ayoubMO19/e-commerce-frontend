import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, PackageX } from "lucide-react";
import type { ProductResponseDTO, CategoriesResponseDTO } from "../../types/api";
import { useCart } from "../../hooks/useCart";
import { productService, categoriesService } from "../../services/api";

type PriceRangeId = "all" | "0-100" | "100-200" | "200plus";

const PRICE_RANGES: { id: PriceRangeId; label: string; min: number; max: number; }[] = [
  { id: "all", label: "Todos", min: 0, max: Infinity },
  { id: "0-100", label: "Hasta 100 €", min: 0, max: 100 },
  { id: "100-200", label: "100 € - 200 €", min: 100, max: 200 },
  { id: "200plus", label: "Más de 200 €", min: 200, max: Infinity },
];

export default function Products() {
  const { addToCart } = useCart();

  // Estados de datos
  const [products, setProducts] = useState<ProductResponseDTO[]>([]);
  const [categories, setCategories] = useState<CategoriesResponseDTO[]>([]);
  
  // Estados de UI
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estados de Filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRangeId>("all");

  // Carga inicial de Productos y Categorías Reales
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setIsLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          productService.getAll(),
          categoriesService.getAll()
        ]);

        if (isMounted) {
          setProducts(productsData);
          setCategories(categoriesData);
        }
      } catch {
        if (isMounted) setError("Error al conectar con el servidor.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadData();
    return () => { isMounted = false; };
  }, []);

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

  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

  // TODO: ELIMINAR CUANDO SE INTEGRE EN BACKEND
  // Función para obtener el nombre de la categoría según el ID
  const getCategoryName = (id: number) => {
    return categories.find(cat => cat.categoryId === id)?.name || "General";
  };

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
              {categories.map((cat) => (
                <button
                  key={cat.categoryId}
                  onClick={() => toggleCategory(cat.categoryId)}
                  className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-all ${
                    selectedCategoryIds.includes(cat.categoryId)
                      ? "bg-black text-white"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {cat.name}
                  {selectedCategoryIds.includes(cat.categoryId) && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                </button>
              ))}
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
              className="w-full rounded-2xl border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm focus:border-black focus:ring-0 transition-all shadow-sm"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-80 animate-pulse rounded-3xl bg-gray-100" />)}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <article
                key={product.productId}
                className="group flex flex-col bg-white rounded-3xl border border-gray-100 p-4 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300"
              >
                {/* Imagen con badges de estado y categoría */}
                <div className="relative aspect-square rounded-2xl bg-gray-50 overflow-hidden mb-4">
                  <img
                    src={product.urlImage}
                    alt={product.name}
                    className="h-full w-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Badge de Categoría Dinámico */}
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-900 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-gray-100 shadow-sm z-10">
                    {getCategoryName(product.categoryId)}
                  </span>

                  {/* Badge de Stock Crítico */}
                  {product.stock <= 5 && product.stock > 0 && (
                    <span className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg uppercase shadow-sm z-10">
                      Últimas unidades
                    </span>
                  )}

                  {/* Overlay de Agotado */}
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center z-20">
                      <div className="flex flex-col items-center text-red-600">
                        <PackageX className="h-8 w-8" />
                        <span className="text-[10px] font-bold uppercase mt-1">Agotado</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Detalles del Producto */}
                <div className="flex-1 flex flex-col px-1">
                  {/* Etiqueta de categoría superior */}
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">
                    {getCategoryName(product.categoryId)}
                  </p>
                  
                  <h3 className="font-bold text-gray-900 leading-tight mb-1 group-hover:text-black transition-colors">
                    {product.name}
                  </h3>
                  
                  <p className="text-xs text-gray-500 line-clamp-2 mb-4">
                    {product.description}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-gray-50">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-black text-gray-900">
                        {product.price.toLocaleString("es-ES", {
                          style: "currency",
                          currency: "EUR",
                        })}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                        Stock: {product.stock}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => addToCart(product)}
                        disabled={product.stock === 0}
                        className="flex-1 bg-black text-white py-3 rounded-2xl text-xs font-bold hover:bg-gray-800 disabled:bg-gray-100 disabled:text-gray-400 transition-all active:scale-95"
                      >
                        Añadir al carrito
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}