import { useState, useEffect, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import type { LoginRequestDTO } from "../../types/api";

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState<LoginRequestDTO>({
    email: "",
    password: "",
  });
  
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Redirección controlada si ya está logueado
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(formData);
    } catch (err: unknown) {
      // Verificamos que sea un objeto Error para acceder a .message
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error al iniciar sesión");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (error) setError("");
  };

  if (isAuthenticated) return null;

  return (
    <div className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-md items-center px-4">
      <div className="w-full space-y-8 py-12">
        <header className="space-y-3 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white shadow-lg">
            <LogIn className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Acceso a Clientes
          </h1>
          <p className="text-sm text-gray-500">
            Identifícate para gestionar tu carrito y tus pedidos
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-600 animate-in fade-in slide-in-from-top-1">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="font-medium">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-gray-700 ml-1">
                Correo electrónico
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-black" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-200 bg-white py-3.5 pl-12 pr-4 text-sm outline-none transition-all focus:border-black focus:ring-4 focus:ring-black/5"
                  placeholder="ejemplo@correo.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-semibold text-gray-700 ml-1">
                Contraseña
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-black" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-200 bg-white py-3.5 pl-12 pr-12 text-sm outline-none transition-all focus:border-black focus:ring-4 focus:ring-black/5"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full overflow-hidden rounded-2xl bg-black py-4 text-sm font-bold text-white transition-all hover:bg-gray-900 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Validando...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Entrar ahora
                <LogIn className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            )}
          </button>
        </form>

        <footer className="text-center">
          <p className="text-sm text-gray-500">
            ¿Aún no tienes cuenta?{" "}
            <Link to="/register" className="font-bold text-black hover:underline underline-offset-4">
              Crea una gratis
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}