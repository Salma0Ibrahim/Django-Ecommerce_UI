import { createSlice } from "@reduxjs/toolkit";
import {
  fetchShipment,
  createShipment,
  deleteShipment,
  updateShipment,
} from "../action/shipment-action";

const INITIAL_STATE = {
  shipments: [],
  loading: false,
  error: null,
};

const shipment = createSlice({
  name: "shipment",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShipment.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error when fetch starts
      })
      .addCase(fetchShipment.fulfilled, (state, action) => {
        state.loading = false;
        state.shipments = action.payload;
      })
      .addCase(fetchShipment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createShipment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createShipment.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.shipments = [...state.shipments, action.payload];
        console.log(`action`,action.payload)
        console.log(state.shipments)
      })
      .addCase(createShipment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteShipment.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error when deletion starts
      })
      .addCase(deleteShipment.fulfilled, (state, action) => {
        state.loading = false;
        state.shipments = state.shipments.filter(
          (shipment) => shipment.id !== action.payload
        );
      })
      .addCase(deleteShipment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateShipment.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error when update starts
      })
      .addCase(updateShipment.fulfilled, (state, action) => {
        state.loading = false;
        const updatedShipment = action.payload;
        const index = state.shipments.findIndex(
          (shipment) => shipment.id === updatedShipment.id
        );
        if (index !== -1) {
          state.shipments = [
            ...state.shipments.slice(0, index),
            updatedShipment,
            ...state.shipments.slice(index + 1),
          ];
        }
      })
      .addCase(updateShipment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default shipment.reducer;
