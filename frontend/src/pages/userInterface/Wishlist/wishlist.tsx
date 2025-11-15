import { useNavigate } from "react-router";
import {
  useAppSelector,
  useAppDispatch,
  type RootState,
} from "../../../store/store";
import { Heart } from "lucide-react";
import { toggleWishlist } from "../../../store/slices/wishlistSlice";
import { addToCart } from "../../../store/slices/cartSlice";
const WishlistPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items: wishlist } = useAppSelector(
    (state: RootState) => state.wishlist
  );

  const handleToggleWishlist = (product: any) => {
    dispatch(toggleWishlist(product));
  };
  const handleAddToCart = (product: any) => {
    dispatch(
      addToCart({
        ...product,
        quantity: 1,
        id: product.id.toString(), // Ensure ID is a string if needed
        name: product.name,
        price: product.price,
        image: product.image,
        stock: product.inStock ? 10 : 0,
      })
    );
  };
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-amber-400 mb-8">
          My Wishlist ({wishlist.length})
        </h1>
        {wishlist.length === 0 ? (
          <div className="bg-gray-800 p-12 rounded-lg text-center">
            <Heart size={64} className="text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg mb-4">Your wishlist is empty</p>
            <button
              onClick={() => navigate("shop")}
              className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {wishlist.map((product: any) => (
              <div
                key={product.id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <button
                    onClick={() => handleToggleWishlist(product)}
                    className="absolute top-4 right-4 bg-white rounded-full p-2"
                  >
                    <Heart size={20} className="text-red-500 fill-red-500" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-bold text-lg mb-2">
                    {product.name}
                  </h3>
                  <p className="text-amber-400 text-xl font-bold mb-4">
                    ₹{product.price.toLocaleString()}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate("product", product)}
                      className="flex-1 bg-gray-700 text-white py-2 rounded hover:bg-gray-600"
                    >
                      View
                    </button>
                    {product.inStock && (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 bg-amber-500 text-white py-2 rounded hover:bg-amber-600"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
