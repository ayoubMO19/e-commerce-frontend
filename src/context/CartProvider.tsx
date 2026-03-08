import { useState, useEffect, useCallback, useRef } from "react";
import type { ReactNode } from "react";
import { CartContext } from "./CartContext";
import { cartService } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { notify } from "../utils/notifications";
import type { ProductResponseDTO, CartItem, CartResponseDTO } from "../types/api";

const CART_STORAGE_KEY = "vexa_cart_local";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  
  // Ref para evitar bucles si el efecto se dispara más de lo debido
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
      const items: CartItem[] = JSON.parse(localData);
      if (items.length === 0) return;

      // Enviamos cada producto local al backend
      // Usamos un bucle for...of para asegurar que las peticiones se procesen en orden
      for (const item of items) {
        await cartService.addToCart({
          productId: item.productId,
          quantity: item.quantity
        });
      }
      
      notify.success("Carrito sincronizado con tu cuenta");
    } catch (error) {
      console.error("Error fusionando carrito:", error);
    } finally {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, []);

  // Carga y Sincronización
  useEffect(() => {
    const handleAuthChange = async () => {
      if (isAuthenticated) {
        if (isSyncing.current) return;
        isSyncing.current = true;
        setIsLoading(true);

        try {
          // fusionamos lo que el usuario eligió como invitado
          await mergeLocalCartWithBackend();
          
          // pedimos el carrito final (que ya incluye lo fusionado)
          const data = await cartService.getCart();
          updateLocalStateWithBackend(data);
        } catch (error) {
          console.error("Error al sincronizar carrito:", error);
        } finally {
          setIsLoading(false);
          isSyncing.current = false;
        }
      } else {
        // Si no está autenticado, cargar de LocalStorage
        const localCart = localStorage.getItem(CART_STORAGE_KEY);
        if (localCart) {
          setCartItems(JSON.parse(localCart));
        } else {
          setCartItems([]);
        }
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