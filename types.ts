
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
}

export interface CartItem {
  cartId: string;
  product: Product;
  quantity: number;
  selectedOptions: ProductOption[];
  totalPrice: number;
}

export enum AppState {
  HOME = 'HOME',
  MENU = 'MENU',
  CONFIRMATION = 'CONFIRMATION'
}
