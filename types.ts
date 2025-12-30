
export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface ProductOption {
  id: string;
  name: string;
  price: number;
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  options: ProductOption[];
  calories?: number;
  allergens?: string[];
  isOutOfStock?: boolean;
}

export interface CartItem {
  cartId: string;
  product: Product;
  quantity: number;
  selectedOptions: ProductOption[];
  totalPrice: number;
}

export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN'
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PREPARING = 'PREPARING',
  READY = 'READY',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  timestamp: number;
}

export enum AppState {
  LOGIN = 'LOGIN',
  HOME = 'HOME',
  MENU = 'MENU',
  CONFIRMATION = 'CONFIRMATION',
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD',
  ORDER_TRACKING = 'ORDER_TRACKING'
}
