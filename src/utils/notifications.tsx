import { toast } from "sonner";

// Toast options interface
interface ToastOptions {
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Notification utility
export const notify = {
  // Success notification
  success: (message: string, options?: ToastOptions) => {
    toast.success(message, {
      description: options?.description,
      action: options?.action,
      style: {
        borderRadius: '12px',
        padding: '16px',
      },
    },);
  },

  // Error notification
  error: (message: string, options?: ToastOptions) => {
    toast.error(message, {
      description: options?.description,
      action: options?.action,
      style: {
        borderRadius: '12px',
        padding: '16px',
      },
    },);
  },

  // Warning notification
  warn: (message: string, options?: ToastOptions) => {
    toast.warning(message, {
      description: options?.description,
      action: options?.action,
      style: {
        borderRadius: '12px',
        padding: '16px',
      },
    },);
  },

  // Info notification
  info: (message: string, options?: ToastOptions) => {
    toast(message, {
      description: options?.description,
      action: options?.action,
      style: {
        borderRadius: '12px',
        padding: '16px',
      },
    },);
  }
};