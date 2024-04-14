import {
  GET_WISHLIST,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
} from '../constant/wishlist-constant';
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from '../apis/wishlist-apis';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getWishlistAction = createAsyncThunk(
  GET_WISHLIST,
  async (customerId) => {
    try {
      const response = await getWishlist(customerId);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);

export const addToWishlistAction = createAsyncThunk(
  ADD_TO_WISHLIST,
  async (formdata) => {
    try {
      const response = await addToWishlist(formdata);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);

export const removeFromWishlistAction = createAsyncThunk(
  REMOVE_FROM_WISHLIST,
  async (wishlistId) => {
    try {
      await removeFromWishlist(wishlistId);
      return wishlistId;
    } catch (error) {
      console.log(error);
    }
  },
);
