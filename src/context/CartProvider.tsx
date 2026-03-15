import { useState, useEffect, useCallback, useRef } from "react";
import type { ReactNode } from "react";
import { CartContext } from "./CartContext";
import { cartService } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { notify } from "../utils/notifications";
import type { ProductResponseDTO, CartItem, CartResponseDTO, CartSyncRequestDTO } from "../types/api";

const CART_STORAGE_KEY = "vexa_cart_local";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const isSyncing = useRef(false);

  const updateLocalStateWithBackend = useCallback((remoteCart: CartResponseDTO) => {
    setCartItems(remoteCart.items.map(item => ({
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      urlImage: item.urlImage,
      stock: item.stock
    })));
    localStorage.removeItem(CART_STORAGE_KEY);
  }, []);

  // Función para fusionar el carrito local con el backend
  const mergeLocalCartWithBackend = useCallback(async () => {
    const localData = localStorage.getItem(CART_STORAGE_KEY);
    if (!localData) return;

    try {
      const localItems: CartItem[] = JSON.parse(localData);
      if (localItems.length === 0) return;

      const syncData: CartSyncRequestDTO = {
        items: localItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        }))
      };

      // Enviamos el batch al backend
      const updatedCart = await cartService.syncCart(syncData);

      // Actualizamos el estado global con la respuesta directa
      updateLocalStateWithBackend(updatedCart);

      notify.success("Carrito sincronizado con tu cuenta");
    } catch (error) {
      console.error("Error fusionando carrito:", error);
    } finally {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, [updateLocalStateWithBackend]);

  // Carga y Sincronización
  useEffect(() => {
    const handleAuthChange = async () => {
      if (isAuthenticated) {
        if (isSyncing.current) return;
        isSyncing.current = true;
        setIsLoading(true);

        try {
          const localData = localStorage.getItem(CART_STORAGE_KEY);

          if (localData && JSON.parse(localData).length > 0) {
            // Hay productos como invitado -> Sincronizamos (esto ya actualiza el estado)
            await mergeLocalCartWithBackend();
          } else {
            // No hay nada local -> Solo pedimos el carrito del usuario
            const data = await cartService.getCart();
            updateLocalStateWithBackend(data);
          }
        } catch (error) {
          console.error("Error al sincronizar carrito:", error);
        } finally {
          setIsLoading(false);
          isSyncing.current = false;
        }
      } else {
        // No autenticado: cargar de LocalStorage
        const localCart = localStorage.getItem(CART_STORAGE_KEY);
        setCartItems(localCart ? JSON.parse(localCart) : []);
      }
    };

    handleAuthChange();
  }, [isAuthenticated, updateLocalStateWithBackend, mergeLocalCartWithBackend]);

  // EFECTO: Guardar en local solo si es invitado
  useEffect(() => {
    if (!isAuthenticated && cartItems.length >= 0) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }
  }, [cartItems, isAuthenticated]);

  const addToCart = async (product: ProductResponseDTO) => {
    if (isAuthenticated) {
      try {
        const response = await cartService.addToCart({
          productId: product.productId,
          quantity: 1
        });
        updateLocalStateWithBackend(response);
        notify.success("Añadido a tu cuenta");
      } catch {
        notify.error("Error al sincronizar");
      }
    } else {
      setCartItems(prev => {
        const existing = prev.find(item => item.productId === product.productId);
        if (existing) {
          return prev.map(item =>
            item.productId === product.productId ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [...prev, { ...product, quantity: 1 }];
      });
      notify.success("Añadido al carrito");
    }
  };

  const removeFromCart = async (productId: number) => {
    if (isAuthenticated) {
      try {
        const response = await cartService.removeFromCart(productId);
        updateLocalStateWithBackend(response);
      } catch {
        notify.error("Error al eliminar");
      }
    } else {
      setCartItems(prev => prev.filter(item => item.productId !== productId));
    }
  };

  const updateQuantity = async (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) return removeFromCart(productId);

    if (isAuthenticated) {
      try {
        const response = await cartService.updateQuantity({ productId, quantity: newQuantity });
        updateLocalStateWithBackend(response);
      } catch {
        notify.error("Error al actualizar");
      }
    } else {
      setCartItems(prev => prev.map(item =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const clearCart = async () => {
    if (isAuthenticated) {
      try {
        setIsLoading(true);
        const response = await cartService.clearCart();
        updateLocalStateWithBackend(response);
      } catch {
        notify.error("Error al vaciar");
      } finally {
        setIsLoading(false);
      }
    } else {
      setCartItems([]);
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