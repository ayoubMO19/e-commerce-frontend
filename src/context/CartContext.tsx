import { createContext } from "react";
import type { ProductResponseDTO, CartItem } from "../types/api";

// Definimos la interfaz aquí para que sea accesible por los otros archivos
export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: ProductResponseDTO) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  updateQuantity: (productId: number, newQuantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  cartTotal: number;
  cartCount: number;
  isLoading: boolean;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);