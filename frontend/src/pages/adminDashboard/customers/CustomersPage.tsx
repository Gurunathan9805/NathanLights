import React from 'react';
import { Search, Download, Mail, Phone, User, ShoppingCart, Eye, Trash2 } from 'lucide-react';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  orders: number;
  totalSpent: number;
  joinedDate: string;
  lastActive: string;
  status: 'active' | 'inactive';
}

interface CustomersPageProps {
  customers: Customer[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  exportData: (type: string) => void;
  onViewCustomer: (customer: Customer) => void;
  onDeleteCustomer: (id: number) => void;
}

const CustomersPage: React.FC<CustomersPageProps> = ({
  customers,
  searchQuery,
  setSearchQuery,
  exportData,
  onViewCustomer,
  onDeleteCustomer,
}) => {
  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery)
  );

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-500 bg-opacity-20 text-green-400' 
      : 'bg-gray-500 bg-opacity-20 text-gray-400';
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
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
                <th className="px-6 py-4 text-right text-gray-400 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredCustomers.map((customer) => (
                <tr 
                  key={customer.id} 
                  className="hover:bg-gray-900/50 transition-colors cursor-pointer"
                  onClick={() => onViewCustomer(customer)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                        <User size={18} className="text-gray-400" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">{customer.name}</p>
                        <p className="text-gray-400 text-sm">ID: {customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <a 
                        href={`mailto:${customer.email}`} 
                        className="text-blue-400 hover:underline flex items-center gap-1 text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Mail size={14} /> {customer.email}
                      </a>
                      <a 
                        href={`tel:${customer.phone}`}
                        className="text-gray-400 hover:text-blue-400 flex items-center gap-1 text-sm mt-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Phone size={14} /> {customer.phone}
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <ShoppingCart size={16} className="text-gray-400" />
                      <span>{customer.orders} orders</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white font-medium">
                    {formatCurrency(customer.totalSpent)}
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">
                    {formatDate(customer.joinedDate)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(customer.status)}`}>
                      {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-full transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewCustomer(customer);
                        }}
                        aria-label="View customer details"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        className="p-2 text-red-400 hover:bg-red-500/20 rounded-full transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`Are you sure you want to delete ${customer.name}?`)) {
                            onDeleteCustomer(customer.id);
                          }
                        }}
                        aria-label="Delete customer"
                      >
                        <Trash2 size={18} />
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
            <User size={48} className="text-gray-600 mx-auto mb-4" />
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

export default CustomersPage;
