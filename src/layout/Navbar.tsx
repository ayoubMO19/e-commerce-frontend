import { NavLink } from "react-router-dom";
import { ShoppingCart, User, LogOut } from "lucide-react";
import Logo from "../assets/logo.png";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";

const navLinkBase = "text-sm font-medium text-gray-600 transition hover:text-gray-900";
const navLinkActive = "text-black font-bold";

export function Navbar() {
  const { cartCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-0">
        
        {/* LOGO */}
        <NavLink to="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-transform group-hover:scale-105">
            <img src={Logo} alt="VEXA" className="h-8 w-8 object-contain" />
          </div>
          <span className="text-lg font-bold tracking-tighter text-gray-900">VEXA</span>
        </NavLink>

        {/* NAVEGACIÓN CENTRAL */}
        <nav className="hidden items-center gap-8 sm:flex">
          <NavLink to="/" className={({ isActive }) => `${navLinkBase} ${isActive ? navLinkActive : ""}`}>Inicio</NavLink>
          <NavLink to="/products" className={({ isActive }) => `${navLinkBase} ${isActive ? navLinkActive : ""}`}>Productos</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `${navLinkBase} ${isActive ? navLinkActive : ""}`}>Contacto</NavLink>
        </nav>

        {/* ACCIONES DERECHA */}
        <div className="flex items-center gap-3">
          
          {/* SIEMPRE VISIBLE: CARRITO */}
          <NavLink
            to="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white text-gray-700 transition-all hover:border-black hover:text-black shadow-sm"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold text-white ring-2 ring-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </NavLink>

          <div className="h-8 w-[1px] bg-gray-100 mx-1 hidden sm:block" />

          {/* PERFIL / LOGIN */}
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="hidden flex-col items-end lg:flex">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Cuenta</span>
                <span className="text-sm font-bold text-gray-900">{user?.name}</span>
              </div>
              <button
                onClick={logout}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all border border-transparent hover:border-red-100"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="flex h-10 items-center gap-2 rounded-full bg-black px-5 py-2 text-xs font-bold text-white transition-all hover:bg-gray-800 shadow-md active:scale-95"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Identificarse</span>
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}