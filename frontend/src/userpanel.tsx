import { useState, useCallback } from "react";
import {
  ShoppingCart,
  User,
  Search,
  Menu,
  X,
  Heart,
  Star,
  ChevronRight,
  Package,
  Truck,
  Shield,
  Award,
} from "lucide-react";
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  inStock: boolean;
}
// Sample product data
const productsData = [
  {
    id: 1,
    name: "Aurora Table Lamp",
    category: "table",
    price: 4999,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400",
    rating: 4.5,
    reviews: 23,
    description: "Elegant 3D printed table lamp with resin accents",
    inStock: true,
  },
  {
    id: 2,
    name: "Nordic Pendant Light",
    category: "pendant",
    price: 7999,
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400",
    rating: 5,
    reviews: 45,
    description: "Modern pendant light with wooden finish",
    inStock: true,
  },
  {
    id: 3,
    name: "Minimalist Wall Sconce",
    category: "wall",
    price: 3499,
    image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=400",
    rating: 4,
    reviews: 18,
    description: "Sleek wall-mounted lighting solution",
    inStock: true,
  },
  {
    id: 4,
    name: "LED Strip Kit",
    category: "led",
    price: 2999,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    rating: 4.5,
    reviews: 67,
    description: "Customizable RGB LED strip lighting",
    inStock: true,
  },
  {
    id: 5,
    name: "Garden Path Light",
    category: "outdoor",
    price: 5499,
    image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=400",
    rating: 4.5,
    reviews: 34,
    description: "Weather-resistant outdoor lighting",
    inStock: true,
  },
  {
    id: 6,
    name: "Crystal Chandelier",
    category: "pendant",
    price: 12999,
    image: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=400",
    rating: 5,
    reviews: 89,
    description: "Luxury resin crystal pendant",
    inStock: true,
  },
  {
    id: 7,
    name: "Desk Reading Lamp",
    category: "table",
    price: 3999,
    image: "https://images.unsplash.com/photo-1550985616-10810253b84d?w=400",
    rating: 4,
    reviews: 56,
    description: "Adjustable reading lamp with USB port",
    inStock: false,
  },
  {
    id: 8,
    name: "Smart LED Bulb",
    category: "led",
    price: 1499,
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400",
    rating: 4.5,
    reviews: 123,
    description: "WiFi-enabled smart bulb",
    inStock: true,
  },
];

