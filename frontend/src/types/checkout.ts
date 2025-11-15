export interface CardDetails {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
}

export interface CheckoutData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: 'upi' | 'card';
  upiId?: string;
  cardDetails?: CardDetails;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderData {
  items: OrderItem[];
  total: number;
  customerData: Omit<CheckoutData, 'paymentMethod' | 'upiId' | 'cardDetails'>;
  paymentMethod: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  orderDate: string;
}
