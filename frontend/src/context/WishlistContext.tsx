import { createContext, useContext, useState, ReactNode } from 'react';
import type { Product } from '../types';

interface WishlistContextType {
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
  removeFromWishlist: (productId: number) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const isInWishlist = (productId: number) => {
    return wishlist.some(item => item.id === productId);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(currentWishlist => {
      const isProductInWishlist = currentWishlist.some(item => item.id === product.id);
      if (isProductInWishlist) {
        return currentWishlist.filter(item => item.id !== product.id);
      }
      return [...currentWishlist, product];
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist(currentWishlist => 
      currentWishlist.filter(item => item.id !== productId)
    );
  };

  return (
    <WishlistContext.Provider 
      value={{ 
        wishlist, 
        toggleWishlist, 
        isInWishlist,
        removeFromWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
