import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/userInterface/Home";
import Shop from "./pages/userInterface/Shop";
import CheckoutPage from "./pages/userInterface/Checkout/checkoutPage";
import ProductDetailPage from "./pages/userInterface/Product/productDetailPage";
import Account from "./pages/userInterface/About/about";
import Login from "./pages/userInterface/Auth/login";
import BlogPage from "./pages/userInterface/Blog/blogPage";
import Contact from "./pages/userInterface/Contact/contact";
import FAQ from "./pages/userInterface/FAQ/faq";
import PrivacyPolicy from "./pages/userInterface/Policies/PrivacyPolicy";
import Portfolio from "./pages/userInterface/Portfolio/Portfolio";
import ReturnPolicy from "./pages/userInterface/ReturnPolicy/returnPolicy";
import SearchPage from "./pages/userInterface/Search/searchPage";
import TermsAndConditions from "./pages/userInterface/Terms/termsCodititons";
import WishlistPage from "./pages/userInterface/Wishlist/wishlist";
import ShippingPolicy from "./pages/userInterface/shippingPolicy/shippingPolicyPage";
import Header from "./components/userInterface/Header";
import Footer from "./components/userInterface/footer";
import AboutPage from "./pages/userInterface/About/about";

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <div className="App">
          <Header />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/search" element={<SearchPage />} />

            {/* Policy Pages */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/return-policy" element={<ReturnPolicy />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/terms-conditions" element={<TermsAndConditions />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route path="/account" element={<Account />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />

            {/* 404 - Not Found */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </div>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
