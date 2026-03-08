import axios from "axios";

export const handleAuthError = (error: unknown, defaultMessage: string): never => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const serverMessage = error.response?.data?.message;

    switch (status) {
      case 400: throw new Error(serverMessage || "Datos inválidos.");
      case 401: throw new Error("Credenciales incorrectas.");
      case 403: throw new Error("Acceso denegado.");
      case 409: throw new Error("Este correo ya está registrado.");
      case 429: throw new Error("Demasiados intentos. Inténtalo más tarde.");
      default: throw new Error(serverMessage || defaultMessage);
    }
  }

  if (error instanceof Error) throw error;
  throw new Error(defaultMessage);
};