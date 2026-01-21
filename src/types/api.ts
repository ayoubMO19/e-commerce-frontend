export interface ProductResponseDTO {
  productId: number;
  name: string;
  price: number;
  description: string;
  urlImage: string;
  stock: number;
}

export interface CategoriesResponseDTO {
  categoryId: number;
  name: string;
}

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  urlImage: string;
  stock: number;
}

