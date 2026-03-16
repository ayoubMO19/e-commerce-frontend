import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

// Payment success page
export default function PaymentSuccess() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-vexa opacity-20 blur-2xl rounded-full animate-pulse"></div>
                <div className="relative bg-white border border-zinc-100 p-6 rounded-[32px] shadow-sm">
                    <CheckCircle2 size={48} className="text-vexa stroke-[1.5px]" />
                </div>
            </div>
            <div className="text-center space-y-3">
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-black">
                    ¡Pago Confirmado!
                </h1>
                <p className="text-zinc-400 text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">
                    Bienvenido a la selección exclusiva de VEXA.
                </p>
            </div>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <Link
                    to="/my-orders"
                    className="flex-1 flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-200"
                >
                    Ver mis pedidos
                </Link>
                <Link
                    to="/products"
                    className="flex-1 flex items-center justify-center gap-2 bg-white text-black border border-zinc-200 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-50 transition-all"
                >
                    Seguir comprando
                    <ArrowRight size={14} className="text-vexa" />
                </Link>
            </div>
            <div className="mt-16 flex items-center gap-4 opacity-20">
                <div className="h-[1px] w-12 bg-zinc-400"></div>
                <span className="text-[8px] font-black uppercase tracking-[4px]">Vexa Store</span>
                <div className="h-[1px] w-12 bg-zinc-400"></div>
            </div>
        </div>
    );
}