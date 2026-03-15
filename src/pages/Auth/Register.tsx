import { useState, useEffect, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, UserCircle, AlertCircle, Zap, Eye, EyeOff, CheckCircle2, ArrowRight } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import type { RegisterRequestDTO } from "../../types/api";

export default function Register() {
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState<RegisterRequestDTO>({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (formData.name.length < 2) return setError("El nombre es demasiado corto");
    if (formData.password.length < 6) return setError("La contraseña debe tener al menos 6 caracteres");

    setIsLoading(true);
    try {
      await register(formData);
      setIsSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al crear la cuenta");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  if (isAuthenticated) return null;

  // VISTA DE ÉXITO (VERIFICACIÓN)
  if (isSuccess) {
    return (
      <div className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-2xl items-center px-4 animate-in fade-in zoom-in duration-500">
        <div className="w-full space-y-10 rounded-[3rem] border border-zinc-100 bg-white p-12 md:p-20 text-center shadow-2xl shadow-black/5">
          <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
            <div className="absolute inset-0 animate-ping rounded-full bg-vexa opacity-10" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-[2rem] bg-zinc-50 text-vexa">
              <CheckCircle2 className="h-10 w-10 shadow-[0_0_20px_rgba(111,222,138,0.4)]" />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl font-black uppercase tracking-tighter italic">Verifica tu email</h2>
            <p className="mx-auto max-w-sm text-[10px] font-bold uppercase tracking-widest text-zinc-500 leading-relaxed">
              Hemos enviado un enlace de activación a <br />
              <span className="text-black underline decoration-vexa decoration-2 underline-offset-4">
                {formData.email}
              </span>
            </p>
          </div>

          <div className="mx-auto max-w-md space-y-4 rounded-3xl bg-zinc-50/50 p-6 border border-zinc-100">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400">¿No has recibido nada?</p>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-tight">
              Revisa <b>spam</b> o espera unos minutos.
            </p>
          </div>

          <div className="pt-6">
            <Link
              to="/login"
              className="group inline-flex items-center gap-3 rounded-full bg-black px-10 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all hover:scale-105 active:scale-95 border border-transparent hover:border-vexa/30"
            >
              Ir al inicio de sesión
              <ArrowRight className="h-4 w-4 text-vexa transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-md items-center px-4 animate-in fade-in duration-700">
      <div className="w-full space-y-10 py-10">
        <header className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-black shadow-xl transition-transform hover:scale-110 duration-500">
            <Zap className="h-7 w-7 text-vexa fill-vexa" />
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tighter text-black uppercase italic">Vexa Join</h1>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-vexa opacity-80">Crea tu cuenta de cliente</p>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50/50 p-4 text-[10px] text-red-600 animate-in slide-in-from-top-2 font-black uppercase tracking-widest">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="ml-1 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">Nombre</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-300 group-focus-within:text-vexa transition-colors" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-zinc-100 bg-white py-4 pl-12 pr-4 text-xs font-bold outline-none transition-all focus:border-vexa/50 focus:ring-4 focus:ring-vexa/5"
                    placeholder="First Name"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="ml-1 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">Apellido</label>
                <div className="relative group">
                  <UserCircle className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-300 group-focus-within:text-vexa transition-colors" />
                  <input
                    type="text"
                    name="surname"
                    required
                    value={formData.surname}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-zinc-100 bg-white py-4 pl-12 pr-4 text-xs font-bold outline-none transition-all focus:border-vexa/50 focus:ring-4 focus:ring-vexa/5"
                    placeholder="Last Name"
                  />
                </div>
              </div>
            </div>

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
                  className="w-full rounded-2xl border border-zinc-100 bg-white py-4 pl-12 pr-4 text-xs font-bold outline-none transition-all focus:border-vexa/50 focus:ring-4 focus:ring-vexa/5"
                  placeholder="name@domain.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="ml-1 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">Contraseña Segura</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-300 group-focus-within:text-vexa transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-zinc-100 bg-white py-4 pl-12 pr-12 text-xs font-bold outline-none transition-all focus:border-vexa/50 focus:ring-4 focus:ring-vexa/5"
                  placeholder="Mín. 6 caracteres"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-300 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full overflow-hidden rounded-2xl bg-black py-5 text-[10px] font-black uppercase tracking-[0.3em] text-white shadow-2xl transition-all hover:bg-zinc-800 active:scale-[0.98] disabled:opacity-50 border border-transparent hover:border-vexa/30"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-3">
                <div className="h-3 w-3 animate-spin rounded-full border-2 border-vexa/20 border-t-vexa" />
                Validating
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Unirse a VEXA
                <ArrowRight className="h-4 w-4 text-vexa transition-transform group-hover:translate-x-1" />
              </span>
            )}
          </button>
        </form>

        <footer className="text-center pt-4">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-black hover:text-vexa transition-colors underline underline-offset-8 decoration-vexa/30 decoration-2">
              Acceder ahora
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}