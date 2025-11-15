import React from 'react';
import { Bell, Menu, Search } from 'lucide-react';

interface HeaderProps {
  sidebarOpen: boolean;
  currentPage: string;
  notifications: number;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({
  sidebarOpen,
  currentPage,
  notifications,
  toggleSidebar,
}) => {
  const formatPageTitle = (page: string): string => {
    return page
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="mr-2 rounded-md p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">
              {formatPageTitle(currentPage)}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Search..."
              />
            </div>
            <button className="relative rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" />
              {notifications > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                  {notifications}
                </span>
              )}
            </button>
            <div className="flex items-center">
              <img
                className="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Admin user"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
