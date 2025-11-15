import { Search } from "lucide-react";
import productsData from "../../../data/products";
import { useState } from "react";
import { useNavigate } from "react-router";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState<any>("");
  const navigate = useNavigate();
  const searchResults = productsData.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-amber-400 mb-8">
          Search Products
        </h1>

        <div className="mb-8">
          <div className="relative">
            <input
              key="search-input"
              type="text"
              placeholder="Search for lights..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 bg-gray-800 text-white rounded-lg text-lg border-2 border-gray-700 focus:border-amber-500 focus:outline-none cursor-text"
            />
            <Search
              className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              size={24}
            />
          </div>
        </div>

        {searchQuery && (
          <>
            <p className="text-gray-300 mb-6">
              Found {searchResults.length} result
              {searchResults.length !== 1 ? "s" : ""} for "{searchQuery}"
            </p>

            {searchResults.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg mb-4">No products found</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    navigate("shop");
                  }}
                  className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600"
                >
                  Browse All Products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {searchResults.map((product: any) => (
                  <div
                    key={product.id}
                    className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-white font-bold text-lg mb-2">
                        {product.name}
                      </h3>
                      <p className="text-amber-400 text-xl font-bold mb-4">
                        ₹{product.price.toLocaleString()}
                      </p>
                      <button
                        onClick={() => navigate("product", product)}
                        className="w-full bg-amber-500 text-white py-2 rounded hover:bg-amber-600"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
