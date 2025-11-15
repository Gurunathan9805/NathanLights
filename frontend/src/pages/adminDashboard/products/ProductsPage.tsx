import React, { useState } from "react";
import { Plus, Search } from "lucide-react";
 

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  sold: number;
  rating: number;
  reviews: number;
  image: string;
  description?: string;
}

interface ProductsPageProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, "id">) => void;
  onUpdateProduct: (id: number, product: Partial<Product>) => void;
  onDeleteProduct: (id: number) => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

const ProductsPage: React.FC<ProductsPageProps> = ({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onSearch,
  searchQuery,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<Omit<Product, "id">>({
    name: "",
    category: "table",
    price: 0,
    stock: 0,
    sold: 0,
    rating: 0,
    reviews: 0,
    image: "",
    description: "",
  });

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setProductForm({
      name: "",
      category: "table",
      price: 0,
      stock: 0,
      sold: 0,
      rating: 0,
      reviews: 0,
      image: "",
      description: "",
    });
    setShowModal(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setProductForm({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      sold: product.sold,
      rating: product.rating,
      reviews: product.reviews,
      image: product.image,
      description: product.description || "",
    });
    setShowModal(true);
  };

  const handleDeleteProduct = (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      onDeleteProduct(id);
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProduct) {
      onUpdateProduct(selectedProduct.id, productForm);
    } else {
      onAddProduct({
        ...productForm,
        sold: 0,
        rating: 0,
        reviews: 0,
      });
    }
    setShowModal(false);
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

export default ProductsPage;
