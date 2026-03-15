import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { 
  ShoppingCart, User, Package, Settings, LogOut, 
  ChevronDown, Zap // <-- Usaremos Zap como nuestra "V" icónica
} from "lucide-react";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";

const navLinkBase = "relative text-[10px] font-black uppercase tracking-[2px] text-zinc-500 transition-all duration-300 hover:text-black";
const navLinkActive = "text-black after:content-[''] after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-[2px] after:bg-vexa after:shadow-[0_0_8px_theme(colors.vexa.DEFAULT)]";

export function Navbar() {
  const { cartCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-0">

        {/* LOGO: Ahora con icono "V" estilizado */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-100 bg-black shadow-sm transition-all duration-500 group-hover:border-vexa/50 group-hover:shadow-[0_0_20px_rgba(111,222,138,0.3)]">
            <Zap className="h-5 w-5 text-vexa fill-vexa transition-all duration-500 group-hover:scale-110 group-hover:rotate-12" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-black tracking-tighter text-black uppercase italic">VEXA</span>
            <span className="text-[7px] font-black tracking-[3px] text-vexa uppercase ml-0.5">Studio</span>
          </div>
        </NavLink>

        {/* NAVEGACIÓN CENTRAL */}
        <nav className="hidden items-center gap-10 sm:flex">
          <NavLink to="/" className={({ isActive }) => `${navLinkBase} ${isActive ? navLinkActive : ""}`}>Inicio</NavLink>
          <NavLink to="/products" className={({ isActive }) => `${navLinkBase} ${isActive ? navLinkActive : ""}`}>Productos</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `${navLinkBase} ${isActive ? navLinkActive : ""}`}>Contacto</NavLink>
        </nav>

        {/* ACCIONES DERECHA */}
        <div className="flex items-center gap-4">

          {/* CARRITO */}
          <NavLink
            to="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-zinc-100 bg-white text-zinc-700 transition-all hover:border-black hover:text-black shadow-sm active:scale-90"
          >
            <ShoppingCart className="h-5 w-5 stroke-[1.5px]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-vexa px-1 text-[10px] font-black text-black ring-4 ring-white shadow-[0_0_10px_theme(colors.vexa.DEFAULT)]">
                {cartCount}
              </span>
            )}
          </NavLink>

          <div className="h-6 w-[1px] bg-zinc-100 mx-1 hidden sm:block" />

          {/* PERFIL */}
          {isAuthenticated ? (
            <div 
              className="relative"
              onMouseEnter={() => setIsMenuOpen(true)}
              onMouseLeave={() => setIsMenuOpen(false)}
            >
              <button className={`group flex items-center gap-3 rounded-[20px] py-1.5 pl-3 pr-2 transition-all duration-300 ${isMenuOpen ? "bg-zinc-50" : "hover:bg-zinc-50/50"}`}>
                <div className="flex flex-col items-end hidden sm:flex text-right">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 group-hover:text-black transition-colors leading-none">
                    {user?.name?.split(' ')[0]}
                  </span>
                  <ChevronDown size={10} className={`mt-1 text-zinc-300 transition-transform duration-500 ${isMenuOpen ? "rotate-180 text-vexa" : ""}`} />
                </div>

                <div className="relative">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white shadow-lg transition-all duration-300 group-hover:scale-105">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-vexa shadow-[0_0_8px_theme(colors.vexa.DEFAULT)]" />
                </div>
              </button>

              {/* DROPDOWN */}
              {isMenuOpen && (
                <div className="absolute right-0 top-full w-52 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="overflow-hidden rounded-[28px] border border-zinc-100 bg-white/95 backdrop-blur-md p-2 shadow-2xl shadow-black/5">
                    <NavLink to="/profile" onClick={() => setIsMenuOpen(false)} className="group flex items-center gap-3 rounded-xl px-4 py-3 text-[9px] font-black uppercase tracking-widest text-zinc-500 transition-all hover:bg-zinc-50 hover:text-black">
                      <Settings size={14} className="group-hover:rotate-45 transition-transform text-zinc-400 group-hover:text-vexa" />
                      Mi Perfil
                    </NavLink>
                    <NavLink to="/my-orders" onClick={() => setIsMenuOpen(false)} className="group flex items-center gap-3 rounded-xl px-4 py-3 text-[9px] font-black uppercase tracking-widest text-zinc-500 transition-all hover:bg-zinc-50 hover:text-black">
                      <Package size={14} className="text-zinc-400 group-hover:text-vexa" />
                      Mis Pedidos
                    </NavLink>
                    <div className="my-2 h-[1px] bg-zinc-50" />
                    <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[9px] font-black uppercase tracking-widest text-red-400 transition-colors hover:bg-red-50 hover:text-red-600">
                      <LogOut size={14} />
                      Salir
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <NavLink
              to="/login"
              className="flex h-11 items-center gap-3 rounded-full bg-black px-8 text-[10px] font-black uppercase tracking-widest text-white transition-all hover:shadow-[0_10px_20px_rgba(111,222,138,0.15)] hover:scale-[1.02] active:scale-95 border border-transparent hover:border-vexa/30"
            >
              <Zap className="h-4 w-4 text-vexa fill-vexa" />
              <span>Acceder</span>
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}