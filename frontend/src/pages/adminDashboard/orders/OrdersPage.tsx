import React from 'react';
import { Search, Download, Truck, Check, Eye, Trash2, Mail, Phone, MapPin, Clock, ShoppingCart } from 'lucide-react';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

interface Order {
  id: number;
  customer: string;
  email: string;
  phone: string;
  address: string;
  date: string;
  status: string;
  total: number;
  paymentMethod: string;
  items: OrderItem[];
}

interface OrdersPageProps {
  orders: Order[];
  searchQuery: string;
  filterStatus: string;
  setSearchQuery: (query: string) => void;
  setFilterStatus: (status: string) => void;
  updateOrderStatus: (id: number, status: string) => void;
  openOrderDetails: (order: Order) => void;
  deleteOrder: (id: number) => void;
  exportData: (type: string) => void;
}

const OrdersPage: React.FC<OrdersPageProps> = ({
  orders,
  searchQuery,
  filterStatus,
  setSearchQuery,
  setFilterStatus,
  updateOrderStatus,
  openOrderDetails,
  deleteOrder,
  exportData,
}) => {
  const filteredOrders = orders.filter(
    (o) =>
      (o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.id.toString().includes(searchQuery)) &&
      (filterStatus === "all" || o.status === filterStatus)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Processing':
        return 'bg-blue-500 bg-opacity-20 text-blue-400';
      case 'Shipped':
        return 'bg-purple-500 bg-opacity-20 text-purple-400';
      case 'Delivered':
        return 'bg-green-500 bg-opacity-20 text-green-400';
      case 'Cancelled':
        return 'bg-red-500 bg-opacity-20 text-red-400';
      default:
        return 'bg-gray-500 bg-opacity-20 text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Processing':
        return <Clock className="w-3 h-3" />;
      case 'Shipped':
        return <Truck className="w-3 h-3" />;
      case 'Delivered':
        return <Check className="w-3 h-3" />;
      case 'Cancelled':
        return <span className="w-3 h-3 flex items-center justify-center">×</span>;
      default:
        return null;
    }
  };

  const getNextAvailableStatuses = (currentStatus: string): string[] => {
    const statusFlow: Record<string, string[]> = {
      'Processing': ['Shipped', 'Cancelled'],
      'Shipped': ['Delivered'],
      'Delivered': [],
      'Cancelled': []
    };
    return statusFlow[currentStatus] || [];
  };

  return (
    <div>
      {/* Actions Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
            aria-hidden="true"
          />
          <input
            type="text"
            placeholder="Search orders by customer name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none"
            aria-label="Search orders"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none"
          aria-label="Filter orders by status"
        >
          <option value="all">All Orders</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button
          onClick={() => exportData("orders")}
          className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition flex items-center gap-2 whitespace-nowrap"
        >
          <Download size={20} aria-hidden="true" /> Export
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const nextStatuses = getNextAvailableStatuses(order.status);

          return (
            <div
              key={order.id}
              className="bg-gray-800 rounded-lg border border-gray-700 p-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-4 gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-white font-bold text-lg">
                      Order #{order.id}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-2xl">
                    ₹{order.total.toLocaleString()}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {order.paymentMethod}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-gray-900 rounded-lg">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Customer</p>
                  <p className="text-white font-semibold">{order.customer}</p>
                  <p className="text-gray-400 text-sm flex items-center gap-1 mt-1">
                    <Mail size={14} aria-hidden="true" /> {order.email}
                  </p>
                  <p className="text-gray-400 text-sm flex items-center gap-1 mt-1">
                    <Phone size={14} aria-hidden="true" /> {order.phone}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-gray-400 text-sm mb-1">
                    Shipping Address
                  </p>
                  <p className="text-white flex items-start gap-2">
                    <MapPin
                      size={16}
                      className="mt-1 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{order.address}</span>
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-400 text-sm mb-2">Items</p>
                <div className="space-y-2">
                  {order.items.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="text-white">
                        {item.name} x {item.qty}
                      </span>
                      <span className="text-gray-400">
                        ₹{(item.price * item.qty).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {nextStatuses.includes("Shipped") && (
                  <button
                    onClick={() => updateOrderStatus(order.id, "Shipped")}
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm hover:bg-purple-600 transition flex items-center gap-2"
                  >
                    <Truck size={16} aria-hidden="true" /> Mark as Shipped
                  </button>
                )}
                {nextStatuses.includes("Delivered") && (
                  <button
                    onClick={() => updateOrderStatus(order.id, "Delivered")}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition flex items-center gap-2"
                  >
                    <Check size={16} aria-hidden="true" /> Mark as Delivered
                  </button>
                )}
                {nextStatuses.includes("Cancelled") && (
                  <button
                    onClick={() => updateOrderStatus(order.id, "Cancelled")}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition"
                  >
                    Cancel Order
                  </button>
                )}

                <button
                  onClick={() => openOrderDetails(order)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg text-sm hover:bg-gray-600 transition flex items-center gap-2"
                >
                  <Eye size={16} aria-hidden="true" /> View Details
                </button>
                <button
                  onClick={() => deleteOrder(order.id)}
                  className="px-4 py-2 bg-gray-700 text-red-400 rounded-lg text-sm hover:bg-gray-600 transition flex items-center gap-2"
                >
                  <Trash2 size={16} aria-hidden="true" /> Delete
                </button>
              </div>

              {/* Status progression timeline */}
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-gray-400 text-sm mb-2">Order Journey:</p>
                <div className="flex items-center gap-2 text-xs">
                  {["Processing", "Shipped", "Delivered"].map(
                    (status, index) => (
                      <div key={status} className="flex items-center">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            order.status === status
                              ? "bg-amber-500 text-white"
                              : index <
                                [
                                  "Processing",
                                  "Shipped",
                                  "Delivered",
                                ].indexOf(order.status)
                              ? "bg-green-500 text-white"
                              : "bg-gray-600 text-gray-400"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <span
                          className={`ml-1 ${
                            order.status === status
                              ? "text-amber-400"
                              : index <
                                [
                                  "Processing",
                                  "Shipped",
                                  "Delivered",
                                ].indexOf(order.status)
                              ? "text-green-400"
                              : "text-gray-500"
                          }`}
                        >
                          {status}
                        </span>
                        {index < 2 && (
                          <div
                            className={`w-8 h-0.5 mx-2 ${
                              index <
                              ["Processing", "Shipped", "Delivered"].indexOf(
                                order.status
                              )
                                ? "bg-green-500"
                                : "bg-gray-600"
                            }`}
                          />
                        )}
                      </div>
                    )
                  )}
                  {order.status === "Cancelled" && (
                    <div className="flex items-center ml-4">
                      <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center">
                        ✕
                      </div>
                      <span className="ml-1 text-red-400">Cancelled</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {filteredOrders.length === 0 && (
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-12 text-center">
            <ShoppingCart
              size={48}
              className="text-gray-600 mx-auto mb-4"
              aria-hidden="true"
            />
            <p className="text-gray-400">No orders found</p>
            {(searchQuery || filterStatus !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilterStatus("all");
                }}
                className="mt-2 text-amber-400 hover:underline text-sm"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
