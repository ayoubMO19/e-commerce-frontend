import { useQuery } from '@tanstack/react-query';
import { productService, categoriesService } from '../services/api';

/**
 * Hook para obtener todos los productos.
 */
export const useProductsData = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: productService.getAll,
  });
};

/**
 * Hook para obtener todas las categorías.
 */
export const useCategoriesData = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: categoriesService.getAll,
  });
};


/**
 * Hook para obtener un solo producto (Detalles).
 */
export const useProductDetail = (id: string | number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getById(id),
    enabled: !!id,
  });
};