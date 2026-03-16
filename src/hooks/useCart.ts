import { useContext } from "react";
import { CartContext } from "../context/CartContext";

// Hook to consume cart from any component
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};