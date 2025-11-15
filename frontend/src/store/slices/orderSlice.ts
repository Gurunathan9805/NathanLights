import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { OrderData } from '../../types/checkout';
import api from '../../utils/api';

interface OrderState {
  orders: OrderData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  currentOrder: OrderData | null;
}

const initialState: OrderState = {
  orders: [],
  status: 'idle',
  error: null,
  currentOrder: null,
};

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData: Omit<OrderData, 'orderDate' | 'status'>, { rejectWithValue }) => {
    try {
      const response = await api.post('/orders', {
        ...orderData,
        status: 'Processing',
        orderDate: new Date().toISOString(),
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create order');
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    resetOrderStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentOrder, resetOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
