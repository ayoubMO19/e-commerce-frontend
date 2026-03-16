import { Phone, Mail, Linkedin, Github, Zap } from "lucide-react";

// Contact page
export default function Contact() {
  return (
    <div className="mx-auto max-w-4xl space-y-16 py-12 px-4 animate-in fade-in duration-700">
      <header className="space-y-4 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-black shadow-xl">
          <Zap className="h-7 w-7 text-vexa fill-vexa" />
        </div>
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tighter text-black uppercase italic">
            Get in Touch
          </h1>
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-vexa opacity-80">
            Comunicate con nuestro equipo Vexa
          </p>
        </div>
      </header>

      <div className="grid gap-6 sm:grid-cols-2">
        <a
          href="tel:+34631515999"
          className="group flex flex-col items-center gap-6 rounded-[2.5rem] border border-zinc-100 bg-white p-10 text-center shadow-2xl shadow-black/5 transition-all hover:border-vexa/30 hover:scale-[1.02]"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-50 text-black transition-colors group-hover:bg-black group-hover:text-vexa">
            <Phone className="h-7 w-7" />
          </div>
          <div className="space-y-2">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Teléfono</h3>
            <p className="text-lg font-black text-black italic">+34 631 515 999</p>
          </div>
        </a>
        <a
          href="mailto:ayoubmorghiouhda@gmail.com"
          className="group flex flex-col items-center gap-6 rounded-[2.5rem] border border-zinc-100 bg-white p-10 text-center shadow-2xl shadow-black/5 transition-all hover:border-vexa/30 hover:scale-[1.02]"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-50 text-black transition-colors group-hover:bg-black group-hover:text-vexa">
            <Mail className="h-7 w-7" />
          </div>
          <div className="space-y-2">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Correo Electrónico</h3>
            <p className="text-sm font-black text-black break-all">ayoubmorghiouhda@gmail.com</p>
          </div>
        </a>
      </div>

      <section className="space-y-8 pt-8">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-zinc-100"></div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
            Digital Identity
          </h2>
          <div className="h-px flex-1 bg-zinc-100"></div>
        </div>

        <div className="flex justify-center gap-6">
          <a
            href="https://www.linkedin.com/in/ayoub-morghi-ouhda/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-100 bg-white text-black shadow-lg shadow-black/5 transition-all hover:bg-black hover:text-vexa hover:border-vexa/30 hover:-translate-y-1"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href="https://github.com/ayoubMO19"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-100 bg-white text-black shadow-lg shadow-black/5 transition-all hover:bg-black hover:text-vexa hover:border-vexa/30 hover:-translate-y-1"
          >
            <Github className="h-6 w-6" />
          </a>
        </div>
      </section>
    </div>
  );
}