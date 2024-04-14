import {
  GET_CARTITEMS,
  ADD_CARTITEM,
  REMOVE_CARTITEM,
  UPDATE_CARTITEM_QUANTITY,
} from '../constant/cartitemsconstant';

const INITIAL_STATE = {
  cartitems: [],
};

export const cartItemReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CARTITEMS:
      return {
        cartitems: [...action.payload],
      };
    case ADD_CARTITEM:
      return {
        cartitems: [...state.cartitems, action.payload],
      };
    case REMOVE_CARTITEM:
      return {
        cartitems: state.cartitems.filter((item) => item.id !== action.payload),
      };
    case UPDATE_CARTITEM_QUANTITY:
      const { cartitemId, newQuantity } = action.payload;
      const updatedCartItems = state.cartitems.map((item) => {
        if (item.id === cartitemId) {
          return {
            ...item,
            quantity: newQuantity,
          };
        }
        return item;
      });

      return {
        ...state,
        cartitems: updatedCartItems,
      };
    default:
      return state;
  }
};
