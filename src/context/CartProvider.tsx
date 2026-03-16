import { useState, useEffect, useCallback, useRef } from "react";
import type { ReactNode } from "react";
import { CartContext } from "./CartContext";
import { cartService } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { notify } from "../utils/notifications";
import type { ProductResponseDTO, CartItem, CartResponseDTO, CartSyncRequestDTO } from "../types/api";

const CART_STORAGE_KEY = "vexa_cart_local";

// CartProvider component
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const isSyncing = useRef(false);

  // Update local state with backend data
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

  // Merge local cart with backend
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

      // Send batch to backend
      const updatedCart = await cartService.syncCart(syncData);

      // Update global state with direct response
      updateLocalStateWithBackend(updatedCart);

      notify.success("Carrito sincronizado con tu cuenta");
    } catch (error) {
      console.error("Error fusionando carrito:", error);
    } finally {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, [updateLocalStateWithBackend]);

  // Load and Sync
  useEffect(() => {
    const handleAuthChange = async () => {
      if (isAuthenticated) {
        if (isSyncing.current) return;
        isSyncing.current = true;
        setIsLoading(true);

        try {
          const localData = localStorage.getItem(CART_STORAGE_KEY);

          if (localData && JSON.parse(localData).length > 0) {
            // Has products as guest -> Sync (this already updates the state)
            await mergeLocalCartWithBackend();
          } else {
            // No products locally -> Get user cart
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

  // Effect: Save to local only if guest
  useEffect(() => {
    if (!isAuthenticated && cartItems.length >= 0) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }
  }, [cartItems, isAuthenticated]);

  // Add to cart
  const addToCart = async (product: ProductResponseDTO) => {
    if (isAuthenticated) {
      try {
        const response = await cartService.addToCart({
          productId: product.productId,
          quantity: 1
        });
        // Update local state with backend response
        updateLocalStateWithBackend(response);
        notify.success("Añadido a tu cuenta");
      } catch {
        notify.error("Error al sincronizar");
      }
    } else {
      // Guest: update local state
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

  // Remove from cart
  const removeFromCart = async (productId: number) => {
    if (isAuthenticated) {
      try {
        const response = await cartService.removeFromCart(productId);
        // Update local state with backend response
        updateLocalStateWithBackend(response);
      } catch {
        notify.error("Error al eliminar");
      }
    } else {
      // Guest: update local state
      setCartItems(prev => prev.filter(item => item.productId !== productId));
    }
  };

  // Update quantity
  const updateQuantity = async (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) return removeFromCart(productId);

    if (isAuthenticated) {
      try {
        const response = await cartService.updateQuantity({ productId, quantity: newQuantity });
        // Update local state with backend response
        updateLocalStateWithBackend(response);
      } catch {
        notify.error("Error al actualizar");
      }
    } else {
      // Guest: update local state
      setCartItems(prev => prev.map(item =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  // Clear cart
  const clearCart = async () => {
    if (isAuthenticated) {
      try {
        setIsLoading(true);
        const response = await cartService.clearCart();
        // Update local state with backend response
        updateLocalStateWithBackend(response);
      } catch {
        notify.error("Error al vaciar");
      } finally {
        setIsLoading(false);
      }
    } else {
      // Guest: clear local state
      setCartItems([]);
    }
  };

  // Calculate cart total and count
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Provide cart context
  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart, updateQuantity,
      clearCart, cartTotal, cartCount, isLoading
    }}>
      {children}
    </CartContext.Provider>
  );
}