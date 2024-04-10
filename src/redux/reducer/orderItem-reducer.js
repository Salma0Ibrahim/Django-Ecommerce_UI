// import {
//   GET_ORDER_ITEM,
//   ADD_ORDER_ITEM,
//   UPDATE_ORDER_ITEM,
//   REMOVE_ORDER_ITEM,
// } from "../constant/orders-constant";

// const INITIAL_STATE = {
//   orderItems: [],
// };

// export const orderItemReducer = (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//     case GET_ORDER_ITEM:
//       return {
//         orderItems: [...action.payload],
//       };
//     case ADD_ORDER_ITEM:
//       return {
//         orderItems: [...state.orderItems, action.payload],
//       };
//     case UPDATE_ORDER_ITEM:
//       return {
//         orderItems: state.orderItems.filter((item) => item.id !== action.payload),
//       };
//     case REMOVE_ORDER_ITEM:
//       return {
//         orderItems: state.orderItems.filter((item) => item.id !== action.payload),
//       };
//     default:
//       return state;
//   }
// };
