import { createSlice } from "@reduxjs/toolkit";
import {
  getWishlistAction,
  addToWishlistAction,
  removeFromWishlistAction,
} from "../action/wishlist-action";

const INITIAL_STATE = {
  loading: false,
  error: null,
  wishlists: [],
};

const wishlist = createSlice({
  name: 'wishlist',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWishlistAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWishlistAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.wishlists = action.payload;
      })
      .addCase(getWishlistAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addToWishlistAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWishlistAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.wishlists = [...state.wishlists,action.payload]
      })
      .addCase(addToWishlistAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeFromWishlistAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromWishlistAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.wishlists = state.wishlists.filter(
          (wishlist) => wishlist.id !== action.payload
        );
      })
      .addCase(removeFromWishlistAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default wishlist.reducer;