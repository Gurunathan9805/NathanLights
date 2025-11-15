import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Product } from "./productsSlice";
import api from "../../utils/api";

// Thunks
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/cart");
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart"
      );
    }
  }
);

export const addToCartThunk = createAsyncThunk(
  "cart/addToCart",
  async (
    { productId, quantity = 1 }: { productId: string; quantity?: number },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await api.post("/cart", { productId, quantity });
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add to cart"
      );
    }
  }
);

export const updateCartItemThunk = createAsyncThunk(
  "cart/updateCartItem",
  async (
    { productId, quantity }: { productId: string; quantity: number },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await api.put(`/cart/${productId}`, { quantity });
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update cart item"
      );
    }
  }
);

export const removeFromCartThunk = createAsyncThunk(
  "cart/removeFromCart",
  async (productId: string, { rejectWithValue }) => {
    try {
      await api.delete(`/cart/${productId}`);
      return productId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove from cart"
      );
    }
  }
);

export const clearCartThunk = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      await api.delete("/cart");
      return [];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to clear cart"
      );
    }
  }
);

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return { totalItems, totalPrice };
};

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isCartOpen: false,
  status: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Keep synchronous actions for optimistic updates
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      const { totalItems, totalPrice } = calculateTotals(state.items);
      state.totalItems = totalItems;
      state.totalPrice = totalPrice;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      const { totalItems, totalPrice } = calculateTotals(state.items);
      state.totalItems = totalItems;
      state.totalPrice = totalPrice;
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
        const { totalItems, totalPrice } = calculateTotals(state.items);
        state.totalItems = totalItems;
        state.totalPrice = totalPrice;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
  
    // Read (if needed for initialization)
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      const { totalItems, totalPrice } = calculateTotals(action.payload);
      state.totalItems = totalItems;
      state.totalPrice = totalPrice;
      state.status = "succeeded";
    },

    // Update
    updateCartItem: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<CartItem> }>
    ) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload.changes,
        };
        const { totalItems, totalPrice } = calculateTotals(state.items);
        state.totalItems = totalItems;
        state.totalPrice = totalPrice;
      }
      state.status = "succeeded";
    },

    // Status Management
    setCartLoading: (state) => {
      state.status = "loading";
    },
    setCartError: (state, action: PayloadAction<string>) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle fetch cart
    builder.addCase(fetchCart.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items = action.payload.items;
      state.totalItems = action.payload.totalItems;
      state.totalPrice = action.payload.totalPrice;
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as string;
    });

    // Handle add to cart
    builder.addCase(addToCartThunk.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addToCartThunk.fulfilled, (state) => {
      state.status = "succeeded";
    });
    builder.addCase(addToCartThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as string;
    });

    // Handle update cart item
    builder.addCase(updateCartItemThunk.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateCartItemThunk.fulfilled, (state) => {
      state.status = "succeeded";
    });
    builder.addCase(updateCartItemThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as string;
    });

    // Handle remove from cart
    builder.addCase(removeFromCartThunk.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(removeFromCartThunk.fulfilled, (state) => {
      state.status = "succeeded";
    });
    builder.addCase(removeFromCartThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as string;
    });

    // Handle clear cart
    builder.addCase(clearCartThunk.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(clearCartThunk.fulfilled, (state) => {
      state.status = "succeeded";
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    });
    builder.addCase(clearCartThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as string;
    });
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  closeCart,
} = cartSlice.actions;

export default cartSlice.reducer;
