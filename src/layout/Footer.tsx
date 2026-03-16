import { NavLink } from "react-router-dom";

// Footer component
export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-0">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} VEXA. Todos los derechos reservados.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <NavLink to="/privacy" className="hover:text-gray-700">
            Política de privacidad
          </NavLink>
          <NavLink to="/contact" className="hover:text-gray-700">
            Contacto
          </NavLink>
        </div>
      </div>
    </footer>
  );
}

