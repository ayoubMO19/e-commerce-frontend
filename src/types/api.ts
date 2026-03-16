// Product response
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

// Categories response
export interface CategoriesResponseDTO {
  categoryId: number;
  name: string;
}

// Cart item interface
export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  urlImage: string;
  stock: number;
}

// Login request
export interface LoginRequestDTO {
  email: string;
  password: string;
}

// Register request
export interface RegisterRequestDTO {
  name: string;
  surname: string;
  email: string;
  password: string;
}

// User response
export interface UserResponseDTO {
  userId: number;
  name: string;
  surname: string;
  email: string;
  hasWelcomeDiscount: boolean;
}

// Auth response
export interface AuthResponseDTO {
  token: string;
  user: UserResponseDTO;
}

// Register response
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

// Cart response
export interface CartResponseDTO {
  userId: number;
  items: CartItemDTO[];
  totalItems: number;
  totalPrice: number;
}

// Cart add request
export interface CartAddRequestDTO {
  productId: number;
  quantity: number;
}

// Cart update request
export interface CartUpdateRequestDTO {
  productId: number;
  quantity: number;
}

// Cart delete product request
export interface CartDeleteProductRequestDTO {
  productId: number;
}

// Update user request
export interface UpdateUserRequestDTO {
  name?: string;
  surname?: string;
  email?: string;
}

// User response
export interface UserResponseDTO {
  userId: number;
  name: string;
  surname: string;
  email: string;
  hasWelcomeDiscount: boolean;
}

// Orders request
export interface OrdersRequestDTO {
  shippingAddress: string;
}

// Order item
export interface OrderItemDTO {
  productId: number;
  productName: string;
  quantity: number;
  priceAtPurchase: number;
  imageUrl: string;
}

// Orders response
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

// Payment intent request
export interface PaymentIntentRequestDTO {
  orderId: number;
}

// Cart item sync DTO
export interface CartItemSyncDTO {
  productId: number;
  quantity: number;
}

// Cart sync request
export interface CartSyncRequestDTO {
  items: CartItemSyncDTO[];
}