const UserPanel = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [cart, setCart] = useState<any>([]);
  const [wishlist, setWishlist] = useState<any>([]);
  const [user, setUser] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showCart, setShowCart] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<any>("");
  const [categoryFilter, setCategoryFilter] = useState<any>("all");
  const [orders, setOrders] = useState<any>([]);
  const [checkoutData, setCheckoutData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const handleInputChange = useCallback((field: any, value: any) => {
    setCheckoutData((prev: any) => ({ ...prev, [field]: value }));
  }, []);

  // Navigation
  const navigate = useCallback((page: string, data: Product | null = null) => {
    setCurrentPage(page);
    if (data) setSelectedProduct(data);
    setMobileMenuOpen(false);
  }, []);

  // Cart functions
  const addToCart = useCallback(
    (product: any) => {
      const existing = cart.find((item: any) => item.id === product.id);
      if (existing) {
        setCart(
          cart.map((item: any) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        setCart([...cart, { ...product, quantity: 1 }]);
      }
    },
    [cart]
  );

  const removeFromCart = useCallback(
    (productId: any) => {
      setCart(cart.filter((item: any) => item.id !== productId));
    },
    [cart]
  );

  const updateQuantity = useCallback(
    (productId: any, quantity: any) => {
      if (quantity < 1) return;
      setCart(
        cart.map((item: any) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    },
    [cart]
  );

  const toggleWishlist = useCallback(
    (product: any) => {
      if (wishlist.find((item: any) => item.id === product.id)) {
        setWishlist(wishlist.filter((item: any) => item.id !== product.id));
      } else {
        setWishlist([...wishlist, product]);
      }
    },
    [wishlist]
  );

  const cartTotal = cart.reduce(
    (sum: any, item: any) => sum + item.price * item.quantity,
    0
  );
  const cartCount = cart.reduce(
    (sum: any, item: any) => sum + item.quantity,
    0
  );

  // Filtered products
  const filteredProducts = productsData.filter((p: any) => {
    const matchesCategory =
      categoryFilter === "all" || p.category === categoryFilter;
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Header Component
  // const Header = () => (
  //   <header className="sticky top-0 z-50 bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg border-b border-gray-700">
  //     <div className="max-w-7xl mx-auto px-4 py-4">
  //       <div className="flex items-center justify-between">
  //         {/* Logo */}
  //         <div onClick={() => navigate("home")} className="cursor-pointer">
  //           <div className="flex items-center space-x-1">
  //             <span
  //               className="text-3xl font-serif italic text-amber-400"
  //               style={{ fontFamily: "cursive" }}
  //             >
  //               Nathan
  //             </span>
  //             <span className="text-3xl font-bold text-amber-400 tracking-wider">
  //               LIGHTS
  //             </span>
  //           </div>
  //           <p className="text-xs text-gray-400 ml-1">Illuminate Your Space</p>
  //         </div>

  //         {/* Desktop Navigation */}
  //         <nav className="hidden md:flex items-center space-x-8">
  //           <button
  //             onClick={() => navigate("home")}
  //             className="text-gray-300 hover:text-amber-400 transition"
  //           >
  //             Home
  //           </button>
  //           <button
  //             onClick={() => navigate("shop")}
  //             className="text-gray-300 hover:text-amber-400 transition"
  //           >
  //             Shop
  //           </button>
  //           <button
  //             onClick={() => navigate("about")}
  //             className="text-gray-300 hover:text-amber-400 transition"
  //           >
  //             About
  //           </button>
  //           <button
  //             onClick={() => navigate("portfolio")}
  //             className="text-gray-300 hover:text-amber-400 transition"
  //           >
  //             Portfolio
  //           </button>
  //           <button
  //             onClick={() => navigate("blog")}
  //             className="text-gray-300 hover:text-amber-400 transition"
  //           >
  //             Blog
  //           </button>
  //           <button
  //             onClick={() => navigate("contact")}
  //             className="text-gray-300 hover:text-amber-400 transition"
  //           >
  //             Contact
  //           </button>
  //         </nav>

  //         {/* Icons */}
  //         <div className="flex items-center space-x-4">
  //           <button
  //             onClick={() => navigate("search")}
  //             className="text-gray-300 hover:text-amber-400 transition"
  //           >
  //             <Search size={20} />
  //           </button>
  //           {user ? (
  //             <button
  //               onClick={() => navigate("account")}
  //               className="text-gray-300 hover:text-amber-400 transition"
  //             >
  //               <User size={20} />
  //             </button>
  //           ) : (
  //             <button
  //               onClick={() => navigate("login")}
  //               className="text-gray-300 hover:text-amber-400 transition"
  //             >
  //               <User size={20} />
  //             </button>
  //           )}
  //           <button
  //             onClick={() => navigate("wishlist")}
  //             className="relative text-gray-300 hover:text-amber-400 transition"
  //           >
  //             <Heart size={20} />
  //             {wishlist.length > 0 && (
  //               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
  //                 {wishlist.length}
  //               </span>
  //             )}
  //           </button>
  //           <button
  //             onClick={() => setShowCart(!showCart)}
  //             className="relative text-gray-300 hover:text-amber-400 transition"
  //           >
  //             <ShoppingCart size={20} />
  //             {cartCount > 0 && (
  //               <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
  //                 {cartCount}
  //               </span>
  //             )}
  //           </button>
  //           <button
  //             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  //             className="md:hidden text-gray-300"
  //           >
  //             {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
  //           </button>
  //         </div>
  //       </div>

  //       {/* Mobile Menu */}
  //       {mobileMenuOpen && (
  //         <nav className="md:hidden mt-4 pb-4 space-y-2">
  //           <button
  //             onClick={() => navigate("home")}
  //             className="block w-full text-left py-2 text-gray-300 hover:text-amber-400"
  //           >
  //             Home
  //           </button>
  //           <button
  //             onClick={() => navigate("shop")}
  //             className="block w-full text-left py-2 text-gray-300 hover:text-amber-400"
  //           >
  //             Shop
  //           </button>
  //           <button
  //             onClick={() => navigate("about")}
  //             className="block w-full text-left py-2 text-gray-300 hover:text-amber-400"
  //           >
  //             About
  //           </button>
  //           <button
  //             onClick={() => navigate("portfolio")}
  //             className="block w-full text-left py-2 text-gray-300 hover:text-amber-400"
  //           >
  //             Portfolio
  //           </button>
  //           <button
  //             onClick={() => navigate("blog")}
  //             className="block w-full text-left py-2 text-gray-300 hover:text-amber-400"
  //           >
  //             Blog
  //           </button>
  //           <button
  //             onClick={() => navigate("contact")}
  //             className="block w-full text-left py-2 text-gray-300 hover:text-amber-400"
  //           >
  //             Contact
  //           </button>
  //         </nav>
  //       )}
  //     </div>

  //     {/* Cart Sidebar */}
  //     {showCart && (
  //       <div
  //         className="fixed inset-0 bg-black bg-opacity-50 z-50"
  //         onClick={() => setShowCart(false)}
  //       >
  //         <div
  //           className="absolute right-0 top-0 h-full w-96 bg-gray-900 shadow-2xl p-6 overflow-y-auto"
  //           onClick={(e) => e.stopPropagation()}
  //         >
  //           <div className="flex justify-between items-center mb-6">
  //             <h2 className="text-2xl font-bold text-amber-400">
  //               Cart ({cartCount})
  //             </h2>
  //             <button
  //               onClick={() => setShowCart(false)}
  //               className="text-gray-400 hover:text-white"
  //             >
  //               <X size={24} />
  //             </button>
  //           </div>
  //           {cart.length === 0 ? (
  //             <p className="text-gray-400">Your cart is empty</p>
  //           ) : (
  //             <>
  //               {cart.map((item: any) => (
  //                 <div
  //                   key={item.id}
  //                   className="flex gap-4 mb-4 pb-4 border-b border-gray-700"
  //                 >
  //                   <img
  //                     src={item.image}
  //                     alt={item.name}
  //                     className="w-20 h-20 object-cover rounded"
  //                   />
  //                   <div className="flex-1">
  //                     <h3 className="text-white font-semibold">{item.name}</h3>
  //                     <p className="text-amber-400">₹{item.price}</p>
  //                     <div className="flex items-center gap-2 mt-2">
  //                       <button
  //                         onClick={() =>
  //                           updateQuantity(item.id, item.quantity - 1)
  //                         }
  //                         className="px-2 py-1 bg-gray-700 text-white rounded"
  //                       >
  //                         -
  //                       </button>
  //                       <span className="text-white">{item.quantity}</span>
  //                       <button
  //                         onClick={() =>
  //                           updateQuantity(item.id, item.quantity + 1)
  //                         }
  //                         className="px-2 py-1 bg-gray-700 text-white rounded"
  //                       >
  //                         +
  //                       </button>
  //                       <button
  //                         onClick={() => removeFromCart(item.id)}
  //                         className="ml-auto text-red-500 text-sm"
  //                       >
  //                         Remove
  //                       </button>
  //                     </div>
  //                   </div>
  //                 </div>
  //               ))}
  //               <div className="mt-6">
  //                 <div className="flex justify-between text-white text-xl font-bold mb-4">
  //                   <span>Total:</span>
  //                   <span className="text-amber-400">
  //                     ₹{cartTotal.toLocaleString()}
  //                   </span>
  //                 </div>
  //                 <button
  //                   onClick={() => {
  //                     setShowCart(false);
  //                     navigate("checkout");
  //                   }}
  //                   className="w-full bg-amber-500 text-white py-3 rounded-lg font-bold hover:bg-amber-600 transition"
  //                 >
  //                   Proceed to Checkout
  //                 </button>
  //               </div>
  //             </>
  //           )}
  //         </div>
  //       </div>
  //     )}
  //   </header>
  // );

  // Home Page
  // const HomePage = () => (
  //   <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-gray-900">
  //     {/* Hero Banner */}
  //     <div
  //       className="relative h-screen bg-cover bg-center"
  //       style={{
  //         backgroundImage:
  //           "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1200)",
  //       }}
  //     >
  //       <div className="absolute inset-0 bg-linear-gradient-radial from-transparent via-teal-900/20 to-transparent"></div>
  //       <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
  //         <div className="text-white max-w-2xl">
  //           <h1 className="text-6xl font-bold mb-4">
  //             <span
  //               className="text-amber-400 font-serif italic"
  //               style={{ fontFamily: "cursive" }}
  //             >
  //               Nathan
  //             </span>
  //             <span className="text-amber-400"> LIGHTS</span>
  //           </h1>
  //           <p className="text-3xl mb-8">Illuminate Your Space with Artistry</p>
  //           <p className="text-xl mb-8 text-gray-300">
  //             Handcrafted 3D printed lighting solutions with premium resin and
  //             wood finishes
  //           </p>
  //           <button
  //             onClick={() => navigate("shop")}
  //             className="bg-amber-500 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-amber-600 transition transform hover:scale-105"
  //           >
  //             Shop Now <ChevronRight className="inline" />
  //           </button>
  //         </div>
  //       </div>
  //     </div>

  //     {/* Featured Products */}
  //     <div className="max-w-7xl mx-auto px-4 py-16">
  //       <h2 className="text-4xl font-bold text-center text-amber-400 mb-12">
  //         Featured Products
  //       </h2>
  //       <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
  //         {productsData.slice(0, 4).map((product: any) => (
  //           <div
  //             key={product.id}
  //             className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:scale-105"
  //           >
  //             <img
  //               src={product.image}
  //               alt={product.name}
  //               className="w-full h-64 object-cover"
  //             />
  //             <div className="p-4">
  //               <h3 className="text-white font-bold text-lg mb-2">
  //                 {product.name}
  //               </h3>
  //               <div className="flex items-center mb-2">
  //                 {[...Array(5)].map((_, i) => (
  //                   <Star
  //                     key={i}
  //                     size={16}
  //                     className={
  //                       i < Math.floor(product.rating)
  //                         ? "text-amber-400 fill-amber-400"
  //                         : "text-gray-600"
  //                     }
  //                   />
  //                 ))}
  //                 <span className="text-gray-400 text-sm ml-2">
  //                   ({product.reviews})
  //                 </span>
  //               </div>
  //               <p className="text-amber-400 text-xl font-bold mb-4">
  //                 ₹{product.price.toLocaleString()}
  //               </p>
  //               <button
  //                 onClick={() => navigate("product", product)}
  //                 className="w-full bg-amber-500 text-white py-2 rounded hover:bg-amber-600 transition"
  //               >
  //                 View Details
  //               </button>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>

  //     {/* Why Nathan Lights */}
  //     <div className="bg-linear-to-r from-gray-800 to-gray-900 py-16">
  //       <div className="max-w-7xl mx-auto px-4">
  //         <h2 className="text-4xl font-bold text-center text-amber-400 mb-12">
  //           Why Choose Nathan Lights
  //         </h2>
  //         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
  //           <div className="text-center">
  //             <Award className="text-amber-400 mx-auto mb-4" size={48} />
  //             <h3 className="text-white font-bold text-xl mb-2">
  //               Premium Quality
  //             </h3>
  //             <p className="text-gray-400">
  //               Handcrafted with precision using the finest materials
  //             </p>
  //           </div>
  //           <div className="text-center">
  //             <Package className="text-amber-400 mx-auto mb-4" size={48} />
  //             <h3 className="text-white font-bold text-xl mb-2">
  //               Innovative Design
  //             </h3>
  //             <p className="text-gray-400">
  //               Unique 3D printed designs you won't find anywhere else
  //             </p>
  //           </div>
  //           <div className="text-center">
  //             <Shield className="text-amber-400 mx-auto mb-4" size={48} />
  //             <h3 className="text-white font-bold text-xl mb-2">
  //               Quality Assured
  //             </h3>
  //             <p className="text-gray-400">2-year warranty on all products</p>
  //           </div>
  //           <div className="text-center">
  //             <Truck className="text-amber-400 mx-auto mb-4" size={48} />
  //             <h3 className="text-white font-bold text-xl mb-2">
  //               Fast Delivery
  //             </h3>
  //             <p className="text-gray-400">
  //               Free shipping on orders above ₹5000
  //             </p>
  //           </div>
  //         </div>
  //       </div>
  //     </div>

  //     {/* Testimonials */}
  //     <div className="max-w-7xl mx-auto px-4 py-16">
  //       <h2 className="text-4xl font-bold text-center text-amber-400 mb-12">
  //         What Our Customers Say
  //       </h2>
  //       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  //         {[
  //           {
  //             name: "Priya Sharma",
  //             text: "The quality is exceptional! The Nordic Pendant Light transformed my dining room.",
  //             rating: 5,
  //           },
  //           {
  //             name: "Rahul Mehta",
  //             text: "Fantastic designs and excellent customer service. Highly recommend!",
  //             rating: 5,
  //           },
  //           {
  //             name: "Anjali Patel",
  //             text: "Beautiful craftsmanship. The attention to detail is outstanding.",
  //             rating: 5,
  //           },
  //         ].map((testimonial, idx) => (
  //           <div key={idx} className="bg-gray-800 p-6 rounded-lg shadow-lg">
  //             <div className="flex mb-2">
  //               {[...Array(testimonial.rating)].map((_, i) => (
  //                 <Star
  //                   key={i}
  //                   size={16}
  //                   className="text-amber-400 fill-amber-400"
  //                 />
  //               ))}
  //             </div>
  //             <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
  //             <p className="text-amber-400 font-bold">{testimonial.name}</p>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );

  // Shop Page
  // const ShopPage = () => (
  //   <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 py-16">
  //     <div className="max-w-7xl mx-auto px-4">
  //       <h1 className="text-4xl font-bold text-amber-400 mb-8">
  //         Shop All Products
  //       </h1>

  //       {/* Filters */}
  //       <div className="mb-8 flex flex-wrap gap-4">
  //         <button
  //           onClick={() => setCategoryFilter("all")}
  //           className={`px-6 py-2 rounded-lg ${
  //             categoryFilter === "all"
  //               ? "bg-amber-500 text-white"
  //               : "bg-gray-700 text-gray-300"
  //           }`}
  //         >
  //           All
  //         </button>
  //         <button
  //           onClick={() => setCategoryFilter("table")}
  //           className={`px-6 py-2 rounded-lg ${
  //             categoryFilter === "table"
  //               ? "bg-amber-500 text-white"
  //               : "bg-gray-700 text-gray-300"
  //           }`}
  //         >
  //           Table Lamps
  //         </button>
  //         <button
  //           onClick={() => setCategoryFilter("pendant")}
  //           className={`px-6 py-2 rounded-lg ${
  //             categoryFilter === "pendant"
  //               ? "bg-amber-500 text-white"
  //               : "bg-gray-700 text-gray-300"
  //           }`}
  //         >
  //           Pendant Lights
  //         </button>
  //         <button
  //           onClick={() => setCategoryFilter("wall")}
  //           className={`px-6 py-2 rounded-lg ${
  //             categoryFilter === "wall"
  //               ? "bg-amber-500 text-white"
  //               : "bg-gray-700 text-gray-300"
  //           }`}
  //         >
  //           Wall Lights
  //         </button>
  //         <button
  //           onClick={() => setCategoryFilter("led")}
  //           className={`px-6 py-2 rounded-lg ${
  //             categoryFilter === "led"
  //               ? "bg-amber-500 text-white"
  //               : "bg-gray-700 text-gray-300"
  //           }`}
  //         >
  //           LED
  //         </button>
  //         <button
  //           onClick={() => setCategoryFilter("outdoor")}
  //           className={`px-6 py-2 rounded-lg ${
  //             categoryFilter === "outdoor"
  //               ? "bg-amber-500 text-white"
  //               : "bg-gray-700 text-gray-300"
  //           }`}
  //         >
  //           Outdoor
  //         </button>
  //       </div>

  //       {/* Products Grid */}
  //       <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
  //         {filteredProducts.map((product) => (
  //           <div
  //             key={product.id}
  //             className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:scale-105"
  //           >
  //             <div className="relative">
  //               <img
  //                 src={product.image}
  //                 alt={product.name}
  //                 className="w-full h-64 object-cover"
  //               />
  //               <button
  //                 onClick={() => toggleWishlist(product)}
  //                 className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition"
  //               >
  //                 <Heart
  //                   size={20}
  //                   className={
  //                     wishlist.find((i: any) => i.id === product.id)
  //                       ? "text-red-500 fill-red-500"
  //                       : "text-gray-600"
  //                   }
  //                 />
  //               </button>
  //               {!product.inStock && (
  //                 <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
  //                   <span className="text-white font-bold text-lg">
  //                     Out of Stock
  //                   </span>
  //                 </div>
  //               )}
  //             </div>
  //             <div className="p-4">
  //               <h3 className="text-white font-bold text-lg mb-2">
  //                 {product.name}
  //               </h3>
  //               <div className="flex items-center mb-2">
  //                 {[...Array(5)].map((_, i) => (
  //                   <Star
  //                     key={i}
  //                     size={16}
  //                     className={
  //                       i < Math.floor(product.rating)
  //                         ? "text-amber-400 fill-amber-400"
  //                         : "text-gray-600"
  //                     }
  //                   />
  //                 ))}
  //                 <span className="text-gray-400 text-sm ml-2">
  //                   ({product.reviews})
  //                 </span>
  //               </div>
  //               <p className="text-amber-400 text-xl font-bold mb-4">
  //                 ₹{product.price.toLocaleString()}
  //               </p>
  //               <div className="flex gap-2">
  //                 <button
  //                   onClick={() => navigate("product", product)}
  //                   className="flex-1 bg-gray-700 text-white py-2 rounded hover:bg-gray-600 transition"
  //                 >
  //                   View
  //                 </button>
  //                 {product.inStock && (
  //                   <button
  //                     onClick={() => addToCart(product)}
  //                     className="flex-1 bg-amber-500 text-white py-2 rounded hover:bg-amber-600 transition"
  //                   >
  //                     Add to Cart
  //                   </button>
  //                 )}
  //               </div>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );

  // Product Detail Page
  // const ProductDetailPage = () => (
  //   <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 py-16">
  //     <div className="max-w-7xl mx-auto px-4">
  //       <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
  //         <div>
  //           <img
  //             src={selectedProduct?.image}
  //             alt={selectedProduct?.name}
  //             className="w-full rounded-lg shadow-2xl"
  //           />
  //         </div>
  //         <div className="text-white">
  //           <h1 className="text-4xl font-bold text-amber-400 mb-4">
  //             {selectedProduct.name}
  //           </h1>
  //           <div className="flex items-center mb-4">
  //             {[...Array(5)].map((_, i) => (
  //               <Star
  //                 key={i}
  //                 size={20}
  //                 className={
  //                   i < Math.floor(selectedProduct.rating)
  //                     ? "text-amber-400 fill-amber-400"
  //                     : "text-gray-600"
  //                 }
  //               />
  //             ))}
  //             <span className="text-gray-400 ml-2">
  //               ({selectedProduct.reviews} reviews)
  //             </span>
  //           </div>
  //           <p className="text-3xl font-bold text-amber-400 mb-6">
  //             ₹{selectedProduct.price.toLocaleString()}
  //           </p>
  //           <p className="text-gray-300 mb-6 text-lg">
  //             {selectedProduct.description}
  //           </p>

  //           <div className="mb-6">
  //             <h3 className="text-xl font-bold mb-3">Specifications</h3>
  //             <ul className="space-y-2 text-gray-300">
  //               <li>• Material: 3D Printed PLA, Resin, Wood</li>
  //               <li>• Power: LED, Energy Efficient</li>
  //               <li>• Warranty: 2 Years</li>
  //               <li>• Dimensions: Custom designed</li>
  //             </ul>
  //           </div>

  //           <div className="mb-6">
  //             {selectedProduct.inStock ? (
  //               <span className="text-green-400 font-bold">✓ In Stock</span>
  //             ) : (
  //               <span className="text-red-400 font-bold">✗ Out of Stock</span>
  //             )}
  //           </div>

  //           <div className="flex gap-4">
  //             {selectedProduct.inStock && (
  //               <>
  //                 <button
  //                   onClick={() => {
  //                     addToCart(selectedProduct);
  //                     setShowCart(true);
  //                   }}
  //                   className="flex-1 bg-amber-500 text-white py-4 rounded-lg font-bold hover:bg-amber-600 transition"
  //                 >
  //                   Add to Cart
  //                 </button>
  //                 <button
  //                   onClick={() => {
  //                     addToCart(selectedProduct);
  //                     navigate("checkout");
  //                   }}
  //                   className="flex-1 bg-green-600 text-white py-4 rounded-lg font-bold hover:bg-green-700 transition"
  //                 >
  //                   Buy Now
  //                 </button>
  //               </>
  //             )}
  //             <button
  //               onClick={() => toggleWishlist(selectedProduct)}
  //               className="px-6 py-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
  //             >
  //               <Heart
  //                 size={24}
  //                 className={
  //                   wishlist.find((i: any) => i.id === selectedProduct?.id)
  //                     ? "text-red-500 fill-red-500"
  //                     : ""
  //                 }
  //               />
  //             </button>
  //           </div>
  //         </div>
  //       </div>

  //       {/* Related Products */}
  //       <div className="mt-16">
  //         <h2 className="text-3xl font-bold text-amber-400 mb-8">
  //           You May Also Like
  //         </h2>
  //         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
  //           {productsData
  //             .filter(
  //               (p: any) =>
  //                 p.category === selectedProduct?.category &&
  //                 p.id !== selectedProduct?.id
  //             )
  //             .slice(0, 4)
  //             .map((product: any) => (
  //               <div
  //                 key={product.id}
  //                 className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition"
  //               >
  //                 <img
  //                   src={product.image}
  //                   alt={product.name}
  //                   className="w-full h-48 object-cover"
  //                 />
  //                 <div className="p-4">
  //                   <h3 className="text-white font-bold mb-2">
  //                     {product.name}
  //                   </h3>
  //                   <p className="text-amber-400 font-bold mb-3">
  //                     ₹{product.price.toLocaleString()}
  //                   </p>
  //                   <button
  //                     onClick={() => navigate("product", product)}
  //                     className="w-full bg-amber-500 text-white py-2 rounded hover:bg-amber-600 transition"
  //                   >
  //                     View Details
  //                   </button>
  //                 </div>
  //               </div>
  //             ))}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  // Checkout Page
  // const CheckoutPage = () => {
  //   const [paymentMethod, setPaymentMethod] = useState("upi");
  //   const [showPaymentPage, setShowPaymentPage] = useState(false);
  //   const [upiId, setUpiId] = useState("");
  //   const [cardDetails, setCardDetails] = useState({
  //     number: "",
  //     name: "",
  //     expiry: "",
  //     cvv: "",
  //   });

  //   const handleCheckout = (e: any) => {
  //     e.preventDefault();
  //     if (cart.length === 0) {
  //       alert("Your cart is empty!");
  //       return;
  //     }

  //     // Validate checkout data
  //     if (
  //       !checkoutData.name ||
  //       !checkoutData.email ||
  //       !checkoutData.phone ||
  //       !checkoutData.address ||
  //       !checkoutData.city ||
  //       !checkoutData.pincode
  //     ) {
  //       alert("Please fill in all required fields!");
  //       return;
  //     }

  //     // Redirect to payment page
  //     setShowPaymentPage(true);
  //   };

  //   const completeOrder = () => {
  //     const order = {
  //       id: Date.now(),
  //       items: [...cart],
  //       total: cartTotal + (cartTotal > 5000 ? 0 : 500),
  //       customerData: { ...checkoutData },
  //       paymentMethod,
  //       status: "Processing",
  //       date: new Date().toLocaleDateString(),
  //     } as any;
  //     setOrders([...orders, order]);
  //     setCart([]);
  //     setShowPaymentPage(false);
  //     alert(
  //       `Order placed successfully! Order ID: ${
  //         order.id
  //       }\n\nTotal: ₹${order.total.toLocaleString()}\nPayment Method: ${paymentMethod.toUpperCase()}\n\nYou will receive a confirmation email shortly.`
  //     );
  //     navigate("account");
  //   };

  //   const handlePaymentSubmit = (e: any) => {
  //     e.preventDefault();

  //     if (paymentMethod === "upi") {
  //       if (!upiId) {
  //         alert("Please enter your UPI ID");
  //         return;
  //       }
  //       alert(`Processing UPI payment via ${upiId}...`);
  //       setTimeout(() => {
  //         alert("Payment successful!");
  //         completeOrder();
  //       }, 1000);
  //     } else if (paymentMethod === "card") {
  //       if (
  //         !cardDetails.number ||
  //         !cardDetails.name ||
  //         !cardDetails.expiry ||
  //         !cardDetails.cvv
  //       ) {
  //         alert("Please fill in all card details");
  //         return;
  //       }
  //       if (cardDetails.number.length < 16) {
  //         alert("Please enter a valid 16-digit card number");
  //         return;
  //       }
  //       if (cardDetails.cvv.length < 3) {
  //         alert("Please enter a valid CVV");
  //         return;
  //       }
  //       alert("Processing card payment...");
  //       setTimeout(() => {
  //         alert("Payment successful!");
  //         completeOrder();
  //       }, 1000);
  //     }
  //   };

  //   // Payment Page View
  //   if (showPaymentPage) {
  //     return (
  //       <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 py-16">
  //         <div className="max-w-2xl mx-auto px-4">
  //           <button
  //             onClick={() => setShowPaymentPage(false)}
  //             className="text-amber-400 hover:underline mb-6 flex items-center"
  //           >
  //             ← Back to Checkout
  //           </button>

  //           <div className="bg-gray-800 p-8 rounded-lg shadow-2xl">
  //             <h1 className="text-3xl font-bold text-amber-400 mb-6 text-center">
  //               Complete Payment
  //             </h1>

  //             {/* Order Summary */}
  //             <div className="bg-gray-700 p-6 rounded-lg mb-6">
  //               <h2 className="text-xl font-bold text-white mb-4">
  //                 Order Summary
  //               </h2>
  //               <div className="space-y-2 text-gray-300">
  //                 {cart.map((item: any) => (
  //                   <div key={item.id} className="flex justify-between">
  //                     <span>
  //                       {item.name} x {item.quantity}
  //                     </span>
  //                     <span>
  //                       ₹{(item.price * item.quantity).toLocaleString()}
  //                     </span>
  //                   </div>
  //                 ))}
  //                 <div className="border-t border-gray-600 pt-2 mt-2">
  //                   <div className="flex justify-between">
  //                     <span>Subtotal</span>
  //                     <span>₹{cartTotal.toLocaleString()}</span>
  //                   </div>
  //                   <div className="flex justify-between">
  //                     <span>Shipping</span>
  //                     <span className="text-green-400">
  //                       {cartTotal > 5000 ? "FREE" : "₹500"}
  //                     </span>
  //                   </div>
  //                 </div>
  //                 <div className="flex justify-between text-xl font-bold text-amber-400 pt-2 border-t border-gray-600">
  //                   <span>Total Amount</span>
  //                   <span>
  //                     ₹
  //                     {(
  //                       cartTotal + (cartTotal > 5000 ? 0 : 500)
  //                     ).toLocaleString()}
  //                   </span>
  //                 </div>
  //               </div>
  //             </div>

  //             {/* Payment Method Selection */}
  //             <div className="mb-6">
  //               <h2 className="text-xl font-bold text-white mb-4">
  //                 Select Payment Method
  //               </h2>
  //               <div className="space-y-3">
  //                 <label className="flex items-center p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition">
  //                   <input
  //                     type="radio"
  //                     name="payment"
  //                     value="upi"
  //                     checked={paymentMethod === "upi"}
  //                     onChange={(e) => setPaymentMethod(e.target.value)}
  //                     className="mr-3 w-5 h-5"
  //                   />
  //                   <div className="flex-1">
  //                     <span className="text-white font-semibold">
  //                       UPI Payment
  //                     </span>
  //                     <p className="text-gray-400 text-sm">
  //                       Pay using Google Pay, PhonePe, Paytm, etc.
  //                     </p>
  //                   </div>
  //                 </label>
  //                 <label className="flex items-center p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition">
  //                   <input
  //                     type="radio"
  //                     name="payment"
  //                     value="card"
  //                     checked={paymentMethod === "card"}
  //                     onChange={(e) => setPaymentMethod(e.target.value)}
  //                     className="mr-3 w-5 h-5"
  //                   />
  //                   <div className="flex-1">
  //                     <span className="text-white font-semibold">
  //                       Credit / Debit Card
  //                     </span>
  //                     <p className="text-gray-400 text-sm">
  //                       Visa, Mastercard, Rupay accepted
  //                     </p>
  //                   </div>
  //                 </label>
  //               </div>
  //             </div>

  //             {/* Payment Form */}
  //             <form onSubmit={handlePaymentSubmit} className="space-y-4">
  //               {paymentMethod === "upi" && (
  //                 <div>
  //                   <label className="block text-white font-semibold mb-2">
  //                     Enter UPI ID *
  //                   </label>
  //                   <input
  //                     key="upi-input"
  //                     type="text"
  //                     placeholder="yourname@paytm / yourname@gpay"
  //                     value={upiId}
  //                     onChange={(e) => setUpiId(e.target.value)}
  //                     className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-amber-500 focus:outline-none cursor-text"
  //                     required
  //                     autoFocus
  //                   />
  //                   <p className="text-gray-400 text-sm mt-2">
  //                     Enter your UPI ID to complete the payment
  //                   </p>
  //                 </div>
  //               )}

  //               {paymentMethod === "card" && (
  //                 <>
  //                   <div>
  //                     <label className="block text-white font-semibold mb-2">
  //                       Card Number *
  //                     </label>
  //                     <input
  //                       key="card-number"
  //                       type="text"
  //                       placeholder="1234 5678 9012 3456"
  //                       value={cardDetails.number}
  //                       onChange={(e) =>
  //                         setCardDetails({
  //                           ...cardDetails,
  //                           number: e.target.value
  //                             .replace(/\D/g, "")
  //                             .slice(0, 16),
  //                         })
  //                       }
  //                       className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-amber-500 focus:outline-none cursor-text"
  //                       required
  //                       autoFocus
  //                     />
  //                   </div>
  //                   <div>
  //                     <label className="block text-white font-semibold mb-2">
  //                       Cardholder Name *
  //                     </label>
  //                     <input
  //                       key="card-name"
  //                       type="text"
  //                       placeholder="JOHN DOE"
  //                       value={cardDetails.name}
  //                       onChange={(e) =>
  //                         setCardDetails({
  //                           ...cardDetails,
  //                           name: e.target.value.toUpperCase(),
  //                         })
  //                       }
  //                       className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-amber-500 focus:outline-none cursor-text"
  //                       required
  //                     />
  //                   </div>
  //                   <div className="grid grid-cols-2 gap-4">
  //                     <div>
  //                       <label className="block text-white font-semibold mb-2">
  //                         Expiry Date *
  //                       </label>
  //                       <input
  //                         key="card-expiry"
  //                         type="text"
  //                         placeholder="MM/YY"
  //                         value={cardDetails.expiry}
  //                         onChange={(e) => {
  //                           let val = e.target.value.replace(/\D/g, "");
  //                           if (val.length >= 2)
  //                             val = val.slice(0, 2) + "/" + val.slice(2, 4);
  //                           setCardDetails({ ...cardDetails, expiry: val });
  //                         }}
  //                         className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-amber-500 focus:outline-none cursor-text"
  //                         maxLength={5}
  //                         required
  //                       />
  //                     </div>
  //                     <div>
  //                       <label className="block text-white font-semibold mb-2">
  //                         CVV *
  //                       </label>
  //                       <input
  //                         key="card-cvv"
  //                         type="password"
  //                         placeholder="123"
  //                         value={cardDetails.cvv}
  //                         onChange={(e) =>
  //                           setCardDetails({
  //                             ...cardDetails,
  //                             cvv: e.target.value
  //                               .replace(/\D/g, "")
  //                               .slice(0, 3),
  //                           })
  //                         }
  //                         className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-amber-500 focus:outline-none cursor-text"
  //                         maxLength={3}
  //                         required
  //                       />
  //                     </div>
  //                   </div>
  //                 </>
  //               )}

  //               <button
  //                 type="submit"
  //                 className="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition mt-6"
  //               >
  //                 {paymentMethod === "upi"
  //                   ? "Pay with UPI"
  //                   : `Pay ₹${(
  //                       cartTotal + (cartTotal > 5000 ? 0 : 500)
  //                     ).toLocaleString()}`}
  //               </button>

  //               <p className="text-gray-400 text-sm text-center mt-4">
  //                 🔒 Your payment is secure and encrypted
  //               </p>
  //             </form>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   }

  //   return (
  //     <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 py-16">
  //       <div className="max-w-5xl mx-auto px-4">
  //         <h1 className="text-4xl font-bold text-amber-400 mb-8">Checkout</h1>
  //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  //           {/* Checkout Form */}
  //           <form onSubmit={handleCheckout} className="space-y-4">
  //             <div className="bg-gray-800 p-6 rounded-lg">
  //               <h2 className="text-2xl font-bold text-white mb-4">
  //                 Billing Details
  //               </h2>
  //               <input
  //                 key="checkout-name"
  //                 type="text"
  //                 placeholder="Full Name *"
  //                 required
  //                 value={checkoutData.name}
  //                 onChange={(e) => handleInputChange("name", e.target.value)}
  //                 className="w-full px-4 py-3 bg-gray-700 text-white rounded mb-3 border-2 border-gray-600 focus:border-amber-500 focus:outline-none cursor-text"
  //               />
  //               <input
  //                 key="checkout-email"
  //                 type="email"
  //                 placeholder="Email *"
  //                 required
  //                 value={checkoutData.email}
  //                 onChange={(e) => handleInputChange("email", e.target.value)}
  //                 className="w-full px-4 py-3 bg-gray-700 text-white rounded mb-3 border-2 border-gray-600 focus:border-amber-500 focus:outline-none cursor-text"
  //               />
  //               <input
  //                 key="checkout-phone"
  //                 type="tel"
  //                 placeholder="Phone *"
  //                 required
  //                 value={checkoutData.phone}
  //                 onChange={(e) => handleInputChange("phone", e.target.value)}
  //                 className="w-full px-4 py-3 bg-gray-700 text-white rounded mb-3 border-2 border-gray-600 focus:border-amber-500 focus:outline-none cursor-text"
  //               />
  //               <textarea
  //                 key="checkout-address"
  //                 placeholder="Address *"
  //                 required
  //                 value={checkoutData.address}
  //                 onChange={(e) => handleInputChange("address", e.target.value)}
  //                 className="w-full px-4 py-3 bg-gray-700 text-white rounded mb-3 border-2 border-gray-600 focus:border-amber-500 focus:outline-none cursor-text resize-none"
  //                 rows={3}
  //               />
  //               <div className="grid grid-cols-2 gap-3">
  //                 <input
  //                   key="checkout-city"
  //                   type="text"
  //                   placeholder="City *"
  //                   required
  //                   value={checkoutData.city}
  //                   onChange={(e) => handleInputChange("city", e.target.value)}
  //                   className="px-4 py-3 bg-gray-700 text-white rounded border-2 border-gray-600 focus:border-amber-500 focus:outline-none cursor-text"
  //                 />
  //                 <input
  //                   key="checkout-pincode"
  //                   type="text"
  //                   placeholder="Pincode *"
  //                   required
  //                   value={checkoutData.pincode}
  //                   onChange={(e) =>
  //                     handleInputChange("pincode", e.target.value)
  //                   }
  //                   className="px-4 py-3 bg-gray-700 text-white rounded border-2 border-gray-600 focus:border-amber-500 focus:outline-none cursor-text"
  //                 />
  //               </div>
  //             </div>

  //             <button
  //               type="submit"
  //               className="w-full bg-amber-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-amber-600 transition"
  //             >
  //               Proceed to Payment →
  //             </button>
  //           </form>

  //           {/* Order Summary */}
  //           <div>
  //             <div className="bg-gray-800 p-6 rounded-lg sticky top-24">
  //               <h2 className="text-2xl font-bold text-white mb-4">
  //                 Order Summary
  //               </h2>
  //               <div className="space-y-4 mb-6">
  //                 {cart.map((item: any) => (
  //                   <div key={item.id} className="flex gap-3">
  //                     <img
  //                       src={item.image}
  //                       alt={item.name}
  //                       className="w-16 h-16 object-cover rounded"
  //                     />
  //                     <div className="flex-1">
  //                       <p className="text-white font-semibold">{item.name}</p>
  //                       <p className="text-gray-400 text-sm">
  //                         Qty: {item.quantity}
  //                       </p>
  //                     </div>
  //                     <p className="text-amber-400 font-bold">
  //                       ₹{(item.price * item.quantity).toLocaleString()}
  //                     </p>
  //                   </div>
  //                 ))}
  //               </div>
  //               <div className="border-t border-gray-700 pt-4 space-y-2">
  //                 <div className="flex justify-between text-white">
  //                   <span>Subtotal</span>
  //                   <span>₹{cartTotal.toLocaleString()}</span>
  //                 </div>
  //                 <div className="flex justify-between text-white">
  //                   <span>Shipping</span>
  //                   <span className="text-green-400">
  //                     {cartTotal > 5000 ? "FREE" : "₹500"}
  //                   </span>
  //                 </div>
  //                 <div className="flex justify-between text-xl font-bold text-amber-400 pt-2 border-t border-gray-700">
  //                   <span>Total</span>
  //                   <span>
  //                     ₹
  //                     {(
  //                       cartTotal + (cartTotal > 5000 ? 0 : 500)
  //                     ).toLocaleString()}
  //                   </span>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // Account Page
  // const AccountPage = () => (
  //   <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 py-16">
  //     <div className="max-w-6xl mx-auto px-4">
  //       <h1 className="text-4xl font-bold text-amber-400 mb-8">My Account</h1>

  //       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  //         {/* Sidebar */}
  //         <div className="bg-gray-800 p-6 rounded-lg h-fit">
  //           <div className="text-center mb-6">
  //             <div className="w-24 h-24 bg-amber-500 rounded-full mx-auto mb-4 flex items-center justify-center">
  //               <User size={48} className="text-white" />
  //             </div>
  //             <h2 className="text-white font-bold text-xl">
  //               {user?.name || "Guest User"}
  //             </h2>
  //             <p className="text-gray-400">
  //               {user?.email || "guest@example.com"}
  //             </p>
  //           </div>
  //           <nav className="space-y-2">
  //             <button className="w-full text-left px-4 py-3 bg-amber-500 text-white rounded">
  //               Orders
  //             </button>
  //             <button className="w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-700 rounded">
  //               Profile
  //             </button>
  //             <button className="w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-700 rounded">
  //               Addresses
  //             </button>
  //             <button
  //               onClick={() => navigate("wishlist")}
  //               className="w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-700 rounded"
  //             >
  //               Wishlist
  //             </button>
  //             <button
  //               onClick={() => setUser(null)}
  //               className="w-full text-left px-4 py-3 text-red-400 hover:bg-gray-700 rounded"
  //             >
  //               Logout
  //             </button>
  //           </nav>
  //         </div>

  //         {/* Orders */}
  //         <div className="md:col-span-2">
  //           <h2 className="text-2xl font-bold text-white mb-6">My Orders</h2>
  //           {orders.length === 0 ? (
  //             <div className="bg-gray-800 p-12 rounded-lg text-center">
  //               <Package size={64} className="text-gray-600 mx-auto mb-4" />
  //               <p className="text-gray-400 text-lg mb-4">No orders yet</p>
  //               <button
  //                 onClick={() => navigate("shop")}
  //                 className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600"
  //               >
  //                 Start Shopping
  //               </button>
  //             </div>
  //           ) : (
  //             <div className="space-y-4">
  //               {orders.map((order: any) => (
  //                 <div key={order.id} className="bg-gray-800 p-6 rounded-lg">
  //                   <div className="flex justify-between items-start mb-4">
  //                     <div>
  //                       <h3 className="text-white font-bold text-lg">
  //                         Order #{order.id}
  //                       </h3>
  //                       <p className="text-gray-400 text-sm">{order.date}</p>
  //                     </div>
  //                     <span className="px-4 py-2 bg-amber-500 text-white rounded-full text-sm font-bold">
  //                       {order.status}
  //                     </span>
  //                   </div>
  //                   <div className="space-y-2 mb-4">
  //                     {order.items.map((item: any) => (
  //                       <div
  //                         key={item.id}
  //                         className="flex justify-between text-gray-300"
  //                       >
  //                         <span>
  //                           {item.name} x {item.quantity}
  //                         </span>
  //                         <span>
  //                           ₹{(item.price * item.quantity).toLocaleString()}
  //                         </span>
  //                       </div>
  //                     ))}
  //                   </div>
  //                   <div className="border-t border-gray-700 pt-4">
  //                     <div className="flex justify-between items-center">
  //                       <span className="text-white font-bold">
  //                         Total: ₹{order.total.toLocaleString()}
  //                       </span>
  //                       <button className="text-amber-400 hover:underline">
  //                         Track Order
  //                       </button>
  //                     </div>
  //                   </div>
  //                 </div>
  //               ))}
  //             </div>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  // Wishlist Page
  // const WishlistPage = () => (
  //   <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 py-16">
  //     <div className="max-w-7xl mx-auto px-4">
  //       <h1 className="text-4xl font-bold text-amber-400 mb-8">
  //         My Wishlist ({wishlist.length})
  //       </h1>
  //       {wishlist.length === 0 ? (
  //         <div className="bg-gray-800 p-12 rounded-lg text-center">
  //           <Heart size={64} className="text-gray-600 mx-auto mb-4" />
  //           <p className="text-gray-400 text-lg mb-4">Your wishlist is empty</p>
  //           <button
  //             onClick={() => navigate("shop")}
  //             className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600"
  //           >
  //             Browse Products
  //           </button>
  //         </div>
  //       ) : (
  //         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
  //           {wishlist.map((product: any) => (
  //             <div
  //               key={product.id}
  //               className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
  //             >
  //               <div className="relative">
  //                 <img
  //                   src={product.image}
  //                   alt={product.name}
  //                   className="w-full h-64 object-cover"
  //                 />
  //                 <button
  //                   onClick={() => toggleWishlist(product)}
  //                   className="absolute top-4 right-4 bg-white rounded-full p-2"
  //                 >
  //                   <Heart size={20} className="text-red-500 fill-red-500" />
  //                 </button>
  //               </div>
  //               <div className="p-4">
  //                 <h3 className="text-white font-bold text-lg mb-2">
  //                   {product.name}
  //                 </h3>
  //                 <p className="text-amber-400 text-xl font-bold mb-4">
  //                   ₹{product.price.toLocaleString()}
  //                 </p>
  //                 <div className="flex gap-2">
  //                   <button
  //                     onClick={() => navigate("product", product)}
  //                     className="flex-1 bg-gray-700 text-white py-2 rounded hover:bg-gray-600"
  //                   >
  //                     View
  //                   </button>
  //                   {product.inStock && (
  //                     <button
  //                       onClick={() => addToCart(product)}
  //                       className="flex-1 bg-amber-500 text-white py-2 rounded hover:bg-amber-600"
  //                     >
  //                       Add to Cart
  //                     </button>
  //                   )}
  //                 </div>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );

  // About Page
  // const AboutPage = () => (
  //   <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-gray-900">
  //     <div
  //       className="relative h-96 bg-cover bg-center"
  //       style={{
  //         backgroundImage:
  //           "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1200)",
  //       }}
  //     >
  //       <div className="absolute inset-0 flex items-center justify-center">
  //         <h1 className="text-6xl font-bold text-amber-400">
  //           About Nathan Lights
  //         </h1>
  //       </div>
  //     </div>

  //     <div className="max-w-4xl mx-auto px-4 py-16">
  //       <div className="text-white space-y-8">
  //         <div>
  //           <h2 className="text-3xl font-bold text-amber-400 mb-4">
  //             Our Story
  //           </h2>
  //           <p className="text-gray-300 text-lg leading-relaxed">
  //             Nathan Lights was born from a passion for creating unique,
  //             handcrafted lighting solutions that blend modern technology with
  //             timeless craftsmanship. Founded in 2020, we've been illuminating
  //             homes and businesses with our signature 3D printed designs,
  //             premium resin work, and carefully selected wood finishes.
  //           </p>
  //         </div>

  //         <div>
  //           <h2 className="text-3xl font-bold text-amber-400 mb-4">
  //             Our Mission
  //           </h2>
  //           <p className="text-gray-300 text-lg leading-relaxed">
  //             We believe that lighting is more than just functionality—it's an
  //             art form that transforms spaces and creates ambiance. Our mission
  //             is to provide innovative, sustainable, and beautifully designed
  //             lighting solutions that inspire and delight our customers.
  //           </p>
  //         </div>

  //         <div>
  //           <h2 className="text-3xl font-bold text-amber-400 mb-4">
  //             Our Values
  //           </h2>
  //           <ul className="space-y-4 text-gray-300 text-lg">
  //             <li className="flex items-start">
  //               <ChevronRight className="text-amber-400 mr-2 mt-1 shrink-0" />
  //               <span>
  //                 <strong className="text-white">Quality Craftsmanship:</strong>{" "}
  //                 Every product is meticulously handcrafted with attention to
  //                 detail
  //               </span>
  //             </li>
  //             <li className="flex items-start">
  //               <ChevronRight className="text-amber-400 mr-2 mt-1 shrink-0" />
  //               <span>
  //                 <strong className="text-white">Innovation:</strong> We embrace
  //                 cutting-edge 3D printing technology while honoring traditional
  //                 techniques
  //               </span>
  //             </li>
  //             <li className="flex items-start">
  //               <ChevronRight className="text-amber-400 mr-2 mt-1 shrink-0" />
  //               <span>
  //                 <strong className="text-white">Sustainability:</strong> We use
  //                 eco-friendly materials and processes wherever possible
  //               </span>
  //             </li>
  //             <li className="flex items-start">
  //               <ChevronRight className="text-amber-400 mr-2 mt-1 shrink-0" />
  //               <span>
  //                 <strong className="text-white">Customer Satisfaction:</strong>{" "}
  //                 Your happiness is our priority, backed by our 2-year warranty
  //               </span>
  //             </li>
  //           </ul>
  //         </div>

  //         <div className="bg-gray-800 p-8 rounded-lg">
  //           <h2 className="text-3xl font-bold text-amber-400 mb-4 text-center">
  //             Why Choose Us?
  //           </h2>
  //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
  //             <div className="text-center">
  //               <div className="text-4xl font-bold text-amber-400 mb-2">
  //                 500+
  //               </div>
  //               <p className="text-gray-300">Happy Customers</p>
  //             </div>
  //             <div className="text-center">
  //               <div className="text-4xl font-bold text-amber-400 mb-2">
  //                 50+
  //               </div>
  //               <p className="text-gray-300">Unique Designs</p>
  //             </div>
  //             <div className="text-center">
  //               <div className="text-4xl font-bold text-amber-400 mb-2">
  //                 100%
  //               </div>
  //               <p className="text-gray-300">Handcrafted</p>
  //             </div>
  //             <div className="text-center">
  //               <div className="text-4xl font-bold text-amber-400 mb-2">
  //                 2 Years
  //               </div>
  //               <p className="text-gray-300">Warranty</p>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  // Portfolio Page
  // const PortfolioPage = () => (
  //   <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 py-16">
  //     <div className="max-w-7xl mx-auto px-4">
  //       <h1 className="text-4xl font-bold text-amber-400 mb-4 text-center">
  //         Our Portfolio
  //       </h1>
  //       <p className="text-gray-300 text-center text-lg mb-12">
  //         See how Nathan Lights transforms spaces
  //       </p>

  //       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  //         {[
  //           {
  //             img: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600",
  //             title: "Modern Living Room",
  //             desc: "Nordic Pendant Installation",
  //           },
  //           {
  //             img: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=600",
  //             title: "Garden Pathway",
  //             desc: "Outdoor Lighting Series",
  //           },
  //           {
  //             img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600",
  //             title: "Bedroom Ambiance",
  //             desc: "Aurora Table Lamp Setup",
  //           },
  //           {
  //             img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=600",
  //             title: "Office Space",
  //             desc: "LED Strip Accent Lighting",
  //           },
  //           {
  //             img: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=600",
  //             title: "Dining Area",
  //             desc: "Crystal Chandelier Feature",
  //           },
  //           {
  //             img: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600",
  //             title: "Hallway Design",
  //             desc: "Wall Sconce Series",
  //           },
  //         ].map((project, idx) => (
  //           <div
  //             key={idx}
  //             className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:scale-105"
  //           >
  //             <div className="relative h-64 overflow-hidden">
  //               <img
  //                 src={project.img}
  //                 alt={project.title}
  //                 className="w-full h-full object-cover"
  //               />
  //               <div className="absolute inset-0 bg-linear-gradient-to-t from-black via-transparent to-transparent opacity-0 hover:opacity-100 transition">
  //                 <div className="absolute bottom-0 left-0 right-0 p-6">
  //                   <h3 className="text-white font-bold text-xl mb-2">
  //                     {project.title}
  //                   </h3>
  //                   <p className="text-amber-400">{project.desc}</p>
  //                 </div>
  //               </div>
  //             </div>
  //             <div className="p-4">
  //               <h3 className="text-white font-bold text-lg">
  //                 {project.title}
  //               </h3>
  //               <p className="text-gray-400">{project.desc}</p>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );

  // Blog Page
  // const BlogPage = () => (
  //   <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 py-16">
  //     <div className="max-w-7xl mx-auto px-4">
  //       <h1 className="text-4xl font-bold text-amber-400 mb-12 text-center">
  //         Lighting Ideas & Tips
  //       </h1>

  //       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  //         {[
  //           {
  //             title: "Top 10 Lighting Trends in 2025",
  //             date: "Nov 10, 2025",
  //             excerpt:
  //               "Discover the latest trends in home lighting design, from smart technology to sustainable materials.",
  //           },
  //           {
  //             title: "How to Choose the Perfect Light for Your Living Room",
  //             date: "Nov 5, 2025",
  //             excerpt:
  //               "A comprehensive guide to selecting the right lighting fixtures for your living space.",
  //           },
  //           {
  //             title: "Energy-Efficient LED Lighting Tips",
  //             date: "Oct 28, 2025",
  //             excerpt:
  //               "Learn how LED lights can save you money while providing better illumination.",
  //           },
  //           {
  //             title: "The Art of Layered Lighting",
  //             date: "Oct 20, 2025",
  //             excerpt:
  //               "Master the technique of combining ambient, task, and accent lighting.",
  //           },
  //           {
  //             title: "Outdoor Lighting Ideas for Your Garden",
  //             date: "Oct 15, 2025",
  //             excerpt:
  //               "Transform your outdoor space with strategic lighting placement and design.",
  //           },
  //           {
  //             title: "Smart Home Lighting Integration",
  //             date: "Oct 10, 2025",
  //             excerpt:
  //               "Everything you need to know about connecting your lights to smart home systems.",
  //           },
  //         ].map((post, idx) => (
  //           <div
  //             key={idx}
  //             className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition"
  //           >
  //             <div className="h-48 bg-linear-to-r from-amber-500 to-amber-700"></div>
  //             <div className="p-6">
  //               <p className="text-amber-400 text-sm mb-2">{post.date}</p>
  //               <h3 className="text-white font-bold text-xl mb-3">
  //                 {post.title}
  //               </h3>
  //               <p className="text-gray-400 mb-4">{post.excerpt}</p>
  //               <button className="text-amber-400 hover:underline font-semibold">
  //                 Read More →
  //               </button>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );

  // Contact Page
  // const ContactPage = () => {
  //   const [contactForm, setContactForm] = useState({
  //     name: "",
  //     email: "",
  //     message: "",
  //   });

  //   const handleContactSubmit = (e: any) => {
  //     e.preventDefault();
  //     alert("Thank you! We will get back to you soon.");
  //     setContactForm({ name: "", email: "", message: "" });
  //   };

  //   return (
  //     <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 py-16">
  //       <div className="max-w-6xl mx-auto px-4">
  //         <h1 className="text-4xl font-bold text-amber-400 mb-12 text-center">
  //           Contact Us
  //         </h1>

  //         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
  //           <div>
  //             <h2 className="text-2xl font-bold text-white mb-6">
  //               Get In Touch
  //             </h2>
  //             <form onSubmit={handleContactSubmit} className="space-y-4">
  //               <input
  //                 key="contact-name"
  //                 type="text"
  //                 placeholder="Your Name *"
  //                 required
  //                 value={contactForm.name}
  //                 onChange={(e) =>
  //                   setContactForm({ ...contactForm, name: e.target.value })
  //                 }
  //                 className="w-full px-4 py-3 bg-gray-800 text-white rounded border border-gray-700 focus:border-amber-500 focus:outline-none"
  //               />
  //               <input
  //                 key="contact-email"
  //                 type="email"
  //                 placeholder="Your Email *"
  //                 required
  //                 value={contactForm.email}
  //                 onChange={(e) =>
  //                   setContactForm({ ...contactForm, email: e.target.value })
  //                 }
  //                 className="w-full px-4 py-3 bg-gray-800 text-white rounded border border-gray-700 focus:border-amber-500 focus:outline-none"
  //               />
  //               <textarea
  //                 key="contact-message"
  //                 placeholder="Your Message *"
  //                 required
  //                 value={contactForm.message}
  //                 onChange={(e) =>
  //                   setContactForm({ ...contactForm, message: e.target.value })
  //                 }
  //                 rows={6}
  //                 className="w-full px-4 py-3 bg-gray-800 text-white rounded border border-gray-700 focus:border-amber-500 focus:outline-none"
  //               />
  //               <button
  //                 type="submit"
  //                 className="w-full bg-amber-500 text-white py-3 rounded-lg font-bold hover:bg-amber-600 transition"
  //               >
  //                 Send Message
  //               </button>
  //             </form>
  //           </div>

  //           <div className="space-y-8">
  //             <div className="bg-gray-800 p-6 rounded-lg">
  //               <h3 className="text-xl font-bold text-amber-400 mb-4">
  //                 Contact Information
  //               </h3>
  //               <div className="space-y-3 text-gray-300">
  //                 <p>
  //                   <strong className="text-white">Email:</strong>{" "}
  //                   info@nathanlights.com
  //                 </p>
  //                 <p>
  //                   <strong className="text-white">Phone:</strong> +91 98765
  //                   43210
  //                 </p>
  //                 <p>
  //                   <strong className="text-white">Address:</strong> 123 Design
  //                   Street, Mumbai, India 400001
  //                 </p>
  //               </div>
  //             </div>

  //             <div className="bg-gray-800 p-6 rounded-lg">
  //               <h3 className="text-xl font-bold text-amber-400 mb-4">
  //                 Business Hours
  //               </h3>
  //               <div className="space-y-2 text-gray-300">
  //                 <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
  //                 <p>Saturday: 10:00 AM - 4:00 PM</p>
  //                 <p>Sunday: Closed</p>
  //               </div>
  //             </div>

  //             <div className="bg-gray-800 p-6 rounded-lg">
  //               <h3 className="text-xl font-bold text-amber-400 mb-4">
  //                 Follow Us
  //               </h3>
  //               <div className="flex gap-4">
  //                 <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
  //                   Facebook
  //                 </button>
  //                 <button className="px-6 py-2 bg-pink-600 text-white rounded hover:bg-pink-700">
  //                   Instagram
  //                 </button>
  //                 <button className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700">
  //                   Pinterest
  //                 </button>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // FAQ Page
  // const FAQPage = () => (
  //   <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 py-16">
  //     <div className="max-w-4xl mx-auto px-4">
  //       <h1 className="text-4xl font-bold text-amber-400 mb-12 text-center">
  //         Frequently Asked Questions
  //       </h1>

  //       <div className="space-y-6">
  //         {[
  //           {
  //             q: "What are your shipping times?",
  //             a: "We typically ship within 2-3 business days. Delivery takes 5-7 business days within India.",
  //           },
  //           {
  //             q: "Do you offer international shipping?",
  //             a: "Currently, we only ship within India. International shipping coming soon!",
  //           },
  //           {
  //             q: "What is your return policy?",
  //             a: "We offer a 30-day return policy for unused items in original packaging. Return shipping is free for defective products.",
  //           },
  //           {
  //             q: "Are your products energy efficient?",
  //             a: "Yes! All our LED products are energy efficient and rated for long-term use.",
  //           },
  //           {
  //             q: "Do you offer custom designs?",
  //             a: "Yes, we offer custom design services. Contact us to discuss your requirements.",
  //           },
  //           {
  //             q: "What is the warranty period?",
  //             a: "All Nathan Lights products come with a 2-year warranty against manufacturing defects.",
  //           },
  //           {
  //             q: "How do I care for my lighting fixtures?",
  //             a: "Clean with a soft, dry cloth. Avoid harsh chemicals. Handle resin parts with care.",
  //           },
  //           {
  //             q: "Can I track my order?",
  //             a: "Yes! Once shipped, you will receive a tracking number via email.",
  //           },
  //         ].map((faq, idx) => (
  //           <div key={idx} className="bg-gray-800 p-6 rounded-lg">
  //             <h3 className="text-xl font-bold text-amber-400 mb-3">{faq.q}</h3>
  //             <p className="text-gray-300 leading-relaxed">{faq.a}</p>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );

  // Login Page
  // const LoginPage = () => {
  //   const [loginData, setLoginData] = useState({ email: "", password: "" });
  //   const [isSignup, setIsSignup] = useState(false);

  //   const handleLogin = (e: any) => {
  //     e.preventDefault();
  //     setUser({ name: loginData.email.split("@")[0], email: loginData.email });
  //     alert("Login successful!");
  //     navigate("account");
  //   };

  //   return (
  //     <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 py-16 flex items-center">
  //       <div className="max-w-md mx-auto px-4 w-full">
  //         <div className="bg-gray-800 p-8 rounded-lg shadow-2xl">
  //           <h1 className="text-3xl font-bold text-amber-400 mb-6 text-center">
  //             {isSignup ? "Create Account" : "Welcome Back"}
  //           </h1>

  //           <form onSubmit={handleLogin} className="space-y-4">
  //             {isSignup && (
  //               <input
  //                 key="signup-name"
  //                 type="text"
  //                 placeholder="Full Name *"
  //                 required
  //                 className="w-full px-4 py-3 bg-gray-700 text-white rounded"
  //               />
  //             )}
  //             <input
  //               key="login-email"
  //               type="email"
  //               placeholder="Email *"
  //               required
  //               value={loginData.email}
  //               onChange={(e) =>
  //                 setLoginData({ ...loginData, email: e.target.value })
  //               }
  //               className="w-full px-4 py-3 bg-gray-700 text-white rounded"
  //             />
  //             <input
  //               key="login-password"
  //               type="password"
  //               placeholder="Password *"
  //               required
  //               value={loginData.password}
  //               onChange={(e) =>
  //                 setLoginData({ ...loginData, password: e.target.value })
  //               }
  //               className="w-full px-4 py-3 bg-gray-700 text-white rounded"
  //             />

  //             {!isSignup && (
  //               <div className="flex justify-between items-center text-sm">
  //                 <label className="text-gray-300 flex items-center">
  //                   <input type="checkbox" className="mr-2" />
  //                   Remember me
  //                 </label>
  //                 <button
  //                   type="button"
  //                   className="text-amber-400 hover:underline"
  //                 >
  //                   Forgot password?
  //                 </button>
  //               </div>
  //             )}

  //             <button
  //               type="submit"
  //               className="w-full bg-amber-500 text-white py-3 rounded-lg font-bold hover:bg-amber-600 transition"
  //             >
  //               {isSignup ? "Sign Up" : "Login"}
  //             </button>
  //           </form>

  //           <div className="mt-6 text-center">
  //             <p className="text-gray-400">
  //               {isSignup
  //                 ? "Already have an account?"
  //                 : "Don't have an account?"}
  //               <button
  //                 onClick={() => setIsSignup(!isSignup)}
  //                 className="text-amber-400 hover:underline ml-2"
  //               >
  //                 {isSignup ? "Login" : "Sign Up"}
  //               </button>
  //             </p>
  //           </div>

  //           <div className="mt-6">
  //             <div className="relative">
  //               <div className="absolute inset-0 flex items-center">
  //                 <div className="w-full border-t border-gray-700"></div>
  //               </div>
  //               <div className="relative flex justify-center text-sm">
  //                 <span className="px-2 bg-gray-800 text-gray-400">
  //                   Or continue with
  //                 </span>
  //               </div>
  //             </div>
  //             <div className="mt-4 grid grid-cols-2 gap-3">
  //               <button className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">
  //                 Google
  //               </button>
  //               <button className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">
  //                 Facebook
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // Search Page
  // const SearchPage = () => {
  //   const searchResults = productsData.filter(
  //     (p) =>
  //       p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       p.description.toLowerCase().includes(searchQuery.toLowerCase())
  //   );

  //   return (
  //     <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 py-16">
  //       <div className="max-w-7xl mx-auto px-4">
  //         <h1 className="text-4xl font-bold text-amber-400 mb-8">
  //           Search Products
  //         </h1>

  //         <div className="mb-8">
  //           <div className="relative">
  //             <input
  //               key="search-input"
  //               type="text"
  //               placeholder="Search for lights..."
  //               value={searchQuery}
  //               onChange={(e) => setSearchQuery(e.target.value)}
  //               className="w-full px-6 py-4 bg-gray-800 text-white rounded-lg text-lg border-2 border-gray-700 focus:border-amber-500 focus:outline-none cursor-text"
  //             />
  //             <Search
  //               className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
  //               size={24}
  //             />
  //           </div>
  //         </div>

  //         {searchQuery && (
  //           <>
  //             <p className="text-gray-300 mb-6">
  //               Found {searchResults.length} result
  //               {searchResults.length !== 1 ? "s" : ""} for "{searchQuery}"
  //             </p>

  //             {searchResults.length === 0 ? (
  //               <div className="text-center py-12">
  //                 <p className="text-gray-400 text-lg mb-4">
  //                   No products found
  //                 </p>
  //                 <button
  //                   onClick={() => {
  //                     setSearchQuery("");
  //                     navigate("shop");
  //                   }}
  //                   className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600"
  //                 >
  //                   Browse All Products
  //                 </button>
  //               </div>
  //             ) : (
  //               <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
  //                 {searchResults.map((product: any) => (
  //                   <div
  //                     key={product.id}
  //                     className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition"
  //                   >
  //                     <img
  //                       src={product.image}
  //                       alt={product.name}
  //                       className="w-full h-64 object-cover"
  //                     />
  //                     <div className="p-4">
  //                       <h3 className="text-white font-bold text-lg mb-2">
  //                         {product.name}
  //                       </h3>
  //                       <p className="text-amber-400 text-xl font-bold mb-4">
  //                         ₹{product.price.toLocaleString()}
  //                       </p>
  //                       <button
  //                         onClick={() => navigate("product", product)}
  //                         className="w-full bg-amber-500 text-white py-2 rounded hover:bg-amber-600"
  //                       >
  //                         View Details
  //                       </button>
  //                     </div>
  //                   </div>
  //                 ))}
  //               </div>
  //             )}
  //           </>
  //         )}
  //       </div>
  //     </div>
  //   );
  // };

  // Legal Pages
  // const LegalPage = ({ title, content }: any) => (
  //   <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 py-16">
  //     <div className="max-w-4xl mx-auto px-4">
  //       <h1 className="text-4xl font-bold text-amber-400 mb-8">{title}</h1>
  //       <div className="bg-gray-800 p-8 rounded-lg">
  //         <div className="text-gray-300 space-y-6 leading-relaxed">
  //           {content}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  // const PrivacyPolicy = () => (
  //   <LegalPage
  //     title="Privacy Policy"
  //     content={
  //       <>
  //         <p className="text-white font-bold text-xl mb-4">
  //           Last updated: November 12, 2025
  //         </p>

  //         <div>
  //           <h2 className="text-xl font-bold text-amber-400 mb-3">
  //             1. Information We Collect
  //           </h2>
  //           <p>
  //             We collect information you provide directly to us, including name,
  //             email address, phone number, shipping address, and payment
  //             information when you make a purchase.
  //           </p>
  //         </div>

  //         <div>
  //           <h2 className="text-xl font-bold text-amber-400 mb-3">
  //             2. How We Use Your Information
  //           </h2>
  //           <p>
  //             We use the information we collect to process your orders,
  //             communicate with you, improve our services, and comply with legal
  //             obligations.
  //           </p>
  //         </div>

  //         <div>
  //           <h2 className="text-xl font-bold text-amber-400 mb-3">
  //             3. Information Sharing
  //           </h2>
  //           <p>
  //             We do not sell or rent your personal information to third parties.
  //             We may share information with service providers who assist us in
  //             operating our website and conducting our business.
  //           </p>
  //         </div>

  //         <div>
  //           <h2 className="text-xl font-bold text-amber-400 mb-3">
  //             4. Data Security
  //           </h2>
  //           <p>
  //             We implement appropriate security measures to protect your
  //             personal information from unauthorized access, alteration, or
  //             disclosure.
  //           </p>
  //         </div>

  //         <div>
  //           <h2 className="text-xl font-bold text-amber-400 mb-3">
  //             5. Your Rights
  //           </h2>
  //           <p>
  //             You have the right to access, correct, or delete your personal
  //             information. Contact us at privacy@nathanlights.com for any
  //             privacy-related requests.
  //           </p>
  //         </div>
  //       </>
  //     }
  //   />
  // );

  // const TermsConditions = () => (
  //   <LegalPage
  //     title="Terms & Conditions"
  //     content={
  //       <>
  //         <p className="text-white font-bold text-xl mb-4">
  //           Last updated: November 12, 2025
  //         </p>

  //         <div>
  //           <h2 className="text-xl font-bold text-amber-400 mb-3">
  //             1. Acceptance of Terms
  //           </h2>
  //           <p>
  //             By accessing and using Nathan Lights website, you accept and agree
  //             to be bound by these terms and conditions.
  //           </p>
  //         </div>

  //         <div>
  //           <h2 className="text-xl font-bold text-amber-400 mb-3">
  //             2. Product Information
  //           </h2>
  //           <p>
  //             We strive to provide accurate product descriptions and images.
  //             However, slight variations may occur due to the handcrafted nature
  //             of our products.
  //           </p>
  //         </div>

  //         <div>
  //           <h2 className="text-xl font-bold text-amber-400 mb-3">
  //             3. Pricing
  //           </h2>
  //           <p>
  //             All prices are in Indian Rupees (INR) and include applicable
  //             taxes. We reserve the right to change prices without prior notice.
  //           </p>
  //         </div>

  //         <div>
  //           <h2 className="text-xl font-bold text-amber-400 mb-3">
  //             4. Orders and Payment
  //           </h2>
  //           <p>
  //             All orders are subject to acceptance and availability. Payment
  //             must be received before order processing.
  //           </p>
  //         </div>

  //         <div>
  //           <h2 className="text-xl font-bold text-amber-400 mb-3">
  //             5. Intellectual Property
  //           </h2>
  //           <p>
  //             All content on this website, including designs, images, and text,
  //             is the property of Nathan Lights and protected by copyright laws.
  //           </p>
  //         </div>
  //       </>
  //     }
  //   />
  // );

  // const ReturnPolicy = () => (
  //   <LegalPage
  //     title="Return & Refund Policy"
  //     content={
  //       <>
  //         <p className="text-white font-bold text-xl mb-4">
  //           Last updated: November 12, 2025
  //         </p>

  //         <div>
  //           <h2 className="text-xl font-bold text-amber-400 mb-3">
  //             1. Return Window
  //           </h2>
  //           <p>
  //             You may return unused products within 30 days of delivery for a
  //             full refund. Products must be in original packaging and condition.
  //           </p>
  //         </div>

  //         <div>
  //           <h2 className="text-xl font-bold text-amber-400 mb-3">
  //             2. Return Process
  //           </h2>
  //           <p>
  //             Contact our support team at returns@nathanlights.com with your
  //             order number and reason for return. We will provide return
  //             shipping instructions.
  //           </p>
  //         </div>

  //         <div>
  //           <h2 className="text-xl font-bold text-amber-400 mb-3">
  //             3. Refund Processing
  //           </h2>
  //           <p>
  //             Refunds will be processed within 7-10 business days after we
  //             receive the returned product. Refunds will be credited to the
  //             original payment method.
  //           </p>
  //         </div>

  //         <div>
  //           <h2 className="text-xl font-bold text-amber-400 mb-3">
  //             4. Damaged or Defective Products
  //           </h2>
  //           <p>
  //             If you receive a damaged or defective product, contact us
  //             immediately. We will arrange for a replacement or full refund at
  //             no cost to you.
  //           </p>
  //         </div>

  //         <div>
  //           <h2 className="text-xl font-bold text-amber-400 mb-3">
  //             5. Non-Returnable Items
  //           </h2>
  //           <p>
  //             Custom-made products and clearance items are not eligible for
  //             returns unless defective.
  //           </p>
  //         </div>
  //       </>
  //     }
  //   />
  // );

  // const ShippingPolicy = () => (
  //   <LegalPage
  //     title="Shipping Policy"
  //     content={
  //       <>
  //         <p className="text-white font-bold text-xl mb-4">
  //           Last updated: November 12, 2025
  //         </p>

  //         <div>
  //           <h2 className="text-xl font-bold text-amber-400 mb-3">
  //             1. Shipping Locations
  //           </h2>
  //           <p>
  //             We currently ship to all locations within India. International
  //             shipping is not available at this time.
  //           </p>
  //         </div>

  //         <div>
  //           <h2 className="text-xl font-bold text-amber-400 mb-3">
  //             2. Processing Time
  //           </h2>
  //           <p>
  //             Orders are typically processed and shipped within 2-3 business
  //             days. Custom orders may take longer.
  //           </p>
  //         </div>

  //         <div>
  //           <h2 className="text-xl font-bold text-amber-400 mb-3">
  //             3. Delivery Time
  //           </h2>
  //           <p>
  //             Standard delivery takes 5-7 business days. Express shipping (2-3
  //             days) is available for an additional fee.
  //           </p>
  //         </div>

  //         <div>
  //           <h2 className="text-xl font-bold text-amber-400 mb-3">
  //             4. Shipping Costs
  //           </h2>
  //           <p>
  //             Free shipping on all orders above ₹5,000. Orders below ₹5,000
  //             incur a ₹500 shipping charge.
  //           </p>
  //         </div>

  //         <div>
  //           <h2 className="text-xl font-bold text-amber-400 mb-3">
  //             5. Order Tracking
  //           </h2>
  //           <p>
  //             Once your order is shipped, you will receive a tracking number via
  //             email to monitor your delivery.
  //           </p>
  //         </div>

  //         <div>
  //           <h2 className="text-xl font-bold text-amber-400 mb-3">
  //             6. Delivery Issues
  //           </h2>
  //           <p>
  //             If your order doesn't arrive within the expected timeframe, please
  //             contact our support team at support@nathanlights.com.
  //           </p>
  //         </div>
  //       </>
  //     }
  //   />
  // );

  // Footer Component
  // const Footer = () => (
  //   <footer className="bg-gray-900 border-t border-gray-800 py-12">
  //     <div className="max-w-7xl mx-auto px-4">
  //       <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
  //         <div>
  //           <div className="flex items-center space-x-1 mb-4">
  //             <span
  //               className="text-2xl font-serif italic text-amber-400"
  //               style={{ fontFamily: "cursive" }}
  //             >
  //               Nathan
  //             </span>
  //             <span className="text-2xl font-bold text-amber-400">LIGHTS</span>
  //           </div>
  //           <p className="text-gray-400 mb-4">
  //             Handcrafted lighting solutions with premium quality and innovative
  //             design.
  //           </p>
  //         </div>

  //         <div>
  //           <h3 className="text-white font-bold mb-4">Shop</h3>
  //           <ul className="space-y-2 text-gray-400">
  //             <li>
  //               <button
  //                 onClick={() => navigate("shop")}
  //                 className="hover:text-amber-400"
  //               >
  //                 All Products
  //               </button>
  //             </li>
  //             <li>
  //               <button
  //                 onClick={() => {
  //                   setCategoryFilter("table");
  //                   navigate("shop");
  //                 }}
  //                 className="hover:text-amber-400"
  //               >
  //                 Table Lamps
  //               </button>
  //             </li>
  //             <li>
  //               <button
  //                 onClick={() => {
  //                   setCategoryFilter("pendant");
  //                   navigate("shop");
  //                 }}
  //                 className="hover:text-amber-400"
  //               >
  //                 Pendant Lights
  //               </button>
  //             </li>
  //             <li>
  //               <button
  //                 onClick={() => {
  //                   setCategoryFilter("led");
  //                   navigate("shop");
  //                 }}
  //                 className="hover:text-amber-400"
  //               >
  //                 LED Lighting
  //               </button>
  //             </li>
  //           </ul>
  //         </div>

  //         <div>
  //           <h3 className="text-white font-bold mb-4">Company</h3>
  //           <ul className="space-y-2 text-gray-400">
  //             <li>
  //               <button
  //                 onClick={() => navigate("about")}
  //                 className="hover:text-amber-400"
  //               >
  //                 About Us
  //               </button>
  //             </li>
  //             <li>
  //               <button
  //                 onClick={() => navigate("portfolio")}
  //                 className="hover:text-amber-400"
  //               >
  //                 Portfolio
  //               </button>
  //             </li>
  //             <li>
  //               <button
  //                 onClick={() => navigate("blog")}
  //                 className="hover:text-amber-400"
  //               >
  //                 Blog
  //               </button>
  //             </li>
  //             <li>
  //               <button
  //                 onClick={() => navigate("contact")}
  //                 className="hover:text-amber-400"
  //               >
  //                 Contact
  //               </button>
  //             </li>
  //           </ul>
  //         </div>

  //         <div>
  //           <h3 className="text-white font-bold mb-4">Support</h3>
  //           <ul className="space-y-2 text-gray-400">
  //             <li>
  //               <button
  //                 onClick={() => navigate("faq")}
  //                 className="hover:text-amber-400"
  //               >
  //                 FAQ
  //               </button>
  //             </li>
  //             <li>
  //               <button
  //                 onClick={() => navigate("shipping")}
  //                 className="hover:text-amber-400"
  //               >
  //                 Shipping Policy
  //               </button>
  //             </li>
  //             <li>
  //               <button
  //                 onClick={() => navigate("returns")}
  //                 className="hover:text-amber-400"
  //               >
  //                 Returns
  //               </button>
  //             </li>
  //             <li>
  //               <button
  //                 onClick={() => navigate("privacy")}
  //                 className="hover:text-amber-400"
  //               >
  //                 Privacy Policy
  //               </button>
  //             </li>
  //             <li>
  //               <button
  //                 onClick={() => navigate("terms")}
  //                 className="hover:text-amber-400"
  //               >
  //                 Terms & Conditions
  //               </button>
  //             </li>
  //           </ul>
  //         </div>
  //       </div>

  //       <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
  //         <p className="text-gray-400 text-sm mb-4 md:mb-0">
  //           © 2025 Nathan Lights. All rights reserved.
  //         </p>
  //         <div className="flex gap-4">
  //           <button className="text-gray-400 hover:text-amber-400">
  //             Facebook
  //           </button>
  //           <button className="text-gray-400 hover:text-amber-400">
  //             Instagram
  //           </button>
  //           <button className="text-gray-400 hover:text-amber-400">
  //             Twitter
  //           </button>
  //           <button className="text-gray-400 hover:text-amber-400">
  //             Pinterest
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </footer>
  // );

  // Main Render
  return (
    <div
      className="bg-gray-900 min-h-screen"
      style={{
        background:
          "radial-gradient(circle at top, #1e3a8a, #111827 70%), linear-gradient(180deg, rgba(0,255,200,0.1), rgba(0,0,0,0.9))",
      }}
    >
      <Header />

      {currentPage === "home" && <HomePage />}
      {currentPage === "shop" && <ShopPage />}
      {currentPage === "product" && <ProductDetailPage />}
      {currentPage === "checkout" && <CheckoutPage />}
      {currentPage === "account" && <AccountPage />}
      {currentPage === "wishlist" && <WishlistPage />}
      {currentPage === "about" && <AboutPage />}
      {currentPage === "portfolio" && <PortfolioPage />}
      {currentPage === "blog" && <BlogPage />}
      {currentPage === "contact" && <ContactPage />}
      {currentPage === "faq" && <FAQPage />}
      {currentPage === "login" && <LoginPage />}
      {currentPage === "search" && <SearchPage />}
      {currentPage === "privacy" && <PrivacyPolicy />}
      {currentPage === "terms" && <TermsConditions />}
      {currentPage === "returns" && <ReturnPolicy />}
      {currentPage === "shipping" && <ShippingPolicy />}

      <Footer />
    </div>
  );
};

export default UserPanel;
