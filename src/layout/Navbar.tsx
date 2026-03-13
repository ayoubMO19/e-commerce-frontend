import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Package, Settings, LogOut, ChevronDown } from "lucide-react";
import Logo from "../assets/logo.png";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";

const navLinkBase = "text-sm font-medium text-gray-600 transition-colors hover:text-gray-900";
const navLinkActive = "text-black font-bold";

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
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-0">

        {/* LOGO */}
        <NavLink to="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
            <img src={Logo} alt="VEXA" className="h-8 w-8 object-contain" />
          </div>
          <span className="text-lg font-bold tracking-tighter text-gray-900 uppercase">VEXA</span>
        </NavLink>

        {/* NAVEGACIÓN CENTRAL */}
        <nav className="hidden items-center gap-8 sm:flex">
          <NavLink to="/" className={({ isActive }) => `${navLinkBase} ${isActive ? navLinkActive : ""}`}>Inicio</NavLink>
          <NavLink to="/products" className={({ isActive }) => `${navLinkBase} ${isActive ? navLinkActive : ""}`}>Productos</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `${navLinkBase} ${isActive ? navLinkActive : ""}`}>Contacto</NavLink>
        </nav>

        {/* ACCIONES DERECHA */}
        <div className="flex items-center gap-4">

          {/* CARRITO */}
          <NavLink
            to="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white text-gray-700 transition-all hover:border-black hover:text-black shadow-sm active:scale-90"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold text-white ring-2 ring-white animate-in zoom-in">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </NavLink>

          <div className="h-6 w-[1px] bg-gray-200 mx-1 hidden sm:block" />

          {/* PERFIL CON DESPLEGABLE */}
          {isAuthenticated ? (
            <div 
              className="relative"
              onMouseEnter={() => setIsMenuOpen(true)}
              onMouseLeave={() => setIsMenuOpen(false)}
            >
              <button
                className={`
                  group flex items-center gap-3 rounded-2xl py-1.5 pl-3 pr-2 transition-all duration-300
                  ${isMenuOpen ? "bg-gray-100 shadow-inner" : "hover:bg-gray-50"}
                `}
              >
                <div className="flex flex-col items-end hidden sm:flex">
                  <span className="text-[10px] font-black uppercase tracking-[0.1em] text-gray-400 group-hover:text-black transition-colors leading-none">
                    {user?.name?.split(' ')[0]}
                  </span>
                  <ChevronDown size={10} className={`mt-1 transition-transform duration-300 ${isMenuOpen ? "rotate-180" : ""}`} />
                </div>

                <div className="relative">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white shadow-lg transition-all duration-300 group-hover:scale-105">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500" />
                </div>
              </button>

              {/* DROPDOWN MENU */}
              {isMenuOpen && (
                <div className="absolute right-0 top-full w-48 pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="overflow-hidden rounded-[24px] border border-gray-100 bg-white p-2 shadow-2xl shadow-black/5">
                    
                    <NavLink
                      to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-[10px] font-black uppercase tracking-widest text-gray-500 transition-colors hover:bg-gray-50 hover:text-black"
                    >
                      <Settings size={14} />
                      Mi Perfil
                    </NavLink>

                    <NavLink
                      to="/my-orders"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-[10px] font-black uppercase tracking-widest text-gray-500 transition-colors hover:bg-gray-50 hover:text-black"
                    >
                      <Package size={14} />
                      Mis Pedidos
                    </NavLink>

                    <div className="my-1 h-[1px] bg-gray-100" />

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[10px] font-black uppercase tracking-widest text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
                    >
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
              className="flex h-10 items-center gap-2 rounded-full bg-black px-6 text-xs font-bold text-white transition-all hover:bg-gray-800 hover:shadow-lg active:scale-95"
            >
              <User className="h-4 w-4" />
              <span>Acceder</span>
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}