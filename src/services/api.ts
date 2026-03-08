import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import type {
  LoginRequestDTO,
  RegisterRequestDTO,
  AuthResponseDTO,
  RegisterResponseDTO,
  ProductResponseDTO,
  CategoriesResponseDTO,
  CartResponseDTO,
  CartAddRequestDTO,
  CartUpdateRequestDTO,
  CartDeleteProductRequestDTO
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
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
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

// Servicios de productos
export const productService = {
  getAll: async (): Promise<ProductResponseDTO[]> => {
    const response = await api.get<ProductResponseDTO[] | ProductResponseDTO>(
      "/api/products"
    );
    const data = response.data;
    return Array.isArray(data) ? data : [data];
  },
};


// Servicios de categorías
export const categoriesService = {
  getAll: async (): Promise<CategoriesResponseDTO[]> => {
    const response = await api.get<CategoriesResponseDTO[]>(
      "/api/categories"
    );
    return response.data;
  },
};

export const cartService = {
  // Obtener carrito del usuario logueado
  getCart: async (): Promise<CartResponseDTO> => {
    const response = await api.get<CartResponseDTO>("/api/cart");
    return response.data;
  },

  // Agregar producto (POST)
  addToCart: async (data: CartAddRequestDTO): Promise<CartResponseDTO> => {
    const response = await api.post<CartResponseDTO>("/api/cart/add", data);
    return response.data;
  },

  // Actualizar cantidad (PUT)
  updateQuantity: async (data: CartUpdateRequestDTO): Promise<CartResponseDTO> => {
    const response = await api.put<CartResponseDTO>("/api/cart/update", data);
    return response.data;
  },

  // Eliminar producto (DELETE con body)
  removeFromCart: async (productId: number): Promise<CartResponseDTO> => {
    const response = await api.delete<CartResponseDTO>("/api/cart/delete", {
      data: { productId } as CartDeleteProductRequestDTO
    });
    return response.data;
  },

  clearCart: async (): Promise<CartResponseDTO> => {
    const { data } = await api.delete<CartResponseDTO>('/api/cart/clear');
    return data;
  },
};
