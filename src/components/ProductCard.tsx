import { useState } from "react";
import { Link } from "react-router-dom";
import type { ProductResponseDTO } from "../types/api";
import { Check, Plus } from "lucide-react";
import { useCart } from "../hooks/useCart";

// ProductCard props interface
interface ProductCardProps {
  product: ProductResponseDTO;
}

// ProductCard component
export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  // Handle add to cart
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock <= 0) return;

    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1000);
  };

  return (
    <article className="group relative flex flex-col bg-white rounded-[32px] border border-zinc-100 p-2.5 transition-all duration-500 hover:border-zinc-300 hover:shadow-xl hover:shadow-black/5">

      <Link to={`/products/${product.productId}`} className="flex flex-col flex-1">

        <div className="relative aspect-square rounded-[24px] bg-zinc-50 overflow-hidden mb-4 flex items-center justify-center p-8">
          <img
            src={product.urlImage}
            alt={product.name}
            className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />

          {product.categoryName && (
            <span className="absolute top-3 right-3 bg-black text-[7px] font-black uppercase tracking-[2px] text-white px-3 py-1.5 rounded-full z-10">
              {product.categoryName}
            </span>
          )}

          {product.stock === 0 && (
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center z-20">
              <span className="bg-black text-white text-[8px] font-black uppercase tracking-[3px] px-4 py-2 rounded-full">
                Agotado
              </span>
            </div>
          )}
        </div>

        <div className="px-2 pb-4 space-y-2">
          <h3 className="text-sm font-bold text-black leading-tight line-clamp-2 min-h-[2.5rem] group-hover:text-vexa transition-colors duration-300">
            {product.name}
          </h3>

          <div className="flex items-center justify-between pt-1">
            <span className="text-lg font-black text-black tracking-tighter">
              {product.price.toLocaleString("es-ES", {
                style: "currency",
                currency: "EUR",
              })}
            </span>

            <div className="flex items-center gap-1.5">
              <div className={`h-1.5 w-1.5 rounded-full ${product.stock > 0
                ? 'bg-vexa shadow-[0_0_8px_theme(colors.vexa.DEFAULT)]'
                : 'bg-zinc-200'
                }`} />
              <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-400">
                {product.stock > 0 ? 'Stock' : 'Out'}
              </span>
            </div>
          </div>
        </div>
      </Link>

      <div className="p-1">
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0 || isAdded}
          className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-[9px] font-black uppercase tracking-[2px] transition-all duration-300 active:scale-95 border ${isAdded
            ? "bg-black border-vexa/50 text-white"
            : "bg-black border-transparent text-white hover:bg-zinc-800 disabled:bg-zinc-100 disabled:text-zinc-300 shadow-md shadow-black/5"
            }`}
        >
          {isAdded ? (
            <>
              <Check className="h-4 w-4 text-vexa stroke-[3px] animate-in zoom-in duration-300" />
              <span className="text-zinc-400">Añadido</span>
            </>
          ) : (
            <>
              <Plus className="h-3.5 w-3.5 text-vexa" />
              <span>Añadir al carrito</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}