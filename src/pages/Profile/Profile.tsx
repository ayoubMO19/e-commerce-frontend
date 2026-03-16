import { useState, useEffect } from "react";
import {
    User,
    Mail,
    ShieldCheck,
    LogOut,
    Loader2,
    Save,
    KeyRound,
    BadgeCheck,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { userService, authService } from "../../services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Profile page component
export default function Profile() {
    const { user, logout } = useAuth();
    const queryClient = useQueryClient();
    const [isSendingReset, setIsSendingReset] = useState(false);

    // Form data state
    const [formData, setFormData] = useState({
        name: user?.name || "",
        surname: user?.surname || "",
    });

    // Set form data when user loads
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                surname: user.surname || "",
            });
        }
    }, [user]);

    // Update user mutation
    const updateMutation = useMutation({
        mutationFn: (data: { name: string; surname: string }) =>
            userService.update(data),
        onSuccess: (updatedUser) => {
            // Update React Query cache
            queryClient.setQueryData(["user"], updatedUser);
            queryClient.invalidateQueries({ queryKey: ["user"] });

            // Update localStorage
            const currentUser = JSON.parse(localStorage.getItem("auth_user") || "{}");
            const newUser = { ...currentUser, ...updatedUser };
            localStorage.setItem("auth_user", JSON.stringify(newUser));

            toast.success("Perfil actualizado con éxito");
        },
        onError: (error: unknown) => {
            toast.error("Error al actualizar el perfil");
            console.error(error);
        },
    });

    // Handle profile update
    const handleUpdateProfile = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name.trim()) return toast.error("El nombre es obligatorio");
        updateMutation.mutate(formData);
    };

    // Handle forgot password
    const handleForgotPassword = async () => {
        setIsSendingReset(true);
        try {
            await authService.forgotPassword(user?.email || "");
            toast.success("Correo de recuperación enviado");
        } catch {
            toast.error("No se pudo enviar el correo");
        } finally {
            setIsSendingReset(false);
        }
    };

    // If user is logged out while on this page, return null
    if (!user) return null;

    // Render profile page
    return (
        <div className="min-h-[calc(100vh-80px)] bg-[#fafafa]">
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12 animate-in fade-in duration-500">
                <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black uppercase tracking-tighter text-gray-900">
                            Mi Perfil
                        </h1>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                            Configuración de cuenta y seguridad
                        </p>
                    </div>
                    <button
                        onClick={() => logout()}
                        className="flex items-center gap-2 self-start rounded-xl border border-red-100 bg-white px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-red-500 transition-all hover:bg-red-50 active:scale-95 sm:self-auto"
                    >
                        <LogOut className="h-3.5 w-3.5" />
                        Cerrar Sesión
                    </button>
                </header>
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    <aside className="lg:col-span-4">
                        <div className="rounded-[2.5rem] border border-gray-100 bg-white p-10 shadow-sm transition-all hover:shadow-md">
                            <div className="relative mx-auto mb-6 h-32 w-32">
                                <div className="flex h-full w-full items-center justify-center rounded-full bg-black text-white shadow-2xl transition-transform hover:scale-105 duration-500">
                                    <User className="h-12 w-12" />
                                </div>
                                <div className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-black text-white">
                                    <BadgeCheck className="h-4 w-4" />
                                </div>
                            </div>
                            <div className="text-center space-y-1">
                                <h2 className="text-2xl font-black text-gray-900 leading-tight">
                                    {user.name} {user.surname}
                                </h2>
                                <p className="text-sm font-medium text-gray-400">
                                    {user.email}
                                </p>
                            </div>
                            <div className="mt-8 border-t border-gray-50 pt-8">
                                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                                    <span>Estado de cuenta</span>
                                    <span className="text-green-500 font-bold">Verificada</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                    <main className="space-y-8 lg:col-span-8">
                        <section className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm sm:p-12">
                            <div className="mb-10 flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gray-50">
                                    <User className="h-5 w-5 text-gray-900" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-widest text-gray-900">
                                        Información Personal
                                    </h3>
                                    <p className="text-xs text-gray-400">
                                        Actualiza tu identidad pública en la plataforma.
                                    </p>
                                </div>
                            </div>
                            <form onSubmit={handleUpdateProfile} className="space-y-8">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                            Nombre
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({ ...formData, name: e.target.value })
                                            }
                                            className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 px-6 py-4 text-sm font-bold outline-none transition-all focus:border-black focus:bg-white focus:ring-4 focus:ring-black/5"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                            Apellidos
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.surname}
                                            onChange={(e) =>
                                                setFormData({ ...formData, surname: e.target.value })
                                            }
                                            className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 px-6 py-4 text-sm font-bold outline-none transition-all focus:border-black focus:bg-white focus:ring-4 focus:ring-black/5"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                        Correo Electrónico
                                    </label>
                                    <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-100/30 px-6 py-4 text-sm font-medium text-gray-400">
                                        <Mail className="h-4 w-4" />
                                        {user.email}
                                    </div>
                                </div>
                                <div className="flex justify-end pt-4">
                                    <button
                                        type="submit"
                                        disabled={updateMutation.isPending}
                                        className="group flex h-14 min-w-[200px] items-center justify-center gap-3 rounded-2xl bg-black px-8 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-xl transition-all hover:bg-gray-800 active:scale-95 disabled:opacity-50"
                                    >
                                        {updateMutation.isPending ? (
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                        ) : (
                                            <Save className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
                                        )}
                                        {updateMutation.isPending
                                            ? "Guardando..."
                                            : "Guardar Cambios"}
                                    </button>
                                </div>
                            </form>
                        </section>
                        <section className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-sm sm:p-12">
                            <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gray-50">
                                        <ShieldCheck className="h-5 w-5 text-gray-900" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-black uppercase tracking-widest text-gray-900">
                                            Seguridad
                                        </h3>
                                        <p className="text-xs text-gray-400">
                                            Recibirás un enlace seguro para cambiar la clave.
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleForgotPassword}
                                    disabled={isSendingReset}
                                    className="flex h-12 items-center gap-2 rounded-xl border border-gray-100 bg-white px-6 text-[10px] font-black uppercase tracking-widest text-gray-900 transition-all hover:bg-gray-50 active:scale-95 shadow-sm"
                                >
                                    {isSendingReset ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <KeyRound className="h-4 w-4" />
                                    )}
                                    Restablecer Contraseña
                                </button>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </div>
    );
}
