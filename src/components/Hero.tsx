import { Link } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[40px] bg-black px-6 py-20 sm:px-12 sm:py-32 lg:px-16">
      <div className="absolute -top-24 -right-24 h-96 w-96 bg-vexa opacity-10 blur-[120px]" />
      <div className="absolute -bottom-24 -left-24 h-96 w-96 bg-vexa opacity-5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-vexa/30 bg-vexa/5 mb-6">
          <Zap size={12} className="text-vexa fill-vexa" />
          <span className="text-[10px] font-black uppercase tracking-[3px] text-vexa">VEXA Official Collection</span>
        </div>

        <h1 className="mb-6 text-4xl font-black tracking-tighter text-white sm:text-6xl lg:text-7xl uppercase italic italic leading-[0.9]">
          Estilo <span className="text-vexa shadow-vexa">minimalista</span> <br /> para tu día a día
        </h1>

        <p className="mb-10 text-base text-zinc-400 sm:text-lg max-w-xl mx-auto font-medium uppercase tracking-widest text-[10px]">
          Engineering high-end essentials.
        </p>

        <Link
          to="/products"
          className="group inline-flex items-center gap-3 rounded-full bg-vexa px-10 py-4 text-[11px] font-black uppercase tracking-[2px] text-black transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(111,222,138,0.4)]"
        >
          Comprar ahora
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}