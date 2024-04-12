import { createSlice } from "@reduxjs/toolkit";
import {
  fetchOrder,
  createOrder,
  fetchOrderItem,
  createOrderItem,
} from "../action/order-actions";

const INITIAL_STATE = {
  loading: false,
  error: null,
  orders: [],
  orderItems: [],
};

const order = createSlice({
  name: 'orders',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.orders = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.orders = [...state.orders, action.payload]
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOrderItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderItem.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.orderItems = action.payload;
      })
      .addCase(fetchOrderItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createOrderItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrderItem.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.orderItems = [...state.orderItems, action.payload]
      })
      .addCase(createOrderItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default order.reducer;
