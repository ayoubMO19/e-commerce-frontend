import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import type { ProductResponseDTO, CartItem, CartResponseDTO } from "../types/api";
import { cartService } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { notify } from "../utils/notifications";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: ProductResponseDTO) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  updateQuantity: (productId: number, newQuantity: number) => Promise<void>;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  // Mapeo estricto desde el DTO del Swagger
  const updateLocalStateWithBackend = useCallback((remoteCart: CartResponseDTO) => {
    console.log(`productos de cart items: ${JSON.stringify(remoteCart)}`);
    setCartItems(remoteCart.items.map(item => ({
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      // Como el CartItemDTO no trae imagen ni stock, usamos valores por defecto
      // o podrías ampliar tu DTO en Java para incluirlos.
      urlImage: "", 
      stock: 999 
    })));
  }, []);

  // Cargar carrito solo cuando el usuario está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      const fetchCart = async () => {
        try {
          setIsLoading(true);
          const data = await cartService.getCart();
          updateLocalStateWithBackend(data);
        } catch (error) {
          console.error("Error fetching cart:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchCart();
    } else {
      // Si se desloguea, limpiamos el estado inmediatamente
      setCartItems([]);
    }
  }, [isAuthenticated, updateLocalStateWithBackend]);

  const addToCart = async (product: ProductResponseDTO) => {
    // Ya no comprobamos isAuthenticated aquí porque el botón ya está bloqueado,
    // pero lo dejamos como "safety check"
    if (!isAuthenticated) return;

    try {
      const response = await cartService.addToCart({ 
        productId: product.productId, 
        quantity: 1 
      });
      updateLocalStateWithBackend(response);
      notify.success("Producto añadido al carrito");
    } catch {
      notify.error("No se pudo añadir el producto");
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      const response = await cartService.removeFromCart(productId);
      updateLocalStateWithBackend(response);
    } catch {
      notify.error("Error al eliminar producto");
    }
  };

  const updateQuantity = async (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) return removeFromCart(productId);

    try {
      const response = await cartService.updateQuantity({ productId, quantity: newQuantity });
      updateLocalStateWithBackend(response);
    } catch {
      notify.error("Error al actualizar cantidad");
    }
  };

  const clearCart = () => {
    setCartItems([]);
    // Nota: El Swagger no tiene un endpoint DELETE /api/cart/clear, 
    // así que solo limpiamos el estado local.
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, addToCart, removeFromCart, updateQuantity, 
      clearCart, cartTotal, cartCount, isLoading 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};