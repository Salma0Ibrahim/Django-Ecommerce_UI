import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FETCH_SHIPMENT,
  ADD_SHIPMENT,
  REMOVE_SHIPMENT,
  UPDATE_SHIPMENT,
} from "../constant/shipment-constant";
import {
  getShipments,
  addShipment,
  removeShipment,
  updateShipment as updateShipmentApi,
} from "../apis/shipment-apis";

export const fetchShipment = createAsyncThunk(FETCH_SHIPMENT, async () => {
  try {
    const response = await getShipments();
    return response;
  } catch (error) {
    console.error("Error fetching shipments:", error);
    throw error;
  }
});


export const createShipment = createAsyncThunk(ADD_SHIPMENT, async (data) => {
  const response = await addShipment(data);
  return response;
});

export const deleteShipment = createAsyncThunk(
  REMOVE_SHIPMENT,
  async (shipmentId) => {
    await removeShipment(shipmentId);
    return shipmentId;
  }
);

export const updateShipment = createAsyncThunk(
  UPDATE_SHIPMENT,
  async ({ shipmentId, data }) => {
    const response = await updateShipmentApi(shipmentId, data);
    return response;
  }
);
