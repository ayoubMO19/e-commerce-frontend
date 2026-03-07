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

// Auth DTOs basados en swagger.json
export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface RegisterRequestDTO {
  name: string; // minLength: 2, maxLength: 50
  surname: string; // minLength: 2, maxLength: 50
  email: string;
  password: string; // minLength: 6
}

export interface UserResponseDTO {
  userId: number;
  name: string;
  surname: string;
  email: string;
  hasWelcomeDiscount: boolean;
}

export interface AuthResponseDTO {
  token: string;
  user: UserResponseDTO;
}

export interface RegisterResponseDTO {
  message: string;
  user: UserResponseDTO;
  emailSent: boolean;
}



// Añade esto a tu archivo de interfaces
export interface CartItemDTO {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
  urlImage: string;
  stock: number;
}

export interface CartResponseDTO {
  userId: number;
  items: CartItemDTO[];
  totalItems: number;
  totalPrice: number;
}

export interface CartAddRequestDTO {
  productId: number;
  quantity: number;
}

export interface CartUpdateRequestDTO {
  productId: number;
  quantity: number;
}

export interface CartDeleteProductRequestDTO {
  productId: number;
}