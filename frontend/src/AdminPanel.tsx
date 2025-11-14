import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  User,
  Package,
  DollarSign,
  Users,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  X,
  Check,
  Clock,
  Truck,
  Mail,
  Phone,
  MapPin,
  Star,
  BarChart3,
  LogOut,
  Menu,
  Home,
  Settings,
  Bell,
  Download,
  AlertCircle,
} from "lucide-react";

// Valid image URLs from Unsplash
const productImages = {
  table1:
    "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
  pendant1:
    "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
  wall1:
    "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
  led1: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
  outdoor1:
    "https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
  pendant2:
    "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
  table2:
    "https://images.unsplash.com/photo-1550985616-10810253b84d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
  led2: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
};

// Initial Data
const initialProducts = [
  {
    id: 1,
    name: "Aurora Table Lamp",
    category: "table",
    price: 4999,
    image: productImages.table1,
    rating: 4.5,
    reviews: 23,
    stock: 15,
    sold: 89,
  },
  {
    id: 2,
    name: "Nordic Pendant Light",
    category: "pendant",
    price: 7999,
    image: productImages.pendant1,
    rating: 5,
    reviews: 45,
    stock: 8,
    sold: 156,
  },
  {
    id: 3,
    name: "Minimalist Wall Sconce",
    category: "wall",
    price: 3499,
    image: productImages.wall1,
    rating: 4,
    reviews: 18,
    stock: 22,
    sold: 67,
  },
  {
    id: 4,
    name: "LED Strip Kit",
    category: "led",
    price: 2999,
    image: productImages.led1,
    rating: 4.5,
    reviews: 67,
    stock: 30,
    sold: 234,
  },
  {
    id: 5,
    name: "Garden Path Light",
    category: "outdoor",
    price: 5499,
    image: productImages.outdoor1,
    rating: 4.5,
    reviews: 34,
    stock: 12,
    sold: 98,
  },
  {
    id: 6,
    name: "Crystal Chandelier",
    category: "pendant",
    price: 12999,
    image: productImages.pendant2,
    rating: 5,
    reviews: 89,
    stock: 5,
    sold: 145,
  },
  {
    id: 7,
    name: "Desk Reading Lamp",
    category: "table",
    price: 3999,
    image: productImages.table2,
    rating: 4,
    reviews: 56,
    stock: 0,
    sold: 187,
  },
  {
    id: 8,
    name: "Smart LED Bulb",
    category: "led",
    price: 1499,
    image: productImages.led2,
    rating: 4.5,
    reviews: 123,
    stock: 45,
    sold: 312,
  },
];

const initialOrders: any[] = [
  {
    id: 1001,
    customer: "Priya Sharma",
    email: "priya@example.com",
    phone: "+91 98765 43210",
    items: [{ id: 1, name: "Aurora Table Lamp", qty: 1, price: 4999 }],
    total: 4999,
    status: "Delivered",
    paymentMethod: "UPI",
    date: "2025-11-10",
    address: "123 MG Road, Mumbai, 400001",
  },
  {
    id: 1002,
    customer: "Rahul Mehta",
    email: "rahul@example.com",
    phone: "+91 98765 43211",
    items: [{ id: 2, name: "Nordic Pendant Light", qty: 2, price: 7999 }],
    total: 15998,
    status: "Processing",
    paymentMethod: "COD",
    date: "2025-11-11",
    address: "456 Park Street, Delhi, 110001",
  },
  {
    id: 1003,
    customer: "Anjali Patel",
    email: "anjali@example.com",
    phone: "+91 98765 43212",
    items: [
      { id: 4, name: "LED Strip Kit", qty: 1, price: 2999 },
      { id: 8, name: "Smart LED Bulb", qty: 3, price: 1499 },
    ],
    total: 7496,
    status: "Shipped",
    paymentMethod: "Card",
    date: "2025-11-09",
    address: "789 Brigade Road, Bangalore, 560001",
  },
  {
    id: 1004,
    customer: "Vikram Singh",
    email: "vikram@example.com",
    phone: "+91 98765 43213",
    items: [{ id: 6, name: "Crystal Chandelier", qty: 1, price: 12999 }],
    total: 12999,
    status: "Processing",
    paymentMethod: "UPI",
    date: "2025-11-12",
    address: "321 Marine Drive, Mumbai, 400002",
  },
  {
    id: 1005,
    customer: "Sneha Reddy",
    email: "sneha@example.com",
    phone: "+91 98765 43214",
    items: [{ id: 5, name: "Garden Path Light", qty: 4, price: 5499 }],
    total: 21996,
    status: "Cancelled",
    paymentMethod: "COD",
    date: "2025-11-08",
    address: "654 Jubilee Hills, Hyderabad, 500033",
  },
];

const initialCustomers: any[] = [
  {
    id: 1,
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "+91 98765 43210",
    orders: 5,
    totalSpent: 24995,
    joined: "2024-08-15",
    status: "Active",
  },
  {
    id: 2,
    name: "Rahul Mehta",
    email: "rahul@example.com",
    phone: "+91 98765 43211",
    orders: 3,
    totalSpent: 18997,
    joined: "2024-09-20",
    status: "Active",
  },
  {
    id: 3,
    name: "Anjali Patel",
    email: "anjali@example.com",
    phone: "+91 98765 43212",
    orders: 8,
    totalSpent: 45892,
    joined: "2024-07-10",
    status: "VIP",
  },
  {
    id: 4,
    name: "Vikram Singh",
    email: "vikram@example.com",
    phone: "+91 98765 43213",
    orders: 2,
    totalSpent: 15998,
    joined: "2024-10-05",
    status: "Active",
  },
  {
    id: 5,
    name: "Sneha Reddy",
    email: "sneha@example.com",
    phone: "+91 98765 43214",
    orders: 1,
    totalSpent: 5499,
    joined: "2024-11-01",
    status: "New",
  },
];

