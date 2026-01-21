import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { ProductResponseDTO, CartItem } from "../types/api";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: ProductResponseDTO) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "vexa_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Cargar carrito desde localStorage al montar
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
      } catch (error) {
        console.error("Error saving cart to localStorage:", error);
      }
    }
  }, [cartItems, isInitialized]);

  // Sincronizar con backend (comentado para implementación futura)
  // useEffect(() => {
  //   if (isInitialized && cartItems.length > 0) {
  //     const syncCart = async () => {
  //       try {
  //         const token = localStorage.getItem("auth_token");
  //         if (!token) return;
  //
  //         const response = await fetch(
  //           "https://e-commerce-backend-lny2.onrender.com/api/cart/add",
  //           {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //               Authorization: `Bearer ${token}`,
  //             },
  //             body: JSON.stringify({
  //               productId: cartItems[cartItems.length - 1].productId,
  //               quantity: cartItems[cartItems.length - 1].quantity,
  //             }),
  //           }
  //         );
  //
  //         if (!response.ok) {
  //           throw new Error("Failed to sync cart with backend");
  //         }
  //       } catch (error) {
  //         console.error("Error syncing cart with backend:", error);
  //       }
  //     };
  //
  //     syncCart();
  //   }
  // }, [cartItems, isInitialized]);

  const addToCart = (product: ProductResponseDTO) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.productId === product.productId
      );

      if (existingItem) {
        // Si ya existe, incrementar cantidad (respetando stock)
        const newQuantity = Math.min(
          existingItem.quantity + 1,
          product.stock
        );
        return prevItems.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        // Si no existe, añadir nuevo item
        return [
          ...prevItems,
          {
            productId: product.productId,
            name: product.name,
            price: product.price,
            quantity: 1,
            urlImage: product.urlImage,
            stock: product.stock,
          },
        ];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.productId !== productId)
    );
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.productId === productId) {
          // Respetar el stock máximo
          const quantity = Math.min(newQuantity, item.stock);
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
