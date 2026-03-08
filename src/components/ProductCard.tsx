import { useState } from "react";
import type { ProductResponseDTO } from "../types/api";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { notify } from "../utils/notifications";

interface ProductCardProps {
  product: ProductResponseDTO;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    // Si no hay stock no se añade
    if (product.stock <= 0) return;

    addToCart(product);
    setIsAdded(true);

    // Reset feedback después de 2 segundos
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);

    // Si todo va bien
    notify.success("¡Producto añadido!");
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={product.urlImage}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {product.stock <= 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-black/80 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-white">
            Agotado
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <header className="space-y-1">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-2">
            {product.description}
          </p>
        </header>

        <div className="mt-auto flex items-center justify-between pt-1">
          <div className="space-y-0.5">
            <p className="text-base font-semibold text-gray-900">
              {product.price.toLocaleString("es-ES", {
                style: "currency",
                currency: "EUR",
              })}
            </p>
            <p className="text-xs text-gray-500">
              {product.stock > 0 ? `Stock: ${product.stock}` : "Sin stock"}
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              isAdded
                ? "border-green-500 bg-green-50 text-green-700 focus-visible:ring-green-500"
                : product.stock <= 0
                ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                : "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white focus-visible:ring-gray-900"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="h-4 w-4" />
                <span>Añadido</span>
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                <span>Añadir</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

