import { useState } from "react";
import { Link } from "react-router-dom";
import type { ProductResponseDTO } from "../types/api";
import { Check, Plus } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { notify } from "../utils/notifications";

interface ProductCardProps {
  product: ProductResponseDTO;
}

export function ProductCard({ product }: ProductCardProps) {
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
    <article className="group relative flex flex-col bg-white rounded-[32px] border border-zinc-100 p-3 shadow-sm hover:shadow-md transition-all duration-300">

      <Link to={`/products/${product.productId}`} className="flex flex-col flex-1">

        <div className="relative aspect-square rounded-[24px] bg-zinc-50 overflow-hidden mb-3 flex items-center justify-center">
          <img
            src={product.urlImage}
            alt={product.name}
            className="h-3/4 w-3/4 object-contain group-hover:scale-105 transition-transform duration-500"
          />

          {product.categoryName && (
            <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[8px] font-black uppercase tracking-widest text-black px-2.5 py-1 rounded-full border border-zinc-100 shadow-sm z-10">
              <span className="text-vexa mr-1">•</span> {product.categoryName}
            </span>
          )}

          {product.stock === 0 && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-20">
              <span className="bg-black text-white text-[9px] font-black uppercase tracking-[3px] px-3 py-1 rounded-full">
                Sold Out
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col px-1 pb-3">
          <p className="text-[8px] font-black uppercase tracking-[3px] text-vexa mb-1">
            Vexa Concept
          </p>

          <h3 className="text-sm font-bold text-black leading-tight line-clamp-2">
            {product.name}
          </h3>
        </div>
      </Link>

      <div className="mt-auto pt-3 border-t border-zinc-50 px-1">
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-black text-black tracking-tighter">
            {product.price.toLocaleString("es-ES", {
              style: "currency",
              currency: "EUR",
            })}
          </span>

          <div className="flex items-center gap-1">
            <div className={`h-1 w-1 rounded-full ${product.stock > 0
                ? 'bg-vexa shadow-[0_0_5px_rgba(111,222,138,0.8)]'
                : 'bg-zinc-200'
              }`}></div>
            <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-400">
              {product.stock > 0 ? 'Stock' : 'Out'}
            </span>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0 || isAdded}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[2px] transition-all active:scale-95 ${isAdded
              ? "bg-vexa text-black shadow-lg shadow-vexa/20"
              : "bg-black text-white hover:bg-zinc-800 disabled:bg-zinc-100 disabled:text-zinc-300"
            }`}
        >
          {isAdded ? (
            <Check className="h-4 w-4 stroke-[3px]" />
          ) : (
            <>
              <Plus className="h-3.5 w-3.5 text-vexa" />
              <span>Añadir</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}