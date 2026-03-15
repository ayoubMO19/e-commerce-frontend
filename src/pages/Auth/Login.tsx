import { useState, useEffect, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Zap, AlertCircle, Eye, EyeOff, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import type { LoginRequestDTO } from "../../types/api";
import { authService } from "../../services/api";

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState<LoginRequestDTO>({ email: "", password: "" });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

  if (emailSent) {
    return (
      <div className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-md items-center px-4 animate-in fade-in zoom-in duration-500">
        <div className="w-full space-y-8 rounded-[3rem] border border-zinc-100 bg-white p-10 text-center shadow-2xl shadow-black/5">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[2rem] bg-zinc-50 text-vexa">
            <CheckCircle2 className="h-10 w-10 shadow-[0_0_20px_rgba(111,222,138,0.4)]" />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-black uppercase tracking-tighter italic">Bandeja de entrada</h2>
            <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-zinc-500 leading-relaxed">
              Hemos enviado instrucciones a <br />
              <span className="text-black">{formData.email}</span>
            </p>
          </div>
          <button
            onClick={() => { setEmailSent(false); setIsForgotPasswordView(false); }}
            className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 hover:text-vexa transition-colors"
          >
            [ Volver al Acceso ]
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-md items-center px-4 animate-in fade-in duration-700">
      <div className="w-full space-y-10 py-12">
        <header className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-black shadow-[0_20px_40px_rgba(0,0,0,0.2)] transition-transform hover:scale-110 duration-500">
            <Zap className="h-7 w-7 text-vexa fill-vexa" />
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tighter text-black uppercase italic">
              {isForgotPasswordView ? "Recover" : "Vexa Access"}
            </h1>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-vexa opacity-80">
              {isForgotPasswordView ? "Recupera tu acceso" : "Gestiona tu cuenta y pedidos"}
            </p>
          </div>
        </header>

        <form onSubmit={isForgotPasswordView ? handleResetPassword : handleSubmit} className="space-y-6">
          {error && (
            <div className="flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50/50 p-4 text-[10px] text-red-600 animate-in slide-in-from-top-2 font-black uppercase tracking-widest">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="ml-1 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-300 group-focus-within:text-vexa transition-colors" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-zinc-100 py-4 pl-12 pr-4 text-xs font-bold outline-none transition-all focus:border-vexa/50 bg-white focus:ring-4 focus:ring-vexa/5"
                  placeholder="name@domain.com"
                />
              </div>
            </div>

            {!isForgotPasswordView && (
              <div className="space-y-2 animate-in slide-in-from-bottom-2 duration-500">
                <div className="flex items-center justify-between px-1">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">Contraseña</label>
                  <button
                    type="button"
                    onClick={() => { setIsForgotPasswordView(true); setError(""); }}
                    className="text-[9px] font-black uppercase tracking-[0.1em] text-zinc-400 hover:text-black transition-colors"
                  >
                    ¿Olvidaste la clave?
                  </button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-300 group-focus-within:text-vexa transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-zinc-100 py-4 pl-12 pr-12 text-xs font-bold outline-none transition-all focus:border-vexa/50 bg-white focus:ring-4 focus:ring-vexa/5"
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-300 hover:text-black">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4 pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full overflow-hidden rounded-2xl bg-black py-5 text-[10px] font-black uppercase tracking-[0.3em] text-white shadow-2xl transition-all hover:bg-zinc-800 active:scale-[0.98] disabled:opacity-50 border border-transparent hover:border-vexa/30"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-3">
                  <div className="h-3 w-3 animate-spin rounded-full border-2 border-vexa/20 border-t-vexa" />
                  Processing
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  {isForgotPasswordView ? "Reset Password" : "Login"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-vexa" />
                </span>
              )}
            </button>

            {isForgotPasswordView && (
              <button
                type="button"
                onClick={() => setIsForgotPasswordView(false)}
                className="flex w-full items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-black transition-colors"
              >
                <ArrowLeft className="h-3 w-3" />
                Regresar
              </button>
            )}
          </div>
        </form>

        {!isForgotPasswordView && (
          <footer className="text-center pt-4">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">
              ¿Sin credenciales?{" "}
              <Link to="/register" className="text-black hover:text-vexa transition-colors underline underline-offset-8 decoration-vexa/30 decoration-2">
                Crear cuenta
              </Link>
            </p>
          </footer>
        )}
      </div>
    </div>
  );
}