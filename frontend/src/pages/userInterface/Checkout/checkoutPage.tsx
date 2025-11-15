import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { clearCart } from "../../../store/slices/cartSlice";
import { createOrder, resetOrderStatus } from "../../../store/slices/orderSlice";
import type { CheckoutData, CardDetails } from "../../../types/checkout";

const CheckoutPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items: cart, totalPrice: cartTotal } = useAppSelector((state) => state.cart);
  const { status: orderStatus, error: orderError } = useAppSelector((state) => state.orders);
  
  const [showPaymentPage, setShowPaymentPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  type PaymentMethod = "upi" | "card";
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  
  const [formData, setFormData] = useState<CheckoutData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: 'upi',
    upiId: "",
  });
  
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  
  const [errors, setErrors] = useState<Partial<CheckoutData & CardDetails>>({});

  // Reset order status when component mounts
  useEffect(() => {
    return () => {
      dispatch(resetOrderStatus());
    };
  }, [dispatch]);

  const validateForm = (): boolean => {
    const newErrors: Partial<CheckoutData> = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.match(/^\d{10}$/)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.pincode.match(/^\d{6}$/)) {
      newErrors.pincode = "Please enter a valid 6-digit pincode";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setShowPaymentPage(true);
  };

  const completeOrder = async () => {
    setIsLoading(true);
    try {
      const orderData = {
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        total: cartTotal + (cartTotal > 5000 ? 0 : 500),
        customerData: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        },
        paymentMethod,
        ...(paymentMethod === 'card' && { cardDetails })
      };

      const resultAction = await dispatch(createOrder(orderData));
      
      if (createOrder.fulfilled.match(resultAction)) {
        dispatch(clearCart());
        navigate("/order-confirmation", {
          state: {
            orderId: resultAction.payload.id,
            total: resultAction.payload.total,
            items: resultAction.payload.items
          }
        });
      } else {
        throw new Error(orderError || 'Failed to place order');
      }
    } catch (error) {
      console.error('Order failed:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === 'upi' && !formData.upiId) {
      setErrors(prev => ({
        ...prev,
        upiId: 'UPI ID is required'
      }));
      return;
    }

    if (paymentMethod === 'card') {
      const cardErrors: Partial<CardDetails> = {};
      if (!cardDetails.number.match(/^\d{16}$/)) {
        cardErrors.number = 'Enter a valid 16-digit card number';
      }
      if (!cardDetails.name.trim()) {
        cardErrors.name = 'Cardholder name is required';
      }
      if (!cardDetails.expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
        cardErrors.expiry = 'Enter a valid expiry (MM/YY)';
      }
      if (!cardDetails.cvv.match(/^\d{3,4}$/)) {
        cardErrors.cvv = 'Enter a valid CVV';
      }
      
      if (Object.keys(cardErrors).length > 0) {
        setErrors(prev => ({
          ...prev,
          ...cardErrors
        }));
        return;
      }
    }

    await completeOrder();
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
                    onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
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
                    onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
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
            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              {paymentMethod === "upi" && (
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Enter UPI ID *
                  </label>
                  <input
                    type="text"
                    name="upiId"
                    placeholder="yourname@paytm / yourname@gpay"
                    value={formData.upiId || ''}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-700 text-white rounded-lg border-2 ${
                      errors.upiId ? 'border-red-500' : 'border-gray-600'
                    } focus:border-amber-500 focus:outline-none`}
                    required
                    autoFocus
                  />
                  {errors.upiId && (
                    <p className="text-red-500 text-sm mt-1">{errors.upiId}</p>
                  )}
                  <p className="text-gray-400 text-sm mt-2">
                    Enter your UPI ID to complete the payment
                  </p>
                </div>
              )}

              {paymentMethod === "card" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      name="number"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.number}
                      onChange={handleCardChange}
                      className={`w-full px-4 py-3 bg-gray-700 text-white rounded-lg border-2 ${
                        errors.number ? 'border-red-500' : 'border-gray-600'
                      } focus:border-amber-500 focus:outline-none`}
                      required
                    />
                    {errors.number && (
                      <p className="text-red-500 text-sm mt-1">{errors.number}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="JOHN DOE"
                      value={cardDetails.name}
                      onChange={handleCardChange}
                      className={`w-full px-4 py-3 bg-gray-700 text-white rounded-lg border-2 ${
                        errors.name ? 'border-red-500' : 'border-gray-600'
                      } focus:border-amber-500 focus:outline-none`}
                      required
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-semibold mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        name="expiry"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={handleCardChange}
                        className={`w-full px-4 py-3 bg-gray-700 text-white rounded-lg border-2 ${
                          errors.expiry ? 'border-red-500' : 'border-gray-600'
                        } focus:border-amber-500 focus:outline-none`}
                        maxLength={5}
                        required
                      />
                      {errors.expiry && (
                        <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-white font-semibold mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={handleCardChange}
                        className={`w-full px-4 py-3 bg-gray-700 text-white rounded-lg border-2 ${
                          errors.cvv ? 'border-red-500' : 'border-gray-600'
                        } focus:border-amber-500 focus:outline-none`}
                        maxLength={4}
                        required
                      />
                      {errors.cvv && (
                        <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition mt-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  'Processing...'
                ) : paymentMethod === "upi" ? (
                  "Pay with UPI"
                ) : (
                  `Pay ₹${(cartTotal + (cartTotal > 5000 ? 0 : 500)).toLocaleString()}`
                )}
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
