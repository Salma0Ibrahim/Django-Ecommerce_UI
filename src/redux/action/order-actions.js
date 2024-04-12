import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GET_ORDER_ITEM,
  ADD_ORDER_ITEM,
  GET_ORDER,
  ADD_ORDER,
} from "../constant/orders-constant";
import { getOrder, addOrder, getOrderItem, addOrderItem } from "../apis/order";

export const fetchOrder = createAsyncThunk(GET_ORDER, async () => {
  try {
    const response = await getOrder();
    return response;
  } catch (error) {
    console.log(error);
  }
})

export const createOrder = createAsyncThunk(ADD_ORDER, async(data) => {
  try {
    const response = await addOrder(data);
    return response;
  } catch (error) {
    console.log(error);
  }
})

export const fetchOrderItem = createAsyncThunk(GET_ORDER_ITEM, async() => {
  try {
    const response = await getOrderItem()
    return response;
  } catch (error) {
    console.log(error);
  }
})

export const createOrderItem = createAsyncThunk(ADD_ORDER_ITEM, async(data) => {
  try {
    const response = await addOrderItem(data);
    return response;
  } catch (error) {
    console.log(error);
  }
})