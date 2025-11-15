import { Star } from "lucide-react";

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

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
}

export const ProductCard = ({
  product,
  onViewDetails,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
}: ProductCardProps) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover cursor-pointer"
          onClick={() => onViewDetails(product)}
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-2 right-2 p-2 rounded-full ${
            isInWishlist ? 'text-red-500' : 'text-gray-300 hover:text-amber-400'
          } bg-gray-900 bg-opacity-60`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill={isInWishlist ? 'currentColor' : 'none'}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
        {!product.inStock && (
          <div className="absolute top-0 left-0 bg-red-600 text-white px-2 py-1 text-xs font-bold">
            OUT OF STOCK
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-white mb-1">
            {product.name}
          </h3>
          <span className="text-amber-400 font-bold">₹{product.price}</span>
        </div>
        <div className="flex items-center mb-2">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                className="mr-0.5"
              />
            ))}
          </div>
          <span className="text-gray-400 text-sm ml-1">
            ({product.reviews})
          </span>
        </div>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex space-x-2">
          <button
            onClick={() => onViewDetails(product)}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded transition"
          >
            View Details
          </button>
          <button
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className={`flex-1 py-2 px-4 rounded transition ${
              product.inStock
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
