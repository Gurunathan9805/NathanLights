import { useNavigate } from "react-router";
import Header from "../components/Header";
import { ProductCard } from "../components/ProductCard";
import productsData from "../data/products";
import type { Product } from "../types";
import Footer from "../components/footer";

const Home = () => {
  const navigate = useNavigate();

  const featuredProducts = productsData.slice(0, 4);

  const handleViewDetails = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="bg-linear-to-r from-amber-600 to-amber-800 rounded-2xl p-8 md:p-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Illuminate Your Space
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Discover our exclusive collection of handcrafted lighting
              solutions
            </p>
            <button
              onClick={() => navigate("/shop")}
              className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition"
            >
              Shop Now
            </button>
          </div>
        </section>

        {/* Featured Products */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <button
              onClick={() => navigate("/shop")}
              className="text-amber-400 hover:underline"
            >
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={handleViewDetails}
                onAddToCart={() => {}}
                onToggleWishlist={() => {}}
                isInWishlist={false}
              />
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Table Lamps", "Pendant Lights", "Wall Lights", "LED Strips"].map(
              (category) => (
                <div
                  key={category}
                  className="bg-gray-800 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-700 transition"
                  onClick={() =>
                    navigate(
                      `/shop?category=${category
                        .toLowerCase()
                        .replace(" ", "-")}`
                    )
                  }
                >
                  <h3 className="text-lg font-medium">{category}</h3>
                </div>
              )
            )}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-gray-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-8 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Free Shipping",
                description: "Free shipping on all orders over ₹5000",
                icon: "🚚",
              },
              {
                title: "Quality Products",
                description: "Handcrafted with premium materials",
                icon: "✨",
              },
              {
                title: "24/7 Support",
                description: "Dedicated customer support",
                icon: "💬",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
