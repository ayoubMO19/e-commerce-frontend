import { useQuery } from '@tanstack/react-query';
import { productService, categoriesService } from '../services/api';

export const useProductsData = () => {
  return useQuery({
    queryKey: ['products'], // Esta es la "llave" del caché
    queryFn: productService.getAll,
  });
};

export const useCategoriesData = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: categoriesService.getAll,
  });
};

// Hook para un solo producto (Detalles)
export const useProductDetail = (id: string | number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getById(id),
    enabled: !!id, // Solo se ejecuta si hay un ID
  });
};