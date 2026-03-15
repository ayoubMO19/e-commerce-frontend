export interface ProductResponseDTO {
  productId: number;
  name: string;
  price: number;
  description: string;
  urlImage: string;
  stock: number;
  categoryId: number;
  categoryName: string;
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

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface RegisterRequestDTO {
  name: string;
  surname: string;
  email: string;
  password: string;
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

export interface UpdateUserRequestDTO {
  name?: string;
  surname?: string;
  email?: string;
}

export interface UserResponseDTO {
  userId: number;
  name: string;
  surname: string;
  email: string;
  hasWelcomeDiscount: boolean;
}

export interface OrdersRequestDTO {
  shippingAddress: string;
}

export interface OrderItemDTO {
  productId: number;
  productName: string;
  quantity: number;
  priceAtPurchase: number;
  imageUrl: string;
}
export interface OrdersResponseDTO {
  orderId: number;
  totalPrice: number;
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  shippingAddress: string;
  paymentIntentId?: string;
  paidAt?: string;
  createdAt: string;
  items: OrderItemDTO[];
}

export interface PaymentIntentRequestDTO {
  orderId: number;
}

export interface CartItemSyncDTO {
  productId: number;
  quantity: number;
}

export interface CartSyncRequestDTO {
  items: CartItemSyncDTO[];
}