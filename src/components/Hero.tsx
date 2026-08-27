import { Link } from "react-router-dom";
import { ArrowRight, Wrench } from "lucide-react";

// Hero component
export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[40px] bg-black px-6 py-20 sm:px-12 sm:py-32 lg:px-16">
      <div className="absolute -top-24 -right-24 h-96 w-96 bg-brand opacity-10 blur-[120px]" />
      <div className="absolute -bottom-24 -left-24 h-96 w-96 bg-brand opacity-5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand/30 bg-brand/5 mb-6">
          <Wrench size={12} className="text-brand" />
          <span className="text-[10px] font-black uppercase tracking-[3px] text-brand">Piezas originales directas de taller</span>
        </div>

        <h1 className="mb-6 text-3xl font-black tracking-tighter text-white sm:text-5xl lg:text-6xl uppercase italic leading-[0.9]">
          Recambios <span className="text-brand">MOTORPART</span> <br /> sin sobreprecio
        </h1>

        <p className="mb-10 text-base text-zinc-400 sm:text-lg max-w-xl mx-auto font-medium uppercase tracking-widest text-[10px]">
          Mismo taller, mismo origen, sin intermediarios.
        </p>

        <Link
          to="/products"
          className="group inline-flex items-center gap-3 rounded-full bg-brand px-10 py-4 text-[11px] font-black uppercase tracking-[2px] text-white transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]"
        >
          Ver catálogo
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}