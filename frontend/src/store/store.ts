import { configureStore } from "@reduxjs/toolkit";
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import cartSlice from "./slices/cartSlice";
import productsSlice from "./slices/productsSlice";
import authSlice from "./slices/authSlice";
import wishlistSlice from "./slices/wishlistSlice";
import ordersSlice from "./slices/orderSlice";
import contactSlice from "./slices/contactSlice";

export const store = configureStore({
  reducer: {
    // Add your reducers here
    auth: authSlice,
    products: productsSlice,
    cart: cartSlice,
    wishlist: wishlistSlice,
    orders: ordersSlice,
    contact: contactSlice,
  },
  devTools: import.meta.env.VITE_NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
