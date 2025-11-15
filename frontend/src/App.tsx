import { Routes, Route } from "react-router";
import "./App.css";
import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import CheckoutPage from "./pages/Checkout/checkoutPage";
import ProductDetailPage from "./pages/Product/productDetailPage";
import Account from "./pages/Account/account";

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </div>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
