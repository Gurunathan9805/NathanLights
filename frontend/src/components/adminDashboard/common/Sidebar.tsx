import React from 'react';
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Bell,
} from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  currentPage: string;
  navigate: (page: string) => void;
  pendingOrders: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  currentPage,
  navigate,
  pendingOrders,
}) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', page: 'dashboard' },
    { icon: Package, label: 'Products', page: 'products' },
    { icon: ShoppingCart, label: 'Orders', page: 'orders', badge: pendingOrders },
    { icon: Users, label: 'Customers', page: 'customers' },
    { icon: BarChart3, label: 'Analytics', page: 'analytics' },
    { icon: Settings, label: 'Settings', page: 'settings' },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white transition-all duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center justify-between border-b border-gray-800 px-6">
          <div className="flex items-center">
            <span className="text-xl font-bold">Admin Panel</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-md p-1 text-gray-400 hover:bg-gray-800 hover:text-white lg:hidden"
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-4">
          {menuItems.map((item) => (
            <button
              key={item.page}
              onClick={() => navigate(item.page)}
              className={`flex w-full items-center rounded-md px-4 py-3 text-sm font-medium transition-colors ${
                currentPage === item.page
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className="ml-2 rounded-full bg-red-500 px-2 py-0.5 text-xs font-semibold">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="border-t border-gray-800 p-4">
          <button className="flex w-full items-center rounded-md px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white">
            <LogOut className="mr-3 h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
