import { createSlice } from '@reduxjs/toolkit';
import {
  getCartItemsAction,
  updatecartitemAction,
  removecartitemAction,
  addcartitemAction,
} from '../action/cartitemaction';

const INITIAL_STATE = {
  loading: false,
  error: null,
  cartitems: [],
};

const cartitems = createSlice({
  name: 'cartitems',
  initialState: INITIAL_STATE,
  reducers: {
    resetCartItems: (state, action) => {
        state.cartitems=[]
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItemsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartItemsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cartitems = action.payload;
      })
      .addCase(getCartItemsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updatecartitemAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatecartitemAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { cartitemId, newQuantity } = action.payload;
        const updatedCartItems = state.cartitems.map((item) =>
          item.id === cartitemId ? { ...item, quantity: newQuantity } : item,
        );
        state.cartitems = updatedCartItems;
      })
      .addCase(updatecartitemAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removecartitemAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removecartitemAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cartitems = state.cartitems.filter(
          (cartitem) => cartitem.id !== action.payload,
        );
        console.log(state.cartitems);
      })
      .addCase(removecartitemAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addcartitemAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addcartitemAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cartitems = [...state.cartitems, action.payload];
      })
      .addCase(addcartitemAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


export const { resetCartItems } = cartitems.actions;
export default cartitems.reducer;