// Extract Sidebar Component
const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  currentPage,
  navigate,
  pendingOrders,
}: any) => (
  <aside
    className={`${
      sidebarOpen ? "w-64" : "w-20"
    } bg-gray-900 min-h-screen fixed left-0 top-0 transition-all duration-300 border-r border-gray-800 z-40`}
  >
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        {sidebarOpen && (
          <div>
            <div className="flex items-center space-x-1">
              <span className="text-2xl font-serif italic text-amber-400">
                Nathan
              </span>
              <span className="text-2xl font-bold text-amber-400">LIGHTS</span>
            </div>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>
        )}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-400 hover:text-white"
          aria-label="Toggle sidebar"
        >
          <Menu size={24} />
        </button>
      </div>

      <nav className="space-y-2">
        {[
          { id: "dashboard", icon: Home, label: "Dashboard" },
          { id: "products", icon: Package, label: "Products" },
          {
            id: "orders",
            icon: ShoppingCart,
            label: "Orders",
            badge: pendingOrders,
          },
          { id: "customers", icon: Users, label: "Customers" },
          { id: "analytics", icon: BarChart3, label: "Analytics" },
          { id: "settings", icon: Settings, label: "Settings" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              currentPage === item.id
                ? "bg-amber-500 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
            aria-current={currentPage === item.id ? "page" : undefined}
          >
            <item.icon size={20} aria-hidden="true" />
            {sidebarOpen && <span>{item.label}</span>}
            {sidebarOpen && item.badge > 0 && (
              <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-5 h-5 flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>

    <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800">
      <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition">
        <LogOut size={20} aria-hidden="true" />
        {sidebarOpen && <span>Logout</span>}
      </button>
    </div>
  </aside>
);

// Extract Header Component
const Header = ({ sidebarOpen, currentPage, notifications }: any) => (
  <header
    className="bg-gray-900 border-b border-gray-800 px-6 py-4 fixed top-0 right-0 z-30 transition-all duration-300"
    style={{ marginLeft: sidebarOpen ? "256px" : "80px" }}
  >
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-white capitalize">
          {currentPage}
        </h1>
        <p className="text-gray-400 text-sm">Manage your Nathan Lights store</p>
      </div>
      <div className="flex items-center gap-4">
        <button
          className="relative text-gray-400 hover:text-white"
          aria-label={`${notifications} notifications`}
        >
          <Bell size={20} aria-hidden="true" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {notifications}
            </span>
          )}
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
            <User size={20} className="text-white" aria-hidden="true" />
          </div>
          <div className="text-left">
            <p className="text-white font-semibold">Admin User</p>
            <p className="text-gray-400 text-xs">admin@nathanlights.com</p>
          </div>
        </div>
      </div>
    </div>
  </header>
);

// Extract Product Modal Component
const ProductModal = ({
  showModal,
  setShowModal,
  selectedItem,
  productForm,
  setProductForm,
  saveProduct,
}: any) => {
  const [errors, setErrors] = useState<any>({});

  const validateForm = () => {
    const newErrors: any = {};
    if (!productForm.name.trim()) newErrors.name = "Product name is required";
    if (productForm.price <= 0)
      newErrors.price = "Price must be greater than 0";
    if (productForm.stock < 0) newErrors.stock = "Stock cannot be negative";
    if (!productForm.image.trim()) newErrors.image = "Image URL is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      saveProduct();
    }
  };

  const handleImageError = (e: any) => {
    e.target.src =
      "https://via.placeholder.com/400x300/374151/6B7280?text=Image+Not+Found";
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
        <div className="p-6 border-b border-gray-700 flex justify-between items-center sticky top-0 bg-gray-800">
          <h2 className="text-2xl font-bold text-white">
            {selectedItem ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-400 hover:text-white"
            aria-label="Close modal"
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label
              htmlFor="product-name"
              className="text-gray-400 text-sm block mb-2"
            >
              Product Name *
            </label>
            <input
              id="product-name"
              type="text"
              value={productForm.name}
              onChange={(e) =>
                setProductForm({ ...productForm, name: e.target.value })
              }
              className={`w-full px-4 py-3 bg-gray-900 text-white rounded-lg border ${
                errors.name ? "border-red-500" : "border-gray-700"
              }`}
              placeholder="Enter product name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="product-category"
                className="text-gray-400 text-sm block mb-2"
              >
                Category *
              </label>
              <select
                id="product-category"
                value={productForm.category}
                onChange={(e) =>
                  setProductForm({ ...productForm, category: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-700"
              >
                <option value="table">Table Lamps</option>
                <option value="pendant">Pendant Lights</option>
                <option value="wall">Wall Lights</option>
                <option value="led">LED</option>
                <option value="outdoor">Outdoor</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="product-price"
                className="text-gray-400 text-sm block mb-2"
              >
                Price (₹) *
              </label>
              <input
                id="product-price"
                type="number"
                value={productForm.price}
                onChange={(e) =>
                  setProductForm({
                    ...productForm,
                    price: parseInt(e.target.value) || 0,
                  })
                }
                className={`w-full px-4 py-3 bg-gray-900 text-white rounded-lg border ${
                  errors.price ? "border-red-500" : "border-gray-700"
                }`}
                placeholder="0"
                min="0"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="product-stock"
                className="text-gray-400 text-sm block mb-2"
              >
                Stock Quantity *
              </label>
              <input
                id="product-stock"
                type="number"
                value={productForm.stock}
                onChange={(e) =>
                  setProductForm({
                    ...productForm,
                    stock: parseInt(e.target.value) || 0,
                  })
                }
                className={`w-full px-4 py-3 bg-gray-900 text-white rounded-lg border ${
                  errors.stock ? "border-red-500" : "border-gray-700"
                }`}
                placeholder="0"
                min="0"
              />
              {errors.stock && (
                <p className="text-red-500 text-sm mt-1">{errors.stock}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="product-rating"
                className="text-gray-400 text-sm block mb-2"
              >
                Rating
              </label>
              <input
                id="product-rating"
                type="number"
                step="0.1"
                value={productForm.rating}
                onChange={(e) =>
                  setProductForm({
                    ...productForm,
                    rating: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-700"
                placeholder="0.0"
                min="0"
                max={5}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="product-image"
              className="text-gray-400 text-sm block mb-2"
            >
              Image URL *
            </label>
            <input
              id="product-image"
              type="url"
              value={productForm.image}
              onChange={(e) =>
                setProductForm({ ...productForm, image: e.target.value })
              }
              className={`w-full px-4 py-3 bg-gray-900 text-white rounded-lg border ${
                errors.image ? "border-red-500" : "border-gray-700"
              }`}
              placeholder="https://..."
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image}</p>
            )}
          </div>

          <div className="bg-amber-500 bg-opacity-10 border border-amber-500 border-opacity-30 rounded-lg p-4">
            <p className="text-amber-400 text-sm">
              <strong>Note:</strong> Stock status will automatically update
              based on stock quantity. Products with 0 stock will show as "Out
              of Stock".
            </p>
          </div>

          {productForm.image && (
            <div>
              <p className="text-gray-400 text-sm mb-2">Image Preview</p>
              <img
                src={productForm.image}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
                onError={handleImageError}
              />
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-700 flex gap-4">
          <button
            onClick={() => setShowModal(false)}
            className="flex-1 px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-6 py-3 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition"
          >
            {selectedItem ? "Update Product" : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Extract Order Details Modal
const OrderDetailsModal = ({
  order,
  onClose,
  onUpdateStatus,
  onDelete,
}: any) => {
  const getNextAvailableStatuses = (currentStatus: any) => {
    switch (currentStatus) {
      case "Processing":
        return ["Shipped", "Cancelled"];
      case "Shipped":
        return ["Delivered"];
      case "Delivered":
        return [];
      case "Cancelled":
        return [];
      default:
        return ["Processing", "Cancelled"];
    }
  };

  const getStatusColor = (status: any) => {
    switch (status) {
      case "Processing":
        return "bg-blue-500 bg-opacity-20 text-blue-500";
      case "Shipped":
        return "bg-purple-500 bg-opacity-20 text-purple-500";
      case "Delivered":
        return "bg-green-500 bg-opacity-20 text-green-500";
      case "Cancelled":
        return "bg-red-500 bg-opacity-20 text-red-500";
      default:
        return "bg-gray-500 bg-opacity-20 text-gray-500";
    }
  };

  if (!order) return null;

  const nextStatuses = getNextAvailableStatuses(order.status);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
        <div className="p-6 border-b border-gray-700 flex justify-between items-center sticky top-0 bg-gray-800">
          <h2 className="text-2xl font-bold text-white">
            Order #{order.id} Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Customer Information
              </h3>
              <div className="space-y-3">
                <p>
                  <span className="text-gray-400">Name:</span>{" "}
                  <span className="text-white">{order.customer}</span>
                </p>
                <p>
                  <span className="text-gray-400">Email:</span>{" "}
                  <span className="text-white">{order.email}</span>
                </p>
                <p>
                  <span className="text-gray-400">Phone:</span>{" "}
                  <span className="text-white">{order.phone}</span>
                </p>
                <p>
                  <span className="text-gray-400">Order Date:</span>{" "}
                  <span className="text-white">{order.date}</span>
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Order Information
              </h3>
              <div className="space-y-3">
                <p>
                  <span className="text-gray-400">Status:</span>
                  <span
                    className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </p>
                <p>
                  <span className="text-gray-400">Payment Method:</span>{" "}
                  <span className="text-white">{order.paymentMethod}</span>
                </p>
                <p>
                  <span className="text-gray-400">Total Amount:</span>{" "}
                  <span className="text-white font-bold">
                    ₹{order.total.toLocaleString()}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Shipping Address
            </h3>
            <p className="text-gray-300 bg-gray-900 p-4 rounded-lg">
              {order.address}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Order Items
            </h3>
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-4 py-3 text-left text-gray-400 font-semibold">
                      Product
                    </th>
                    <th className="px-4 py-3 text-left text-gray-400 font-semibold">
                      Quantity
                    </th>
                    <th className="px-4 py-3 text-left text-gray-400 font-semibold">
                      Price
                    </th>
                    <th className="px-4 py-3 text-left text-gray-400 font-semibold">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item: any) => (
                    <tr key={item.id} className="border-t border-gray-800">
                      <td className="px-4 py-3 text-white">{item.name}</td>
                      <td className="px-4 py-3 text-gray-300">{item.qty}</td>
                      <td className="px-4 py-3 text-gray-300">
                        ₹{item.price.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-white font-semibold">
                        ₹{(item.price * item.qty).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Status Timeline */}
          <div className="bg-gray-900 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">
              Order Journey
            </h3>
            <div className="flex items-center gap-2 text-sm">
              {["Processing", "Shipped", "Delivered"].map((status, index) => (
                <div key={status} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      order.status === status
                        ? "bg-amber-500 text-white"
                        : index <
                          ["Processing", "Shipped", "Delivered"].indexOf(
                            order.status
                          )
                        ? "bg-green-500 text-white"
                        : "bg-gray-600 text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span
                    className={`ml-2 ${
                      order.status === status
                        ? "text-amber-400"
                        : index <
                          ["Processing", "Shipped", "Delivered"].indexOf(
                            order.status
                          )
                        ? "text-green-400"
                        : "text-gray-500"
                    }`}
                  >
                    {status}
                  </span>
                  {index < 2 && (
                    <div
                      className={`w-12 h-0.5 mx-2 ${
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
              ))}
              {order.status === "Cancelled" && (
                <div className="flex items-center ml-4">
                  <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center">
                    ✕
                  </div>
                  <span className="ml-2 text-red-400">Cancelled</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-700 flex flex-wrap gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition"
          >
            Close
          </button>

          {/* Dynamic status buttons */}
          {nextStatuses.includes("Shipped") && (
            <button
              onClick={() => {
                onUpdateStatus(order.id, "Shipped");
                onClose();
              }}
              className="px-6 py-3 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition flex items-center gap-2"
            >
              <Truck size={16} /> Mark as Shipped
            </button>
          )}
          {nextStatuses.includes("Delivered") && (
            <button
              onClick={() => {
                onUpdateStatus(order.id, "Delivered");
                onClose();
              }}
              className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition flex items-center gap-2"
            >
              <Check size={16} /> Mark as Delivered
            </button>
          )}
          {nextStatuses.includes("Cancelled") && (
            <button
              onClick={() => {
                onUpdateStatus(order.id, "Cancelled");
                onClose();
              }}
              className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
            >
              Cancel Order
            </button>
          )}

          <button
            onClick={() => {
              if (
                window.confirm("Are you sure you want to delete this order?")
              ) {
                onDelete(order.id);
                onClose();
              }
            }}
            className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Delete Order
          </button>
        </div>
      </div>
    </div>
  );
};

interface Product {
  id?: number;
  name: string;
  price: number;
  stock: number;
  sold: number;
  // Add other product properties as needed
}

const AdminPanel: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>("dashboard");
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<any[]>(initialOrders);
  const [customers, setCustomers] = useState<any[]>(initialCustomers);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [notifications, setNotifications] = useState<number>(3);
  const [settings, setSettings] = useState({
    storeName: "Nathan Lights",
    storeEmail: "info@nathanlights.com",
    storePhone: "+91 98765 43210",
    storeAddress: "123 Design Street, Mumbai, India 400001",
    freeShippingThreshold: 5000,
    standardShippingCost: 500,
    processingTime: "2-3",
    deliveryTime: "5-7",
  });
  console.log(setNotifications, setCustomers);
  // Product Form State
  const [productForm, setProductForm] = useState<any>({
    name: "",
    category: "table",
    price: 0,
    stock: 0,
    image: "",
    rating: 0,
    reviews: 0,
  });

  // Auto-calculate inStock based on stock quantity
  const updateProductsWithStockStatus = (productsArray: any) => {
    return productsArray.map((product: any) => ({
      ...product,
      inStock: product.stock > 0, // Auto-calculate based on stock
    }));
  };

  // Initialize products with proper stock status
  useEffect(() => {
    setProducts(updateProductsWithStockStatus(initialProducts));
  }, []);

  // Dashboard Stats
  const totalRevenue = orders.reduce(
    (sum, order) => sum + (order.status !== "Cancelled" ? order.total : 0),
    0
  );
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalCustomers = customers.length;
  const pendingOrders = orders.filter(
    (o: any) => o.status === "Processing"
  ).length;
  const lowStockProducts = products.filter(
    (p: any) => p.stock < 10 && p.stock > 0
  ).length;
  const outOfStockProducts = products.filter((p: any) => p.stock === 0).length;

  // Reset search and filter when changing pages
  useEffect(() => {
    setSearchQuery("");
    setFilterStatus("all");
  }, [currentPage]);

  // Navigation
  const navigate = (page: any) => {
    setCurrentPage(page);
    setShowModal(false);
    setShowOrderModal(false);
    setSelectedItem(null);
    setSelectedOrder(null);
  };

  // Product Functions
  const openProductModal = (product = null) => {
    if (product) {
      setProductForm(product);
      setSelectedItem(product);
    } else {
      setProductForm({
        name: "",
        category: "table",
        price: 0,
        stock: 0,
        image: "",
        rating: 0,
        reviews: 0,
      });
      setSelectedItem(null);
    }
    setShowModal(true);
  };

  const saveProduct = () => {
    const newProduct = {
      ...productForm,
      inStock: productForm.stock > 0, // Auto-calculate inStock based on stock
    };

    if (selectedItem) {
      const updatedProducts = products.map((p: any) =>
        p.id === selectedItem.id ? { ...newProduct, id: selectedItem.id } : p
      );
      setProducts(updateProductsWithStockStatus(updatedProducts));
    } else {
      setProducts((prev) =>
        updateProductsWithStockStatus([
          ...prev,
          { ...newProduct, id: Date.now(), sold: 0 },
        ])
      );
    }
    setShowModal(false);
    setProductForm({
      name: "",
      category: "table",
      price: 0,
      stock: 0,
      image: "",
      rating: 0,
      reviews: 0,
    });
  };

  const deleteProduct = (id: any) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p: any) => p.id !== id));
    }
  };

  // Order Status Helper Functions
  const getNextAvailableStatuses = (currentStatus: any) => {
    switch (currentStatus) {
      case "Processing":
        return ["Shipped", "Cancelled"];
      case "Shipped":
        return ["Delivered"];
      case "Delivered":
        return [];
      case "Cancelled":
        return [];
      default:
        return ["Processing", "Cancelled"];
    }
  };

  const getStatusColor = (status: any) => {
    switch (status) {
      case "Processing":
        return "bg-blue-500 bg-opacity-20 text-blue-500";
      case "Shipped":
        return "bg-purple-500 bg-opacity-20 text-purple-500";
      case "Delivered":
        return "bg-green-500 bg-opacity-20 text-green-500";
      case "Cancelled":
        return "bg-red-500 bg-opacity-20 text-red-500";
      default:
        return "bg-gray-500 bg-opacity-20 text-gray-500";
    }
  };

  const getStatusIcon = (status: any) => {
    switch (status) {
      case "Processing":
        return <Clock size={16} />;
      case "Shipped":
        return <Truck size={16} />;
      case "Delivered":
        return <Check size={16} />;
      case "Cancelled":
        return <X size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  // Order Functions with Stock Management
  const updateOrderStatus = (orderId: any, newStatus: any) => {
    setOrders(
      orders.map((o) => {
        if (o.id === orderId) {
          // If order is being shipped, update the stock
          if (newStatus === "Shipped" && o.status === "Processing") {
            updateStockForOrder(o);
          }
          // If order is cancelled and was shipped, restore stock
          if (newStatus === "Cancelled" && o.status === "Shipped") {
            restoreStockForOrder(o);
          }
          return { ...o, status: newStatus };
        }
        return o;
      })
    );
  };

  interface OrderItem {
    name: string;
    qty: number;
    // Add other order item properties as needed
  }

  interface Order {
    items: OrderItem[];
    // Add other order properties as needed
  }

  // Update stock when order is shipped
  const updateStockForOrder = (order: Order) => {
    const updatedProducts = [...products];
    order.items.forEach((orderItem: OrderItem) => {
      const productIndex = updatedProducts.findIndex(
        (p) => p.name === orderItem.name
      );
      if (productIndex !== -1) {
        updatedProducts[productIndex] = {
          ...updatedProducts[productIndex],
          stock: Math.max(
            0,
            updatedProducts[productIndex].stock - orderItem.qty
          ),
          sold: updatedProducts[productIndex].sold + orderItem.qty,
        };
      }
    });
    setProducts(updateProductsWithStockStatus(updatedProducts));
  };

  // Restore stock when order is cancelled
  const restoreStockForOrder = (order: any) => {
    const updatedProducts = [...products];
    order.items.forEach((orderItem: any) => {
      const productIndex = updatedProducts.findIndex(
        (p: any) => p.name === orderItem.name
      );
      if (productIndex !== -1) {
        updatedProducts[productIndex] = {
          ...updatedProducts[productIndex],
          stock: updatedProducts[productIndex].stock + orderItem.qty,
          sold: Math.max(0, updatedProducts[productIndex].sold - orderItem.qty),
        };
      }
    });
    setProducts(updateProductsWithStockStatus(updatedProducts));
  };

  const deleteOrder = (id: any) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrders(orders.filter((o) => o.id !== id));
    }
  };

  const openOrderDetails = (order: any) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  // Customer Functions
  const sendEmailToCustomer = (customer: any) => {
    alert(`Sending email to ${customer.email}`);
  };

  const viewCustomerDetails = (customer: any) => {
    alert(`Viewing details for ${customer.name}`);
  };

  // Export Functions
  const exportData = (type: any) => {
    alert(`Exporting ${type} data...`);
  };

  // Settings Functions
  const updateSettings = (newSettings: any) => {
    setSettings(newSettings);
    alert("Settings saved successfully!");
  };

  // Handle image errors
  const handleImageError = (e: any) => {
    e.target.src =
      "https://via.placeholder.com/400x300/374151/6B7280?text=Image+Not+Found";
  };

  // Dashboard Page
  const DashboardPage = () => (
    <div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500 bg-opacity-20 rounded-lg">
              <DollarSign
                className="text-green-500"
                size={24}
                aria-hidden="true"
              />
            </div>
            <span className="text-green-500 text-sm font-semibold">+12.5%</span>
          </div>
          <p className="text-gray-400 text-sm mb-1">Total Revenue</p>
          <p className="text-white text-3xl font-bold">
            ₹{totalRevenue.toLocaleString()}
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500 bg-opacity-20 rounded-lg">
              <ShoppingCart
                className="text-blue-500"
                size={24}
                aria-hidden="true"
              />
            </div>
            <span className="text-blue-500 text-sm font-semibold">+8.2%</span>
          </div>
          <p className="text-gray-400 text-sm mb-1">Total Orders</p>
          <p className="text-white text-3xl font-bold">{totalOrders}</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500 bg-opacity-20 rounded-lg">
              <Package
                className="text-purple-500"
                size={24}
                aria-hidden="true"
              />
            </div>
            <span className="text-purple-500 text-sm font-semibold">
              {lowStockProducts} low
            </span>
          </div>
          <p className="text-gray-400 text-sm mb-1">Total Products</p>
          <p className="text-white text-3xl font-bold">{totalProducts}</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-500 bg-opacity-20 rounded-lg">
              <Users className="text-amber-500" size={24} aria-hidden="true" />
            </div>
            <span className="text-amber-500 text-sm font-semibold">+5.1%</span>
          </div>
          <p className="text-gray-400 text-sm mb-1">Total Customers</p>
          <p className="text-white text-3xl font-bold">{totalCustomers}</p>
        </div>
      </div>

      {/* Stock Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Low Stock Products</p>
              <p className="text-white text-2xl font-bold">
                {lowStockProducts}
              </p>
            </div>
            <AlertCircle className="text-amber-500" size={32} />
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Out of Stock</p>
              <p className="text-white text-2xl font-bold">
                {outOfStockProducts}
              </p>
            </div>
            <AlertCircle className="text-red-500" size={32} />
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Pending Orders</p>
              <p className="text-white text-2xl font-bold">{pendingOrders}</p>
            </div>
            <Clock className="text-blue-500" size={32} />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Recent Orders</h2>
            <button
              onClick={() => navigate("orders")}
              className="text-amber-400 hover:underline text-sm"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {orders.slice(0, 5).map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 bg-gray-900 rounded-lg"
              >
                <div>
                  <p className="text-white font-semibold">#{order.id}</p>
                  <p className="text-gray-400 text-sm">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">
                    ₹{order.total.toLocaleString()}
                  </p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Low Stock Alerts</h2>
            <button
              onClick={() => navigate("products")}
              className="text-amber-400 hover:underline text-sm"
            >
              Manage
            </button>
          </div>
          <div className="space-y-4">
            {products
              .filter((p: any) => p.stock < 10 && p.stock > 0)
              .map((product: any) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                    onError={handleImageError}
                  />
                  <div className="flex-1">
                    <p className="text-white font-semibold">{product.name}</p>
                    <p className="text-gray-400 text-sm">
                      Stock: {product.stock} units
                    </p>
                  </div>
                  <AlertCircle
                    className="text-amber-500"
                    size={20}
                    aria-hidden="true"
                  />
                </div>
              ))}
            {products
              .filter((p: any) => p.stock === 0)
              .map((product: any) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                    onError={handleImageError}
                  />
                  <div className="flex-1">
                    <p className="text-white font-semibold">{product.name}</p>
                    <p className="text-gray-400 text-sm">Out of Stock</p>
                  </div>
                  <AlertCircle
                    className="text-red-500"
                    size={20}
                    aria-hidden="true"
                  />
                </div>
              ))}
            {lowStockProducts === 0 && outOfStockProducts === 0 && (
              <p className="text-gray-400 text-center py-8">
                All products are well stocked!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mt-6">
        <h2 className="text-xl font-bold text-white mb-6">
          Top Selling Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products
            .sort((a: any, b: any) => b.sold - a.sold)
            .slice(0, 4)
            .map((product: any) => (
              <div
                key={product.id}
                className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition duration-300"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover"
                  onError={handleImageError}
                />
                <div className="p-4">
                  <p className="text-white font-semibold mb-2 line-clamp-2">
                    {product.name}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-amber-400 font-bold">
                      ₹{product.price.toLocaleString()}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {product.sold} sold
                    </span>
                  </div>
                  <div className="mt-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        product.inStock
                          ? product.stock < 10
                            ? "bg-amber-500 bg-opacity-20 text-amber-500"
                            : "bg-green-500 bg-opacity-20 text-green-500"
                          : "bg-red-500 bg-opacity-20 text-red-500"
                      }`}
                    >
                      {product.inStock
                        ? product.stock < 10
                          ? "Low Stock"
                          : "In Stock"
                        : "Out of Stock"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  // Products Page
  const ProductsPage = () => {
    const filteredProducts = products.filter(
      (p: any) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (filterStatus === "all" ||
          (filterStatus === "inStock" && p.inStock) ||
          (filterStatus === "outOfStock" && !p.inStock))
    );

    const getStockStatus = (product: any) => {
      if (product.stock === 0) return { text: "Out of Stock", color: "red" };
      if (product.stock < 5) return { text: "Low Stock", color: "red" };
      if (product.stock < 10) return { text: "Medium Stock", color: "amber" };
      return { text: "In Stock", color: "green" };
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
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none"
              aria-label="Search products"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none"
            aria-label="Filter products by status"
          >
            <option value="all">All Products</option>
            <option value="inStock">In Stock</option>
            <option value="outOfStock">Out of Stock</option>
          </select>
          <button
            onClick={() => openProductModal()}
            className="px-6 py-3 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition flex items-center gap-2 whitespace-nowrap"
          >
            <Plus size={20} aria-hidden="true" /> Add Product
          </button>
        </div>

        {/* Products Table */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-400 font-semibold">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-gray-400 font-semibold">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-gray-400 font-semibold">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-gray-400 font-semibold">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-left text-gray-400 font-semibold">
                    Sold
                  </th>
                  <th className="px-6 py-4 text-left text-gray-400 font-semibold">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-gray-400 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product: any) => {
                  const stockStatus = getStockStatus(product);
                  return (
                    <tr
                      key={product.id}
                      className="border-t border-gray-700 hover:bg-gray-900 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                            onError={handleImageError}
                          />
                          <div>
                            <p className="text-white font-semibold">
                              {product.name}
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              <Star
                                size={14}
                                className="text-amber-400 fill-amber-400"
                                aria-hidden="true"
                              />
                              <span className="text-gray-400 text-sm">
                                {product.rating} ({product.reviews})
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-300 capitalize">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white font-semibold">
                          ₹{product.price.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-sm ${
                            stockStatus.color === "red"
                              ? "text-red-500"
                              : stockStatus.color === "amber"
                              ? "text-amber-500"
                              : "text-green-500"
                          } font-semibold`}
                        >
                          {product.stock} units
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-300">{product.sold}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            product.inStock
                              ? product.stock < 10
                                ? "bg-amber-500 bg-opacity-20 text-amber-500"
                                : "bg-green-500 bg-opacity-20 text-green-500"
                              : "bg-red-500 bg-opacity-20 text-red-500"
                          }`}
                        >
                          {stockStatus.text}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openProductModal(product)}
                            className="p-2 text-blue-400 hover:bg-blue-500 hover:bg-opacity-20 rounded transition-colors"
                            aria-label="Edit product"
                          >
                            <Edit size={18} aria-hidden="true" />
                          </button>
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="p-2 text-red-400 hover:bg-red-500 hover:bg-opacity-20 rounded transition-colors"
                            aria-label="Delete product"
                          >
                            <Trash2 size={18} aria-hidden="true" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Package
                size={48}
                className="text-gray-600 mx-auto mb-4"
                aria-hidden="true"
              />
              <p className="text-gray-400">No products found</p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-2 text-amber-400 hover:underline text-sm"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Orders Page
  const OrdersPage = () => {
    const filteredOrders = orders.filter(
      (o) =>
        (o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          o.id.toString().includes(searchQuery)) &&
        (filterStatus === "all" || o.status === filterStatus)
    );

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
                  {/* Dynamic status buttons based on current status */}
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

  // Customers Page
  const CustomersPage = () => {
    const filteredCustomers = customers.filter(
      (c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone.includes(searchQuery)
    );

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
              placeholder="Search customers by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none"
              aria-label="Search customers"
            />
          </div>
          <button
            onClick={() => exportData("customers")}
            className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition flex items-center gap-2 whitespace-nowrap"
          >
            <Download size={20} aria-hidden="true" /> Export
          </button>
        </div>

        {/* Customers Table */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-400 font-semibold">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-gray-400 font-semibold">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-gray-400 font-semibold">
                    Orders
                  </th>
                  <th className="px-6 py-4 text-left text-gray-400 font-semibold">
                    Total Spent
                  </th>
                  <th className="px-6 py-4 text-left text-gray-400 font-semibold">
                    Joined
                  </th>
                  <th className="px-6 py-4 text-left text-gray-400 font-semibold">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-gray-400 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-t border-gray-700 hover:bg-gray-900 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">
                            {customer.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-semibold">
                            {customer.name}
                          </p>
                          <p className="text-gray-400 text-sm">
                            ID: {customer.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-300 text-sm">{customer.email}</p>
                      <p className="text-gray-400 text-sm">{customer.phone}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white font-semibold">
                        {customer.orders}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white font-semibold">
                        ₹{customer.totalSpent.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-300">{customer.joined}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          customer.status === "VIP"
                            ? "bg-amber-500 bg-opacity-20 text-amber-500"
                            : customer.status === "Active"
                            ? "bg-green-500 bg-opacity-20 text-green-500"
                            : "bg-blue-500 bg-opacity-20 text-blue-500"
                        }`}
                      >
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => viewCustomerDetails(customer)}
                          className="p-2 text-blue-400 hover:bg-blue-500 hover:bg-opacity-20 rounded transition-colors"
                          aria-label="View customer details"
                        >
                          <Eye size={18} aria-hidden="true" />
                        </button>
                        <button
                          onClick={() => sendEmailToCustomer(customer)}
                          className="p-2 text-amber-400 hover:bg-amber-500 hover:bg-opacity-20 rounded transition-colors"
                          aria-label="Send email to customer"
                        >
                          <Mail size={18} aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredCustomers.length === 0 && (
            <div className="text-center py-12">
              <Users
                size={48}
                className="text-gray-600 mx-auto mb-4"
                aria-hidden="true"
              />
              <p className="text-gray-400">No customers found</p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-2 text-amber-400 hover:underline text-sm"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Analytics Page
  const AnalyticsPage = () => {
    const monthlyRevenue = [45000, 52000, 48000, 61000, 58000, 67000];
    const months = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];

    return (
      <div>
        {/* Revenue Chart */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-6">
            Revenue Overview
          </h2>
          <div className="h-64 flex items-end justify-between gap-2 md:gap-4 overflow-x-auto">
            {monthlyRevenue.map((revenue, idx) => (
              <div
                key={months[idx]}
                className="flex-1 min-w-[60px] md:min-w-0 flex flex-col items-center"
              >
                <div
                  className="w-full bg-amber-500 rounded-t-lg hover:bg-amber-600 transition cursor-pointer"
                  style={{
                    height: `${(revenue / Math.max(...monthlyRevenue)) * 100}%`,
                  }}
                  title={`${months[idx]}: ₹${revenue.toLocaleString()}`}
                ></div>
                <p className="text-gray-400 text-sm mt-2">{months[idx]}</p>
                <p className="text-white text-xs font-semibold">
                  ₹{(revenue / 1000).toFixed(0)}k
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Category Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-bold text-white mb-6">
              Sales by Category
            </h2>
            <div className="space-y-4">
              {[
                { name: "LED Lights", value: 35, color: "bg-blue-500" },
                { name: "Pendant Lights", value: 28, color: "bg-purple-500" },
                { name: "Table Lamps", value: 20, color: "bg-green-500" },
                { name: "Outdoor", value: 12, color: "bg-amber-500" },
                { name: "Wall Lights", value: 5, color: "bg-red-500" },
              ].map((cat) => (
                <div key={cat.name}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">{cat.name}</span>
                    <span className="text-white font-semibold">
                      {cat.value}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`${cat.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${cat.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h2 className="text-xl font-bold text-white mb-6">
              Top Performing Products
            </h2>
            <div className="space-y-4">
              {products
                .sort((a: any, b: any) => b.sold - a.sold)
                .slice(0, 5)
                .map((product: any, idx: any) => (
                  <div key={product.id} className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-white font-bold text-sm">
                        {idx + 1}
                      </span>
                    </div>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded shrink-0"
                      onError={handleImageError}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm truncate">
                        {product.name}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {product.sold} units sold
                      </p>
                    </div>
                    <p className="text-amber-400 font-bold text-sm whitespace-nowrap">
                      ₹{(product.sold * product.price).toLocaleString()}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h3 className="text-gray-400 text-sm mb-2">Average Order Value</h3>
            <p className="text-white text-3xl font-bold mb-2">
              ₹{totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(0) : "0"}
            </p>
            <p className="text-green-500 text-sm">+8.5% from last month</p>
          </div>
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h3 className="text-gray-400 text-sm mb-2">Conversion Rate</h3>
            <p className="text-white text-3xl font-bold mb-2">3.2%</p>
            <p className="text-green-500 text-sm">+0.5% from last month</p>
          </div>
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h3 className="text-gray-400 text-sm mb-2">
              Customer Satisfaction
            </h3>
            <p className="text-white text-3xl font-bold mb-2">4.6/5</p>
            <p className="text-green-500 text-sm">Based on 234 reviews</p>
          </div>
        </div>
      </div>
    );
  };

  // Settings Page
  const SettingsPage = () => {
    const [localSettings, setLocalSettings] = useState(settings);
    const [passwordForm, setPasswordForm] = useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    const handleSettingChange = (key: any, value: any) => {
      setLocalSettings((prev) => ({ ...prev, [key]: value }));
    };

    const handleSaveSettings = () => {
      updateSettings(localSettings);
    };

    const handlePasswordChange = (e: any) => {
      const { name, value } = e.target;
      setPasswordForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdatePassword = () => {
      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        alert("New passwords do not match!");
        return;
      }
      if (passwordForm.newPassword.length < 6) {
        alert("New password must be at least 6 characters long!");
        return;
      }
      alert("Password updated successfully!");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    };

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h2 className="text-xl font-bold text-white mb-6">Store Settings</h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="store-name"
                className="text-gray-400 text-sm block mb-2"
              >
                Store Name
              </label>
              <input
                id="store-name"
                type="text"
                value={localSettings.storeName}
                onChange={(e) =>
                  handleSettingChange("storeName", e.target.value)
                }
                className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="store-email"
                className="text-gray-400 text-sm block mb-2"
              >
                Store Email
              </label>
              <input
                id="store-email"
                type="email"
                value={localSettings.storeEmail}
                onChange={(e) =>
                  handleSettingChange("storeEmail", e.target.value)
                }
                className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="store-phone"
                className="text-gray-400 text-sm block mb-2"
              >
                Store Phone
              </label>
              <input
                id="store-phone"
                type="tel"
                value={localSettings.storePhone}
                onChange={(e) =>
                  handleSettingChange("storePhone", e.target.value)
                }
                className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="store-address"
                className="text-gray-400 text-sm block mb-2"
              >
                Store Address
              </label>
              <textarea
                id="store-address"
                value={localSettings.storeAddress}
                onChange={(e) =>
                  handleSettingChange("storeAddress", e.target.value)
                }
                className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none"
                rows={3}
              />
            </div>
            <button
              onClick={handleSaveSettings}
              className="w-full px-6 py-3 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition"
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h2 className="text-xl font-bold text-white mb-6">
            Shipping Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="free-shipping"
                className="text-gray-400 text-sm block mb-2"
              >
                Free Shipping Threshold (₹)
              </label>
              <input
                id="free-shipping"
                type="number"
                value={localSettings.freeShippingThreshold}
                onChange={(e) =>
                  handleSettingChange(
                    "freeShippingThreshold",
                    parseInt(e.target.value) || 0
                  )
                }
                className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="shipping-cost"
                className="text-gray-400 text-sm block mb-2"
              >
                Standard Shipping Cost (₹)
              </label>
              <input
                id="shipping-cost"
                type="number"
                value={localSettings.standardShippingCost}
                onChange={(e) =>
                  handleSettingChange(
                    "standardShippingCost",
                    parseInt(e.target.value) || 0
                  )
                }
                className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="processing-time"
                className="text-gray-400 text-sm block mb-2"
              >
                Processing Time (days)
              </label>
              <input
                id="processing-time"
                type="text"
                value={localSettings.processingTime}
                onChange={(e) =>
                  handleSettingChange("processingTime", e.target.value)
                }
                className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="delivery-time"
                className="text-gray-400 text-sm block mb-2"
              >
                Delivery Time (days)
              </label>
              <input
                id="delivery-time"
                type="text"
                value={localSettings.deliveryTime}
                onChange={(e) =>
                  handleSettingChange("deliveryTime", e.target.value)
                }
                className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none"
              />
            </div>
            <button
              onClick={handleSaveSettings}
              className="w-full px-6 py-3 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition"
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h2 className="text-xl font-bold text-white mb-6">
            Notification Settings
          </h2>
          <div className="space-y-4">
            {[
              {
                id: "email-orders",
                label: "Email notifications for new orders",
                checked: true,
              },
              {
                id: "email-stock",
                label: "Email notifications for low stock",
                checked: true,
              },
              {
                id: "email-messages",
                label: "Email notifications for customer messages",
                checked: false,
              },
              { id: "daily-sales", label: "Daily sales report", checked: true },
              {
                id: "weekly-analytics",
                label: "Weekly analytics summary",
                checked: false,
              },
            ].map((setting) => (
              <label
                key={setting.id}
                className="flex items-center justify-between cursor-pointer"
              >
                <span className="text-gray-300">{setting.label}</span>
                <input
                  id={setting.id}
                  type="checkbox"
                  defaultChecked={setting.checked}
                  className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-amber-500 focus:ring-amber-500 focus:ring-2"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h2 className="text-xl font-bold text-white mb-6">
            Account Security
          </h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="current-password"
                className="text-gray-400 text-sm block mb-2"
              >
                Current Password
              </label>
              <input
                id="current-password"
                type="password"
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="new-password"
                className="text-gray-400 text-sm block mb-2"
              >
                New Password
              </label>
              <input
                id="new-password"
                type="password"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="text-gray-400 text-sm block mb-2"
              >
                Confirm New Password
              </label>
              <input
                id="confirm-password"
                type="password"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none"
              />
            </div>
            <button
              onClick={handleUpdatePassword}
              className="w-full px-6 py-3 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition"
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Main Render
  return (
    <div className="bg-gray-950 min-h-screen">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        currentPage={currentPage}
        navigate={navigate}
        pendingOrders={pendingOrders}
      />
      <div
        style={{ marginLeft: sidebarOpen ? "256px" : "80px" }}
        className="transition-all duration-300"
      >
        <Header
          sidebarOpen={sidebarOpen}
          currentPage={currentPage}
          notifications={notifications}
        />
        <main className="p-4 lg:p-6 mt-20 lg:mt-24">
          {currentPage === "dashboard" && <DashboardPage />}
          {currentPage === "products" && <ProductsPage />}
          {currentPage === "orders" && <OrdersPage />}
          {currentPage === "customers" && <CustomersPage />}
          {currentPage === "analytics" && <AnalyticsPage />}
          {currentPage === "settings" && <SettingsPage />}
        </main>
      </div>

      {/* Modals */}
      {showModal && (
        <ProductModal
          showModal={showModal}
          setShowModal={setShowModal}
          selectedItem={selectedItem}
          productForm={productForm}
          setProductForm={setProductForm}
          saveProduct={saveProduct}
        />
      )}

      {showOrderModal && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setShowOrderModal(false)}
          onUpdateStatus={updateOrderStatus}
          onDelete={deleteOrder}
        />
      )}
    </div>
  );
};

export default AdminPanel;
