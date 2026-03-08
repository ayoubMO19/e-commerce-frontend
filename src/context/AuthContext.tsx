import {
    createContext,
    useState,
    type ReactNode,
  } from "react";
import type { UserResponseDTO, LoginRequestDTO, RegisterRequestDTO } from "../types/api";
import { authService } from "../services/api";
import { handleAuthError } from "../utils/authErrorHandler";

interface AuthContextType {
user: UserResponseDTO | null;
token: string | null;
isLoading: boolean;
isAuthenticated: boolean;
login: (credentials: LoginRequestDTO) => Promise<void>;
register: (userData: RegisterRequestDTO) => Promise<void>;
logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_TOKEN_KEY = "auth_token";
const AUTH_USER_KEY = "auth_user";

export function AuthProvider({ children }: { children: ReactNode }) {
// Inicialización perezosa (Lazy Initializer)
// Esto evita el useEffect y el error de cascading renders
const [token, setToken] = useState<string | null>(() => localStorage.getItem(AUTH_TOKEN_KEY));
const [user, setUser] = useState<UserResponseDTO | null>(() => {
    const storedUser = localStorage.getItem(AUTH_USER_KEY);
    if (storedUser) {
    try {
        return JSON.parse(storedUser);
    } catch {
        return null;
    }
    }
    return null;
});

const [isLoading, setIsLoading] = useState(false);

// Función para iniciar sesión
const login = async (credentials: LoginRequestDTO) => {
  setIsLoading(true);
  try {
    const response = await authService.login(credentials);
    
    localStorage.setItem(AUTH_TOKEN_KEY, response.token);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(response.user));
    
    setToken(response.token);
    setUser(response.user);
  } catch (error: unknown) {
    handleAuthError(error, "No se pudo iniciar sesión.");
  } finally {
    setIsLoading(false);
  }
};

// Función para registrar un nuevo usuario
const register = async (userData: RegisterRequestDTO) => {
  setIsLoading(true);
  try {
    // Registro en el backend
    await authService.register(userData);
    
    // Login automático tras registro exitoso
    await login({ email: userData.email, password: userData.password });
  } catch (error: unknown) {
    handleAuthError(error, "Error al crear la cuenta.");
  } finally {
    setIsLoading(false);
  }
};

// Función para cerrar sesión
const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    setToken(null);
    setUser(null);
    window.location.href = "/login";
};

return (
    <AuthContext.Provider
    value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!token && !!user,
        login,
        register,
        logout,
    }}
    >
    {children}
    </AuthContext.Provider>
);}

export { AuthContext };