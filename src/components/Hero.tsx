import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black px-6 py-16 sm:px-12 sm:py-24 lg:px-16">
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <h1 className="mb-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Estilo minimalista para tu día a día
        </h1>
        <p className="mb-8 text-base text-gray-300 sm:text-lg">
          Descubre nuestra colección de productos diseñados para ti.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 rounded-full border-2 border-white bg-white px-6 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
        >
          Comprar ahora
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200')] bg-cover bg-center opacity-10 mix-blend-overlay" />
    </section>
  );
}
