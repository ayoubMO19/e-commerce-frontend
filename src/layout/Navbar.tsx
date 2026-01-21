import { NavLink } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import Logo from "../assets/logo.png";
import { useCart } from "../context/CartContext";

const navLinkBase =
  "text-sm font-medium text-gray-600 transition hover:text-gray-900";

export function Navbar() {
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-0">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-muted">
            <img
              src={Logo}
              alt="VEXA"
              className="h-9 w-9 object-contain"
            />
          </div>
          <span className="text-base font-semibold tracking-tight text-gray-900">
            VEXA
          </span>
        </NavLink>

        <nav className="hidden items-center gap-6 sm:flex">
          <NavLink to="/" className={navLinkBase}>
            Inicio
          </NavLink>
          <NavLink to="/products" className={navLinkBase}>
            Productos
          </NavLink>
          <NavLink to="/contact" className={navLinkBase}>
            Contacto
          </NavLink>
          <NavLink to="/privacy" className={navLinkBase}>
            Privacidad
          </NavLink>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <NavLink
            to="/login"
            className="hidden rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:border-gray-900 hover:text-gray-900 sm:inline-flex"
          >
            Iniciar sesión
          </NavLink>

          <NavLink
            to="/cart"
            className="relative inline-flex items-center justify-center rounded-full border border-gray-200 bg-white p-2 text-gray-800 transition hover:border-gray-900 hover:text-gray-900"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-semibold text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/login"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-800 transition hover:border-gray-900 hover:text-gray-900"
          >
            <User className="h-4 w-4" />
          </NavLink>
        </div>
      </div>
    </header>
  );
}

