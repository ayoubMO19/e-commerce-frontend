import { useState, useEffect, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, UserCircle, AlertCircle, UserPlus, Eye, EyeOff, CheckCircle2, ArrowRight } from "lucide-react";
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
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error al crear la cuenta");
      }
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
        <div className="w-full space-y-10 rounded-[3rem] border border-gray-100 bg-white p-12 md:p-20 text-center shadow-sm">
          {/* Icono más grande y con efecto de halo */}
          <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
            <div className="absolute inset-0 animate-ping rounded-full bg-green-100 opacity-20" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-green-50 text-green-500 shadow-inner">
              <CheckCircle2 className="h-10 w-10" />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-gray-900 md:text-5xl">
              Verifica tu correo
            </h2>
            <p className="mx-auto max-w-sm text-base leading-relaxed text-gray-500">
              Hemos enviado un enlace de activación a <br />
              <span className="font-bold text-black underline decoration-gray-200 underline-offset-4">
                {formData.email}
              </span>
            </p>
          </div>

          {/* Caja de instrucciones más ancha y estética */}
          <div className="mx-auto max-w-md space-y-4 rounded-3xl bg-gray-50/50 p-6">
            <p className="text-[11px] font-black uppercase tracking-widest text-gray-400">
              ¿No recibiste nada?
            </p>
            <p className="text-xs text-gray-500">
              Revisa la carpeta de <b>correo no deseado</b> o espera un par de minutos. Si el problema persiste, contacta con nuestro soporte.
            </p>
          </div>

          <div className="pt-6">
            <Link
              to="/login"
              className="group inline-flex items-center gap-3 rounded-full bg-black px-8 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-xl transition-all hover:bg-gray-800 active:scale-95"
            >
              Ir al inicio de sesión
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // VISTA DE FORMULARIO ORIGINAL
  return (
    <div className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-md items-center px-4 animate-in fade-in duration-700">
      <div className="w-full space-y-8 py-10">
        <header className="space-y-3 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-black text-white shadow-xl rotate-3">
            <UserPlus className="h-6 w-6" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-gray-900 uppercase">
            Vexa Join
          </h1>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Crea tu cuenta de cliente
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-600 animate-in slide-in-from-top-2">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="font-medium">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-gray-400">Nombre</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm font-bold outline-none transition-all focus:border-black focus:ring-4 focus:ring-black/5"
                    placeholder="Tu nombre"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-gray-400">Apellido</label>
                <div className="relative group">
                  <UserCircle className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" />
                  <input
                    type="text"
                    name="surname"
                    required
                    value={formData.surname}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm font-bold outline-none transition-all focus:border-black focus:ring-4 focus:ring-black/5"
                    placeholder="Apellido"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-gray-400">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm font-bold outline-none transition-all focus:border-black focus:ring-4 focus:ring-black/5"
                  placeholder="ejemplo@correo.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-gray-400">Contraseña</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-200 bg-white py-3.5 pl-11 pr-12 text-sm font-bold outline-none transition-all focus:border-black focus:ring-4 focus:ring-black/5"
                  placeholder="Mín. 6 caracteres"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full overflow-hidden rounded-2xl bg-black py-5 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-xl transition-all hover:bg-gray-800 active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                Creando cuenta
              </span>
            ) : (
              "Unirse a VEXA"
            )}
          </button>
        </form>

        <footer className="text-center pt-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            ¿Ya eres cliente?{" "}
            <Link to="/login" className="text-black hover:underline underline-offset-4 decoration-2">
              Acceder ahora
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}