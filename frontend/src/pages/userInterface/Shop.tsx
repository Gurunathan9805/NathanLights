import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ProductCard } from "../../components/userInterface/ProductCard";
import { ChevronDown, Filter } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProducts } from "../../store/slices/productsSlice";
import { addToCart as addToCartAction } from "../../store/slices/cartSlice";
import {
  addToWishlistThunk,
  removeFromWishlistThunk,
} from "../../store/slices/wishlistSlice";
import type { Product } from "../../types";

const Shop = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Get products from Redux store with proper typing and default to empty array
  const { items: products = [], status } = useAppSelector((state) => state.products);
  const { items: wishlist = [] } = useAppSelector((state) => state.wishlist);
  // Local state
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  // Fetch products on component mount
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // Loading and error states
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-2xl">Loading products...</div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-red-500">Error loading products</div>
      </div>
    );
  }

  const categories = ["all", "table", "pendant", "wall", "led", "outdoor"];
  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "rating", label: "Avg. Rating" },
    { value: "newest", label: "Newest" },
  ];

  // Filter and sort products with null checks
  const filteredProducts = Array.isArray(products) 
    ? products.filter((product) => {
        if (!product || !product.name) return false;
        
        const searchLower = searchQuery.toLowerCase();
        const nameLower = product.name.toLowerCase();
        const matchesSearch = nameLower.includes(searchLower);
        const matchesCategory = 
          categoryFilter === "all" || product.category === categoryFilter;
        return matchesSearch && matchesCategory;
      })
    : [];

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!a || !b) return 0;
    
    const aRating = a.rating ?? 0;
    const bRating = b.rating ?? 0;

    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating":
        return bRating - aRating;
      case "newest":
        if (!a.createdAt && !b.createdAt) return 0;
        if (!a.createdAt) return 1;
        if (!b.createdAt) return -1;
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      default:
        return 0;
    }
  });

  const handleAddToCart = (product: Product) => {
    dispatch(
      addToCartAction({
        ...product,
        quantity: 1,
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        image: product.image,
        stock: product.inStock ? 10 : 0,
      })
    );
  };

  const handleToggleWishlist = (product: Product) => {
    const isInWishlist = wishlist.some(
      (item: Product) => item.id === product.id
    );
    if (isInWishlist) {
      dispatch(removeFromWishlistThunk(product.id.toString()));
    } else {
      dispatch(addToWishlistThunk(product.id.toString()));
    }
  };

  const handleViewDetails = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header with search and filters */}
      <div className="bg-gray-800 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Shop</h1>

          {/* Search and filter bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-gray-700 text-white px-4 py-2 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
              >
                <Filter size={18} />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Category filters */}
          {showFilters && (
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setCategoryFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    categoryFilter === category
                      ? "bg-amber-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Products grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={handleViewDetails}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                isInWishlist={wishlist.some((item) => item.id === product.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-300 mb-2">
              No products found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
