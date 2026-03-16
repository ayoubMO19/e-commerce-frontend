import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Hook to consume authentication context from any component
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}