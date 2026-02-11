import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OrderStatus, type OrderItem, type OrderState } from "./types";
import { ordersApi } from "./ordersApi";
import { clearError } from "../auth/authSlice";

const initialState: OrderState = {
  orders: [],
  isLoading: false,
  error: null,
};

export const addOrder = createAsyncThunk(
  "order/",
  async (items: OrderItem[], { rejectWithValue }) => {
    try {
      const response = await ordersApi.addOrder(items);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to place order",
      );
    }
  },
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrder.pending, (state) => {
        ((state.isLoading = true), (state.error = null));
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        ((state.isLoading = false),
          (state.error = null),
          (state.orders = [...state.orders, ...action.payload]));
      })
      .addCase(addOrder.rejected, (state, action) => {
        ((state.isLoading = false), (state.error = action.payload as string));
      });
  },
});

export default ordersSlice.reducer;