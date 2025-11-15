import React from 'react';
import { X, Truck, Check, Clock, User, Mail, Phone, MapPin, Edit, Trash2 } from 'lucide-react';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface Order {
  id: number;
  customer: string;
  email: string;
  phone: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded';
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: OrderAddress;
  billingAddress: OrderAddress;
  notes?: string;
}

interface OrderDetailsModalProps {
  order: Order | null;
  onClose: () => void;
  onUpdateStatus: (orderId: number, status: string) => void;
  onDelete: (orderId: number) => void;
}

const statusStyles: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-indigo-100 text-indigo-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const paymentStatusStyles: Record<string, string> = {
  paid: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  failed: 'bg-red-100 text-red-800',
  refunded: 'bg-purple-100 text-purple-800',
};

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  onClose,
  onUpdateStatus,
  onDelete,
}) => {
  if (!order) return null;

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatAddress = (address: OrderAddress) => {
    return `${address.street}, ${address.city}, ${address.state} ${address.zipCode}, ${address.country}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
          &#8203;
        </span>
        <div className="inline-block w-full max-w-5xl transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:align-middle">
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Order #{order.id}
              </h3>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium ${statusStyles[order.status]}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
                <span className={`inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium ${paymentStatusStyles[order.paymentStatus]}`}>
                  {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Order Summary */}
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                <h4 className="mb-4 text-lg font-medium text-gray-900">Order Summary</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Order Date</span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatDate(order.date)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Payment Method</span>
                    <span className="text-sm font-medium capitalize text-gray-900">
                      {order.paymentMethod.replace(/-/g, ' ')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Payment Status</span>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${paymentStatusStyles[order.paymentStatus]}`}>
                      {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="mb-4 text-lg font-medium text-gray-900">Order Items</h4>
                  <div className="flow-root">
                    <ul className="-my-6 divide-y divide-gray-200">
                      {order.items.map((item) => (
                        <li key={item.id} className="flex py-6">
                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>{item.name}</h3>
                                <p className="ml-4">₹{item.price.toLocaleString()}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 border-t border-gray-200 pt-6">
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">₹{order.subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span className="font-medium">₹{order.shipping.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Tax</span>
                        <span className="font-medium">₹{order.tax.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between border-t border-gray-200 pt-3 text-base font-medium">
                        <span>Total</span>
                        <span>₹{order.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer & Shipping Info */}
              <div className="space-y-6">
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                  <h4 className="mb-4 text-lg font-medium text-gray-900">Customer Information</h4>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <User className="h-5 w-5 text-gray-400" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{order.customer}</p>
                        <p className="text-sm text-gray-500">{order.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <p className="ml-3 text-sm text-gray-500">{order.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-medium text-gray-900">Shipping Address</h4>
                    <button
                      type="button"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 flex-shrink-0 text-gray-400" />
                      <p className="ml-3 text-sm text-gray-500">
                        {formatAddress(order.shippingAddress)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-6">
                  <h4 className="mb-4 text-lg font-medium text-gray-900">Order Status</h4>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      {order.status === 'pending' ? (
                        <Clock className="h-5 w-5 text-yellow-500" />
                      ) : order.status === 'processing' ? (
                        <Truck className="h-5 w-5 text-blue-500" />
                      ) : order.status === 'shipped' ? (
                        <Truck className="h-5 w-5 text-indigo-500" />
                      ) : order.status === 'delivered' ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <X className="h-5 w-5 text-red-500" />
                      )}
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {order.status === 'pending' && 'Order Placed'}
                          {order.status === 'processing' && 'Processing'}
                          {order.status === 'shipped' && 'Shipped'}
                          {order.status === 'delivered' && 'Delivered'}
                          {order.status === 'cancelled' && 'Cancelled'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {order.status === 'pending' && 'Your order has been received'}
                          {order.status === 'processing' && 'Your order is being processed'}
                          {order.status === 'shipped' && 'Your order is on the way'}
                          {order.status === 'delivered' && 'Your order has been delivered'}
                          {order.status === 'cancelled' && 'Your order has been cancelled'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {order.status !== 'cancelled' && order.status !== 'delivered' && (
                    <div className="mt-6">
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                        Update Status
                      </label>
                      <select
                        id="status"
                        name="status"
                        value={order.status}
                        onChange={(e) => onUpdateStatus(order.id, e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </div>
                  )}
                </div>

                {order.notes && (
                  <div className="rounded-lg border border-gray-200 bg-white p-6">
                    <h4 className="mb-4 text-lg font-medium text-gray-900">Order Notes</h4>
                    <p className="text-sm text-gray-500">{order.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              onClick={() => onDelete(order.id)}
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
            >
              <Trash2 className="mr-2 h-5 w-5" />
              Delete Order
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
