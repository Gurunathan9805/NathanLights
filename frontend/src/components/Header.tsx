import { Heart, Search, ShoppingCart, User } from "lucide-react";
import { useNavigate } from "react-router";
import { useUser } from "../context/UserContext";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  
  return (
    <header className="sticky top-0 z-50 bg-linear-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div onClick={() => navigate("home")} className="cursor-pointer">
            <div className="flex items-center space-x-1">
              <span
                className="text-3xl font-serif italic text-amber-400"
                style={{ fontFamily: "cursive" }}
              >
                Nathan
              </span>
              <span className="text-3xl font-bold text-amber-400 tracking-wider">
                LIGHTS
              </span>
            </div>
            <p className="text-xs text-gray-400 ml-1">Illuminate Your Space</p>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => navigate("home")}
              className="text-gray-300 hover:text-amber-400 transition"
            >
              Home
            </button>
            <button
              onClick={() => navigate("shop")}
              className="text-gray-300 hover:text-amber-400 transition"
            >
              Shop
            </button>
            <button
              onClick={() => navigate("about")}
              className="text-gray-300 hover:text-amber-400 transition"
            >
              About
            </button>
            <button
              onClick={() => navigate("portfolio")}
              className="text-gray-300 hover:text-amber-400 transition"
            >
              Portfolio
            </button>
            <button
              onClick={() => navigate("blog")}
              className="text-gray-300 hover:text-amber-400 transition"
            >
              Blog
            </button>
            <button
              onClick={() => navigate("contact")}
              className="text-gray-300 hover:text-amber-400 transition"
            >
              Contact
            </button>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("search")}
              className="text-gray-300 hover:text-amber-400 transition"
            >
              <Search size={20} />
            </button>
            {user ? (
              <button
                onClick={() => navigate("account")}
                className="text-gray-300 hover:text-amber-400 transition"
              >
                <User size={20} />
              </button>
            ) : (
              <button
                onClick={() => navigate("login")}
                className="text-gray-300 hover:text-amber-400 transition"
              >
                <User size={20} />
              </button>
            )}
            <button
              onClick={() => navigate("wishlist")}
              className="relative text-gray-300 hover:text-amber-400 transition"
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative text-gray-300 hover:text-amber-400 transition"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-300"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-2">
            <button
              onClick={() => navigate("home")}
              className="block w-full text-left py-2 text-gray-300 hover:text-amber-400"
            >
              Home
            </button>
            <button
              onClick={() => navigate("shop")}
              className="block w-full text-left py-2 text-gray-300 hover:text-amber-400"
            >
              Shop
            </button>
            <button
              onClick={() => navigate("about")}
              className="block w-full text-left py-2 text-gray-300 hover:text-amber-400"
            >
              About
            </button>
            <button
              onClick={() => navigate("portfolio")}
              className="block w-full text-left py-2 text-gray-300 hover:text-amber-400"
            >
              Portfolio
            </button>
            <button
              onClick={() => navigate("blog")}
              className="block w-full text-left py-2 text-gray-300 hover:text-amber-400"
            >
              Blog
            </button>
            <button
              onClick={() => navigate("contact")}
              className="block w-full text-left py-2 text-gray-300 hover:text-amber-400"
            >
              Contact
            </button>
          </nav>
        )}
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setShowCart(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-96 bg-gray-900 shadow-2xl p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-amber-400">
                Cart ({cartCount})
              </h2>
              <button
                onClick={() => setShowCart(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            {cart.length === 0 ? (
              <p className="text-gray-400">Your cart is empty</p>
            ) : (
              <>
                {cart.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex gap-4 mb-4 pb-4 border-b border-gray-700"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{item.name}</h3>
                      <p className="text-amber-400">₹{item.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-2 py-1 bg-gray-700 text-white rounded"
                        >
                          -
                        </button>
                        <span className="text-white">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-2 py-1 bg-gray-700 text-white rounded"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto text-red-500 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="mt-6">
                  <div className="flex justify-between text-white text-xl font-bold mb-4">
                    <span>Total:</span>
                    <span className="text-amber-400">
                      ₹{cartTotal.toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setShowCart(false);
                      navigate("checkout");
                    }}
                    className="w-full bg-amber-500 text-white py-3 rounded-lg font-bold hover:bg-amber-600 transition"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
