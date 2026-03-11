import { toast } from "sonner";

interface ToastOptions {
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const notify = {
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