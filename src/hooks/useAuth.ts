import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * Hook para consumir el contexto de autenticación desde cualquier componente.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}