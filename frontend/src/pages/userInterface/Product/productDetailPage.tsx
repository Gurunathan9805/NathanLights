import { Heart, Star } from "lucide-react";

import productsData from "../../../data/products";
import { useNavigate } from "react-router";
// This is the data structure your component expects for `selectedProduct`
const selectedProduct = {
  id: "prod_123",
  name: "Aurora Borealis Projector Lamp",
  image: "https://example.com/images/aurora-lamp.jpg", // For the <img> tag
  rating: 4.5, // Used for the Star rating logic
  reviews: 148, // Displayed next to stars
  price: 3499, // Displayed as ₹3,499
  description:
    "Experience the magic of the northern lights in your own room. This 3D-printed lamp uses advanced LED technology to create a stunning, realistic aurora effect on your walls and ceiling. Perfect for creating a relaxing atmosphere.",
  inStock: true, // Controls "In Stock" text and "Add to Cart"/"Buy Now" buttons
  category: "lighting", // Used to filter "You May Also Like"
};
const ProductDetailPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <img
              src={selectedProduct?.image}
              alt={selectedProduct?.name}
              className="w-full rounded-lg shadow-2xl"
            />
          </div>
          <div className="text-white">
            <h1 className="text-4xl font-bold text-amber-400 mb-4">
              {selectedProduct.name}
            </h1>
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={
                    i < Math.floor(selectedProduct.rating)
                      ? "text-amber-400 fill-amber-400"
                      : "text-gray-600"
                  }
                />
              ))}
              <span className="text-gray-400 ml-2">
                ({selectedProduct.reviews} reviews)
              </span>
            </div>
            <p className="text-3xl font-bold text-amber-400 mb-6">
              ₹{selectedProduct.price.toLocaleString()}
            </p>
            <p className="text-gray-300 mb-6 text-lg">
              {selectedProduct.description}
            </p>

            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3">Specifications</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Material: 3D Printed PLA, Resin, Wood</li>
                <li>• Power: LED, Energy Efficient</li>
                <li>• Warranty: 2 Years</li>
                <li>• Dimensions: Custom designed</li>
              </ul>
            </div>

            <div className="mb-6">
              {selectedProduct.inStock ? (
                <span className="text-green-400 font-bold">✓ In Stock</span>
              ) : (
                <span className="text-red-400 font-bold">✗ Out of Stock</span>
              )}
            </div>

            <div className="flex gap-4">
              {selectedProduct.inStock && (
                <>
                  <button
                    onClick={() => {
                      //   addToCart(selectedProduct);
                      //   setShowCart(true);
                    }}
                    className="flex-1 bg-amber-500 text-white py-4 rounded-lg font-bold hover:bg-amber-600 transition"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => {
                      //   addToCart(selectedProduct);
                      //   navigate("checkout");
                    }}
                    className="flex-1 bg-green-600 text-white py-4 rounded-lg font-bold hover:bg-green-700 transition"
                  >
                    Buy Now
                  </button>
                </>
              )}
              <button
                // onClick={() => toggleWishlist(selectedProduct)}
                className="px-6 py-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
              >
                <Heart
                  size={24}
                  //   className={
                  //     wishlist.find((i: any) => i.id === selectedProduct?.id)
                  //       ? "text-red-500 fill-red-500"
                  //       : ""
                  //   }
                />
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-amber-400 mb-8">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {productsData
              .filter(
                (p: any) =>
                  p.category === selectedProduct?.category &&
                  p.id !== selectedProduct?.id
              )
              .slice(0, 4)
              .map((product: any) => (
                <div
                  key={product.id}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-white font-bold mb-2">
                      {product.name}
                    </h3>
                    <p className="text-amber-400 font-bold mb-3">
                      ₹{product.price.toLocaleString()}
                    </p>
                    <button
                      onClick={() => navigate("product", product)}
                      className="w-full bg-amber-500 text-white py-2 rounded hover:bg-amber-600 transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
