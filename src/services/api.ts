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
  CartDeleteProductRequestDTO,
  CartSyncRequestDTO,
  UpdateUserRequestDTO,
  UserResponseDTO,
  OrdersRequestDTO,
  OrdersResponseDTO,
  PaymentIntentRequestDTO,
} from "../types/api";

// Base URL from environment variables
const API_BASE_URL = import.meta.env.API_BASE_URL;

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("auth_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
    }
    return Promise.reject(error);
  },
);

// Auth service
export const authService = {
  login: async (credentials: LoginRequestDTO): Promise<AuthResponseDTO> => {
    const response = await api.post<AuthResponseDTO>(
      "/api/auth/login",
      credentials,
    );
    return response.data;
  },
  register: async (
    userData: RegisterRequestDTO,
  ): Promise<RegisterResponseDTO> => {
    const response = await api.post<RegisterResponseDTO>(
      "/api/auth/register",
      userData,
    );
    return response.data;
  },
  forgotPassword: async (email: string): Promise<void> => {
    await api.post("/api/auth/forgot-password", { email });
  },
};

// Product service
export const productService = {
  getAll: async (): Promise<ProductResponseDTO[]> => {
    const response = await api.get<ProductResponseDTO[] | ProductResponseDTO>(
      "/api/products",
    );
    const data = response.data;
    return Array.isArray(data) ? data : [data];
  },
  getById: async (id: string | number): Promise<ProductResponseDTO> => {
    const response = await api.get<ProductResponseDTO>(`/api/products/${id}`);
    return response.data;
  },
};

// Categories service
export const categoriesService = {
  getAll: async (): Promise<CategoriesResponseDTO[]> => {
    const response = await api.get<CategoriesResponseDTO[]>("/api/categories");
    return response.data;
  },
};

// Cart service
export const cartService = {
  getCart: async (): Promise<CartResponseDTO> => {
    const response = await api.get<CartResponseDTO>("/api/cart");
    return response.data;
  },
  addToCart: async (data: CartAddRequestDTO): Promise<CartResponseDTO> => {
    const response = await api.post<CartResponseDTO>("/api/cart/add", data);
    return response.data;
  },
  updateQuantity: async (
    data: CartUpdateRequestDTO,
  ): Promise<CartResponseDTO> => {
    const response = await api.put<CartResponseDTO>("/api/cart/update", data);
    return response.data;
  },
  removeFromCart: async (productId: number): Promise<CartResponseDTO> => {
    const response = await api.delete<CartResponseDTO>("/api/cart/delete", {
      data: { productId } as CartDeleteProductRequestDTO,
    });
    return response.data;
  },
  clearCart: async (): Promise<CartResponseDTO> => {
    const { data } = await api.delete<CartResponseDTO>("/api/cart/clear");
    return data;
  },
  syncCart: async (data: CartSyncRequestDTO): Promise<CartResponseDTO> => {
    const response = await api.post<CartResponseDTO>("/api/cart/sync", data);
    return response.data;
  },
};

// User service
export const userService = {
  update: async (userData: UpdateUserRequestDTO): Promise<UserResponseDTO> => {
    const response = await api.patch<UserResponseDTO>(
      "/api/users/me",
      userData,
    );
    return response.data;
  },
};

// Order service
export const orderService = {
  createOrder: async (data: OrdersRequestDTO): Promise<OrdersResponseDTO> => {
    const response = await api.post<OrdersResponseDTO>("/api/orders", data);
    return response.data;
  },
  getMyOrders: async (): Promise<OrdersResponseDTO[]> => {
    const response = await api.get<OrdersResponseDTO[]>("/api/orders");
    return response.data;
  },
  cancelOrder: async (orderId: number): Promise<OrdersResponseDTO> => {
    const response = await api.patch<OrdersResponseDTO>(`/api/orders/${orderId}`, {
      status: 'CANCELLED'
    });
    return response.data;
  }
};

// Payment service
export const paymentService = {
  createIntent: async (orderId: number): Promise<string> => {
    const response = await api.post<string>(
      "/api/payments/create-intent",
      { orderId } as PaymentIntentRequestDTO,
      { responseType: 'text' }
    );
    return response.data;
  }
};