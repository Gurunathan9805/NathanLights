import { useState } from "react";
import { useNavigate } from "react-router";

interface CheckoutPageProps {
  cart: any[];  // Replace 'any' with your actual cart item type
  cartTotal: number;
}

const CheckoutPage = ({ cart, cartTotal }: CheckoutPageProps) => {
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [showPaymentPage, setShowPaymentPage] = useState(false);
  const [upiId, setUpiId] = useState("");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const navigate = useNavigate();
  const handleCheckout = (e: any) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Validate checkout data
    // if (
    //   !checkoutData.name ||
    //   !checkoutData.email ||
    //   !checkoutData.phone ||
    //   !checkoutData.address ||
    //   !checkoutData.city ||
    //   !checkoutData.pincode
    // ) {
    //   alert("Please fill in all required fields!");
    //   return;
    // }

    // Redirect to payment page
    setShowPaymentPage(true);
  };

  const completeOrder = () => {
    const order = {
      id: Date.now(),
      items: [...cart],
      total: cartTotal + (cartTotal > 5000 ? 0 : 500),
      //   customerData: { ...checkoutData },
      paymentMethod,
      status: "Processing",
      date: new Date().toLocaleDateString(),
    } as any;
    // setOrders([...orders, order]);
    // setCart([]);
    setShowPaymentPage(false);
    alert(
      `Order placed successfully! Order ID: ${
        order.id
      }\n\nTotal: ₹${order.total.toLocaleString()}\nPayment Method: ${paymentMethod.toUpperCase()}\n\nYou will receive a confirmation email shortly.`
    );
    navigate("account");
  };

  const handlePaymentSubmit = (e: any) => {
    e.preventDefault();

    if (paymentMethod === "upi") {
      if (!upiId) {
        alert("Please enter your UPI ID");
        return;
      }
      alert(`Processing UPI payment via ${upiId}...`);
      setTimeout(() => {
        alert("Payment successful!");
        completeOrder();
      }, 1000);
    } else if (paymentMethod === "card") {
      if (
        !cardDetails.number ||
        !cardDetails.name ||
        !cardDetails.expiry ||
        !cardDetails.cvv
      ) {
        alert("Please fill in all card details");
        return;
      }
      if (cardDetails.number.length < 16) {
        alert("Please enter a valid 16-digit card number");
        return;
      }
      if (cardDetails.cvv.length < 3) {
        alert("Please enter a valid CVV");
        return;
      }
      alert("Processing card payment...");
      setTimeout(() => {
        alert("Payment successful!");
        completeOrder();
      }, 1000);
    }
  };

  // Payment Page View
  if (showPaymentPage) {
    return (
      <div className="min-h-screen bg-linear-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-16">
        <div className="max-w-2xl mx-auto px-4">
          <button
            onClick={() => setShowPaymentPage(false)}
            className="text-amber-400 hover:underline mb-6 flex items-center"
          >
            ← Back to Checkout
          </button>

          <div className="bg-gray-800 p-8 rounded-lg shadow-2xl">
            <h1 className="text-3xl font-bold text-amber-400 mb-6 text-center">
              Complete Payment
            </h1>

            {/* Order Summary */}
            <div className="bg-gray-700 p-6 rounded-lg mb-6">
              <h2 className="text-xl font-bold text-white mb-4">
                Order Summary
              </h2>
              <div className="space-y-2 text-gray-300">
                {cart.map((item: any) => (
                  <div key={item.id} className="flex justify-between">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className="border-t border-gray-600 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-400">
                      {cartTotal > 5000 ? "FREE" : "₹500"}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between text-xl font-bold text-amber-400 pt-2 border-t border-gray-600">
                  <span>Total Amount</span>
                  <span>
                    ₹
                    {(
                      cartTotal + (cartTotal > 5000 ? 0 : 500)
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-4">
                Select Payment Method
              </h2>
              <div className="space-y-3">
                <label className="flex items-center p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === "upi"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3 w-5 h-5"
                  />
                  <div className="flex-1">
                    <span className="text-white font-semibold">
                      UPI Payment
                    </span>
                    <p className="text-gray-400 text-sm">
                      Pay using Google Pay, PhonePe, Paytm, etc.
                    </p>
                  </div>
                </label>
                <label className="flex items-center p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3 w-5 h-5"
                  />
                  <div className="flex-1">
                    <span className="text-white font-semibold">
                      Credit / Debit Card
                    </span>
                    <p className="text-gray-400 text-sm">
                      Visa, Mastercard, Rupay accepted
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Payment Form */}
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              {paymentMethod === "upi" && (
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Enter UPI ID *
                  </label>
                  <input
                    key="upi-input"
                    type="text"
                    placeholder="yourname@paytm / yourname@gpay"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-amber-500 focus:outline-none cursor-text"
                    required
                    autoFocus
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    Enter your UPI ID to complete the payment
                  </p>
                </div>
              )}

              {paymentMethod === "card" && (
                <>
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Card Number *
                    </label>
                    <input
                      key="card-number"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.number}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          number: e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 16),
                        })
                      }
                      className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-amber-500 focus:outline-none cursor-text"
                      required
                      autoFocus
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Cardholder Name *
                    </label>
                    <input
                      key="card-name"
                      type="text"
                      placeholder="JOHN DOE"
                      value={cardDetails.name}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          name: e.target.value.toUpperCase(),
                        })
                      }
                      className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-amber-500 focus:outline-none cursor-text"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-semibold mb-2">
                        Expiry Date *
                      </label>
                      <input
                        key="card-expiry"
                        type="text"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\D/g, "");
                          if (val.length >= 2)
                            val = val.slice(0, 2) + "/" + val.slice(2, 4);
                          setCardDetails({ ...cardDetails, expiry: val });
                        }}
                        className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-amber-500 focus:outline-none cursor-text"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-white font-semibold mb-2">
                        CVV *
                      </label>
                      <input
                        key="card-cvv"
                        type="password"
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={(e) =>
                          setCardDetails({
                            ...cardDetails,
                            cvv: e.target.value.replace(/\D/g, "").slice(0, 3),
                          })
                        }
                        className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-amber-500 focus:outline-none cursor-text"
                        maxLength={3}
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition mt-6"
              >
                {paymentMethod === "upi"
                  ? "Pay with UPI"
                  : `Pay ₹${(
                      cartTotal + (cartTotal > 5000 ? 0 : 500)
                    ).toLocaleString()}`}
              </button>

              <p className="text-gray-400 text-sm text-center mt-4">
                🔒 Your payment is secure and encrypted
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-amber-400 mb-8">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <form onSubmit={handleCheckout} className="space-y-4">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-white mb-4">
                Billing Details
              </h2>
              <input
                key="checkout-name"
                type="text"
                placeholder="Full Name *"
                required
                // value={checkoutData.name}
                // onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded mb-3 border-2 border-gray-600 focus:border-amber-500 focus:outline-none cursor-text"
              />
              <input
                key="checkout-email"
                type="email"
                placeholder="Email *"
                required
                // value={checkoutData.email}
                // onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded mb-3 border-2 border-gray-600 focus:border-amber-500 focus:outline-none cursor-text"
              />
              <input
                key="checkout-phone"
                type="tel"
                placeholder="Phone *"
                required
                // value={checkoutData.phone}
                // onChange={(e) => handleInputChange("phone", e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded mb-3 border-2 border-gray-600 focus:border-amber-500 focus:outline-none cursor-text"
              />
              <textarea
                key="checkout-address"
                placeholder="Address *"
                required
                // value={checkoutData.address}
                // onChange={(e) => handleInputChange("address", e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded mb-3 border-2 border-gray-600 focus:border-amber-500 focus:outline-none cursor-text resize-none"
                rows={3}
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  key="checkout-city"
                  type="text"
                  placeholder="City *"
                  required
                  // value={checkoutData.city}
                  // onChange={(e) => handleInputChange("city", e.target.value)}
                  className="px-4 py-3 bg-gray-700 text-white rounded border-2 border-gray-600 focus:border-amber-500 focus:outline-none cursor-text"
                />
                <input
                  key="checkout-pincode"
                  type="text"
                  placeholder="Pincode *"
                  required
                  // value={checkoutData.pincode}
                  // onChange={(e) => handleInputChange("pincode", e.target.value)}
                  className="px-4 py-3 bg-gray-700 text-white rounded border-2 border-gray-600 focus:border-amber-500 focus:outline-none cursor-text"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-amber-600 transition"
            >
              Proceed to Payment →
            </button>
          </form>

          {/* Order Summary */}
          <div>
            <div className="bg-gray-800 p-6 rounded-lg sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-4">
                Order Summary
              </h2>
              <div className="space-y-4 mb-6">
                {cart.map((item: any) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-white font-semibold">{item.name}</p>
                      <p className="text-gray-400 text-sm">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-amber-400 font-bold">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-700 pt-4 space-y-2">
                <div className="flex justify-between text-white">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white">
                  <span>Shipping</span>
                  <span className="text-green-400">
                    {cartTotal > 5000 ? "FREE" : "₹500"}
                  </span>
                </div>
                <div className="flex justify-between text-xl font-bold text-amber-400 pt-2 border-t border-gray-700">
                  <span>Total</span>
                  <span>
                    ₹
                    {(
                      cartTotal + (cartTotal > 5000 ? 0 : 500)
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
