import { useState } from "react";
import { Link } from "react-router-dom";
import type { ProductResponseDTO } from "../types/api";
import { ShoppingCart, Check, PackageX } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { notify } from "../utils/notifications";

interface ProductCardProps {
  product: ProductResponseDTO;
  categoryName?: string;
}

export function ProductCard({ product, categoryName }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.stock <= 0) return;

    addToCart(product);
    setIsAdded(true);
    notify.success("¡Producto añadido!");

    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <article className="group relative flex flex-col bg-white rounded-3xl border border-gray-100 p-3 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300">
      
      {/* Enlace a detalles */}
      <Link to={`/products/${product.productId}`} className="flex flex-col flex-1">
        
        {/* Contenedor de Imagen */}
        <div className="relative aspect-square rounded-2xl bg-gray-50 overflow-hidden mb-3">
          <img
            src={product.urlImage}
            alt={product.name}
            className="h-full w-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Badge de Categoría */}
          {categoryName && (
            <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[9px] font-black uppercase tracking-tighter text-gray-900 px-2 py-1 rounded-lg border border-gray-100 shadow-sm z-10">
              {categoryName}
            </span>
          )}

          {/* Badge de Stock Crítico */}
          {product.stock <= 5 && product.stock > 0 && (
            <span className="absolute top-3 left-3 bg-orange-500 text-white text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-tighter shadow-sm z-10">
              Últimas unidades
            </span>
          )}

          {/* Overlay de Agotado */}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center z-20">
              <div className="flex flex-col items-center text-red-600">
                <PackageX className="h-7 w-7" />
                <span className="text-[10px] font-black uppercase mt-1">Agotado</span>
              </div>
            </div>
          )}
        </div>

        {/* Info del Producto */}
        <div className="flex flex-col px-1 pb-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
            {categoryName || "Premium Collection"}
          </p>
          
          <h3 className="text-sm font-bold text-gray-900 leading-tight group-hover:text-black transition-colors line-clamp-1">
            {product.name}
          </h3>
        </div>
      </Link>

      {/* Precio y Botón */}
      <div className="mt-auto pt-3 border-t border-gray-50 px-1">
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-black text-gray-900">
            {product.price.toLocaleString("es-ES", {
              style: "currency",
              currency: "EUR",
            })}
          </span>
          <span className={`text-[10px] font-bold uppercase ${product.stock > 0 ? 'text-gray-400' : 'text-red-400'}`}>
            {product.stock > 0 ? `Stock: ${product.stock}` : "No disponible"}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0 || isAdded}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-[11px] font-bold transition-all active:scale-95 ${
            isAdded 
              ? "bg-green-50 text-green-600" 
              : "bg-black text-white hover:bg-gray-800 disabled:bg-gray-100 disabled:text-gray-400"
          }`}
        >
          {isAdded ? (
            <>
              <Check className="h-4 w-4" />
              <span>LISTO</span>
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" />
              <span>AÑADIR</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}