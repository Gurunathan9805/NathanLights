import { X } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartProps {
  cart: CartItem[];
  onClose: () => void;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onCheckout: () => void;
  cartTotal: number;
  cartCount: number;
}

export const Cart = ({
  cart,
  onClose,
  onRemove,
  onUpdateQuantity,
  onCheckout,
  cartTotal,
  cartCount,
}: CartProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div
        className="absolute right-0 top-0 h-full w-96 bg-gray-900 shadow-2xl p-6 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-amber-400">
            Cart ({cartCount})
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>
        
        {cart.length === 0 ? (
          <p className="text-gray-400">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-800 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-white font-medium">{item.name}</h3>
                    <p className="text-amber-400 font-bold">₹{item.price}</p>
                    <div className="flex items-center mt-1">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center bg-gray-700 rounded-l"
                      >
                        -
                      </button>
                      <span className="w-8 text-center bg-gray-700">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center bg-gray-700 rounded-r"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-700 pt-4">
              <div className="flex justify-between mb-4">
                <span className="text-gray-300">Subtotal</span>
                <span className="text-white font-bold">₹{cartTotal}</span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-lg font-medium transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
