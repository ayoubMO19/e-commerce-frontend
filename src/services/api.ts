import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import type {
  LoginRequestDTO,
  RegisterRequestDTO,
  AuthResponseDTO,
  RegisterResponseDTO,
} from "../types/api";

const API_BASE_URL = "https://e-commerce-backend-lny2.onrender.com";

// Crear instancia de axios
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para añadir token a todas las peticiones
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("auth_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Token expirado o inválido
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      // Redirigir al login si no estamos ya ahí
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Servicios de autenticación
export const authService = {
  login: async (credentials: LoginRequestDTO): Promise<AuthResponseDTO> => {
    const response = await api.post<AuthResponseDTO>(
      "/api/auth/login",
      credentials
    );
    return response.data;
  },

  register: async (
    userData: RegisterRequestDTO
  ): Promise<RegisterResponseDTO> => {
    const response = await api.post<RegisterResponseDTO>(
      "/api/auth/register",
      userData
    );
    return response.data;
  },
};
