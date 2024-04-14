import {
  GET_CARTITEMS,
  ADD_CARTITEM,
  REMOVE_CARTITEM,
  UPDATE_CARTITEM_QUANTITY,
} from '../constant/cartitemsconstant';
import {
  getCartItem,
  addCartItem,
  removeCartItem,
  updateCartItem,
} from '../apis/cartItem-apis';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getCartItemsAction = createAsyncThunk(
  GET_CARTITEMS,
  async (cartId) => {
    try {
      const response = await getCartItem(cartId);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);

export const addcartitemAction = createAsyncThunk(
  ADD_CARTITEM,
  async (formdata) => {
    try {
      const response = await addCartItem(formdata);
      return response;
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);

export const removecartitemAction = createAsyncThunk(
  REMOVE_CARTITEM,
  async (cartItemId) => {
    try {
      await removeCartItem(cartItemId);
      return cartItemId;
    } catch (error) {
      console.log(error);
    }
  },
);

export const updatecartitemAction = createAsyncThunk(
  UPDATE_CARTITEM_QUANTITY,
  async ({ cartItemId, formdata }, { dispatch }) => {
    try {
      await updateCartItem(cartItemId, formdata);
      console.log("in action:",cartItemId,formdata.quantity)
      return {
        cartitemId: cartItemId,
        newQuantity: formdata.quantity,
      };
    } catch (error) {
      console.log("cartitemid = ",cartItemId)
      console.log("formdata = ",formdata)
      console.log("the error in update = ",error)
    }
   
  }
);
