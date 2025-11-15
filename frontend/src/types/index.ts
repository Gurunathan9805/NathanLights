export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  // Add other user properties as needed
}

export interface CartState {
  items: CartItem[];
  total: number;
  count: number;
}

export interface AppState {
  user: User | null;
  cart: CartState;
  wishlist: Product[];
  showCart: boolean;
}

export type NavItem = {
  name: string;
  path: string;
  icon?: React.ReactNode;
};

export type NavItems = NavItem[];
