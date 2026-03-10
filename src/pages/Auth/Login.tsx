import { useState, useEffect, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, AlertCircle, Eye, EyeOff, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import type { LoginRequestDTO } from "../../types/api";
import { authService } from "../../services/api";

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  // Estados de Formulario
  const [formData, setFormData] = useState<LoginRequestDTO>({ email: "", password: "" });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Estados de Recuperación
  const [isForgotPasswordView, setIsForgotPasswordView] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true });
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await login(formData);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.email) return setError("Introduce tu email");

    setIsLoading(true);
    try {
      await authService.forgotPassword(formData.email);
      setEmailSent(true);
    } catch {
      setError("Error al procesar la solicitud");
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) return null;

  // VISTA 1: ÉXITO ENVÍO EMAIL
  if (emailSent) {
    return (
      <div className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-md items-center px-4 animate-in fade-in zoom-in duration-500">
        <div className="w-full space-y-8 rounded-[2.5rem] border border-gray-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-500">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black uppercase tracking-tighter">Revisa tu bandeja</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Si existe una cuenta asociada a <span className="font-bold text-black">{formData.email}</span>,
              recibirás un enlace para restablecer tu contraseña en unos minutos.
            </p>
          </div>
          <button
            onClick={() => { setEmailSent(false); setIsForgotPasswordView(false); }}
            className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors"
          >
            Volver al inicio de sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-md items-center px-4 animate-in fade-in duration-700">
      <div className="w-full space-y-8 py-12">
        <header className="space-y-3 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-black text-white shadow-xl">
            <LogIn className="h-6 w-6" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-gray-900 uppercase">
            {isForgotPasswordView ? "Recuperar" : "Vexa Access"}
          </h1>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
            {isForgotPasswordView ? "Te enviaremos un acceso seguro" : "Gestiona tu cuenta y pedidos"}
          </p>
        </header>

        <form onSubmit={isForgotPasswordView ? handleResetPassword : handleSubmit} className="space-y-6">
          {error && (
            <div className="flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-600 animate-in slide-in-from-top-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="font-medium">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-gray-400">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 group-focus-within:text-black" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-200 py-4 pl-12 pr-4 text-sm font-bold outline-none transition-all focus:border-black bg-white focus:ring-4 focus:ring-black/5"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            {!isForgotPasswordView && (
              <div className="space-y-2 animate-in slide-in-from-bottom-2">
                <div className="flex items-center justify-between px-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Contraseña</label>
                  <button
                    type="button"
                    onClick={() => { setIsForgotPasswordView(true); setError(""); }}
                    className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
                  >
                    ¿Olvidaste tu clave?
                  </button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 group-focus-within:text-black" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 py-4 pl-12 pr-12 text-sm font-bold outline-none transition-all focus:border-black bg-white focus:ring-4 focus:ring-black/5"
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black">
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full overflow-hidden rounded-2xl bg-black py-5 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-xl transition-all hover:bg-gray-800 active:scale-[0.98] disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                  Procesando
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  {isForgotPasswordView ? "Enviar enlace" : "Iniciar Sesión"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              )}
            </button>

            {isForgotPasswordView && (
              <button
                type="button"
                onClick={() => setIsForgotPasswordView(false)}
                className="flex w-full items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
              >
                <ArrowLeft className="h-3 w-3" />
                Volver atrás
              </button>
            )}
          </div>
        </form>

        {!isForgotPasswordView && (
          <footer className="text-center pt-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              ¿Nuevo en Vexa?{" "}
              <Link to="/register" className="text-black hover:underline underline-offset-4 decoration-2">
                Crea una cuenta ahora
              </Link>
            </p>
          </footer>
        )}
      </div>
    </div>
  );
}