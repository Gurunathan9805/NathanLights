import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import CheckoutPage from "./pages/Checkout/checkoutPage";
import ProductDetailPage from "./pages/Product/productDetailPage";
import Account from "./pages/Account/account";
import Login from "./pages/Auth/login";
import BlogPage from "./pages/Blog/blogPage";
import Contact from "./pages/Contact/contact";
import FAQ from "./pages/FAQ/faq";
import PrivacyPolicy from "./pages/Policies/PrivacyPolicy";
import Portfolio from "./pages/Portfolio/Portfolio";
import ReturnPolicy from "./pages/ReturnPolicy/returnPolicy";
import SearchPage from "./pages/Search/searchPage";
import TermsAndConditions from "./pages/Terms/termsCodititons";
import WishlistPage from "./pages/Wishlist/wishlist";
import ShippingPolicy from "./pages/shippingPolicy/shippingPolicyPage";

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <div className="App">
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
        </div>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
