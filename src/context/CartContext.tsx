import { createContext } from "react";
import type { ProductResponseDTO, CartItem } from "../types/api";

// CartContext props interface
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

// CartContext interface
export const CartContext = createContext<CartContextType | undefined>(undefined);