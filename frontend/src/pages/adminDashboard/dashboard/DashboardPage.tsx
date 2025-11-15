import React from "react";
import {
  ShoppingCart,
  Users,
  Package,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Clock,
} from "lucide-react";
import products from "../../../data/products";

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon }) => (
  <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
    <div className="flex items-center">
      <div className="flex-shrink-0 rounded-md bg-indigo-500 p-3">{icon}</div>
      <div className="ml-5 w-0 flex-1">
        <dt className="truncate text-sm font-medium text-gray-500">{title}</dt>
        <dd className="flex items-baseline">
          <div className="text-2xl font-semibold text-gray-900">{value}</div>
          <div
            className={`ml-2 flex items-baseline text-sm font-semibold ${
              change >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {change >= 0 ? (
              <svg
                className="h-5 w-5 flex-shrink-0 self-center text-green-500"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5 flex-shrink-0 self-center text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 011.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <span className="sr-only">
              {change >= 0 ? "Increased" : "Decreased"} by
            </span>
            {Math.abs(change)}%
          </div>
        </dd>
      </div>
    </div>
  </div>
);

interface DashboardPageProps {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  recentOrders: any[];
  topProducts: any[];
  salesData: any[];
  onViewOrder: (order: any) => void;
  onViewProduct: (product: any) => void;
}

const DashboardPage = ({
  totalSales,
  totalOrders,
  totalProducts,
  totalCustomers,
  recentOrders,
  topProducts,
  salesData,
  onViewOrder,
  onViewProduct,
}: DashboardPageProps) => (
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
          ₹{totalSales.toLocaleString()}
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
            <Package className="text-purple-500" size={24} aria-hidden="true" />
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
            <p className="text-white text-2xl font-bold">{lowStockProducts}</p>
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
          {orders.slice(0, 5).map((order: any) => (
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

export default DashboardPage;
function getStatusColor(status: any) {
    throw new Error("Function not implemented.");
}

