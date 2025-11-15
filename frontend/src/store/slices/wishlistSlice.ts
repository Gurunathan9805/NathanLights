import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Product } from "./productsSlice";
import api from "../../utils/api";

// Thunks
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/wishlist");
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch wishlist"
      );
    }
  }
);

export const addToWishlistThunk = createAsyncThunk(
  "wishlist/addToWishlist",
  async (productId: string, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/wishlist/${productId}`);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add to wishlist"
      );
    }
  }
);

export const removeFromWishlistThunk = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (productId: string, { rejectWithValue }) => {
    try {
      await api.delete(`/wishlist/${productId}`);
      return productId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove from wishlist"
      );
    }
  }
);

interface WishlistState {
  items: Product[];
  isWishlistOpen: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: WishlistState = {
  items: [],
  isWishlistOpen: false,
  status: "idle",
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // Keep synchronous actions for optimistic updates
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (!existingItem) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearWishlist: (state) => {
      state.items = [];
    },
    toggleWishlist: (state) => {
      state.isWishlistOpen = !state.isWishlistOpen;
    },
    closeWishlist: (state) => {
      state.isWishlistOpen = false;
    },
    // addToWishlist: (state, action: PayloadAction<Product>) => {

    updateWishlistItem: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    // Handle fetch wishlist
    builder.addCase(fetchWishlist.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchWishlist.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items = action.payload;
    });
    builder.addCase(fetchWishlist.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as string;
    });

    // Handle add to wishlist
    builder.addCase(addToWishlistThunk.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addToWishlistThunk.fulfilled, (state) => {
      state.status = "succeeded";
    });
    builder.addCase(addToWishlistThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as string;
    });

    // Handle remove from wishlist
    builder.addCase(removeFromWishlistThunk.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(removeFromWishlistThunk.fulfilled, (state) => {
      state.status = "succeeded";
    });
    builder.addCase(removeFromWishlistThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as string;
    });
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  toggleWishlist,
  closeWishlist,
  updateWishlistItem,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
