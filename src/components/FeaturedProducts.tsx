import { Link } from "react-router-dom";
import { ProductCard } from "./ProductCard";
import type { ProductResponseDTO } from "../types/api";
import { ArrowRight } from "lucide-react";

interface FeaturedProductsProps {
  products: ProductResponseDTO[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const featuredProducts = products.slice(0, 8);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight text-gray-900">
          Productos destacados
        </h2>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {featuredProducts.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
      <div className="flex justify-center pt-4">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 rounded-full border border-gray-900 bg-white px-6 py-2.5 text-sm font-medium text-gray-900 transition hover:bg-gray-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
        >
          Ver más
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
