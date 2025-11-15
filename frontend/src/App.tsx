// Update the imports section
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
import UserLayout from "./layouts/userLayout";
import AdminLayout from "./layouts/adminLayout";
import AdminDashboard from "./pages/adminDashboard/dashboard/DashboardPage";
import AdminProducts from "./pages/adminDashboard/products/ProductsPage";
import AdminOrders from "./pages/adminDashboard/orders/OrdersPage";
import AdminCustomers from "./pages/adminDashboard/customers/CustomersPage";
import AdminAnalytics from "./pages/adminDashboard/analytics/AnalyticsPage";
import AdminSettings from "./pages/adminDashboard/settings/SettingsPage";

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <div className="App">
          <Routes>
            {/* Public Routes with UserLayout */}
            <Route element={<UserLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/about" element={<Account />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/return-policy" element={<ReturnPolicy />} />
              <Route path="/shipping-policy" element={<ShippingPolicy />} />
              <Route path="/terms-conditions" element={<TermsAndConditions />} />
              <Route path="/login" element={<Login />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Route>

            {/* Admin Routes with AdminLayout */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="customers" element={<AdminCustomers />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* 404 - Not Found */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </CartProvider>
    </UserProvider>
  );
}

export default App;