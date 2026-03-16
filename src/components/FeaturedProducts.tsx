import { Link } from "react-router-dom";
import { ProductCard } from "./ProductCard";
import type { ProductResponseDTO } from "../types/api";
import { ArrowRight } from "lucide-react";

// FeaturedProducts props interface
interface FeaturedProductsProps {
  products: ProductResponseDTO[];
}

// FeaturedProducts component
export function FeaturedProducts({ products }: FeaturedProductsProps) {
  // Get first 8 products
  const featuredProducts = products.slice(0, 8);

  return (
    <section className="space-y-10 py-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black uppercase tracking-tighter text-black italic">
          Productos <span className="text-zinc-300">Destacados</span>
        </h2>
        <div className="h-[1px] flex-1 mx-8 bg-zinc-100 hidden md:block"></div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featuredProducts.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>

      <div className="flex justify-center pt-8">
        <Link
          to="/products"
          className="group flex items-center gap-3 rounded-full border-2 border-black bg-white px-10 py-4 text-[10px] font-black uppercase tracking-[2px] text-black transition-all hover:bg-black hover:text-white"
        >
          Explorar catálogo completo
          <ArrowRight className="h-4 w-4 text-vexa" />
        </Link>
      </div>
    </section>
  );
}