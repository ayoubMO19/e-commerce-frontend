import { useQuery } from '@tanstack/react-query';
import { productService, categoriesService } from '../services/api';

// Hook to get all products.
export const useProductsData = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: productService.getAll,
  });
};

// Hook to get all categories.
export const useCategoriesData = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: categoriesService.getAll,
  });
};


// Hook to get a single product (Details).
export const useProductDetail = (id: string | number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getById(id),
    enabled: !!id,
  });
};