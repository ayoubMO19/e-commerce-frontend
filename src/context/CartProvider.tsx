import { useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { CartContext } from "./CartContext";
import { cartService } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { notify } from "../utils/notifications";
import type { ProductResponseDTO, CartItem, CartResponseDTO } from "../types/api";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const updateLocalStateWithBackend = useCallback((remoteCart: CartResponseDTO) => {
    setCartItems(remoteCart.items.map(item => ({
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      urlImage: item.urlImage, 
      stock: item.stock 
    })));
  }, []);

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
      setCartItems([]);
    }
  }, [isAuthenticated, updateLocalStateWithBackend]);

  const addToCart = async (product: ProductResponseDTO) => {
    if (!isAuthenticated) return;
    try {
      const response = await cartService.addToCart({ 
        productId: product.productId, 
        quantity: 1 
      });
      updateLocalStateWithBackend(response);
      notify.success("Producto añadido");
    } catch {
      notify.error("Error al añadir producto");
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      const response = await cartService.removeFromCart(productId);
      updateLocalStateWithBackend(response);
    } catch {
      notify.error("Error al eliminar");
    }
  };

  const updateQuantity = async (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) return removeFromCart(productId);
    try {
      const response = await cartService.updateQuantity({ productId, quantity: newQuantity });
      updateLocalStateWithBackend(response);
    } catch {
      notify.error("Error al actualizar");
    }
  };

  const clearCart = async () => {
    try {
      setIsLoading(true);
      const response = await cartService.clearCart();
      updateLocalStateWithBackend(response);
      notify.success("Carrito vaciado");
    } catch {
      notify.error("Error al vaciar");
    } finally {
      setIsLoading(false);
    }
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