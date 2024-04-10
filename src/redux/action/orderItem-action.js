import {
  GET_ORDER_ITEM,
  ADD_ORDER_ITEM,
  UPDATE_ORDER_ITEM,
  REMOVE_ORDER_ITEM,
} from "../constant/orders-constant";

import axiosInstance from '../../apis/config' 

export const getOrderItemAction = () => async dispatch => {
  try {
      const response = await axiosInstance.get('/orderItem/')
      dispatch({type:GET_ORDER_ITEM , payload : response.data})
  } catch (error) {
      console.log("get orderItem error : " , error)
  }
}

export const addToOrderItemAction = (formdata) => async dispatch => {
  try {
      const response = await axiosInstance.post('/orderItem/',formdata)
      dispatch({type:ADD_ORDER_ITEM , payload : response.data})
  } catch (error) {
      console.log("add to orderItem error is = ",error)
  }
}

export const removeOrderItemAction = orderItemId => async dispatch => {
  try {
      await axiosInstance.delete(`/orderItem/${orderItemId}/`);
      dispatch({ type: REMOVE_ORDER_ITEM, payload: orderItemId });
  } catch (error) {
      console.log("delete from orderItem error is = ", error);
  }
}

export const updateOrderItemAction = orderItemId => async dispatch => {
  try {
    await axiosInstance.patch(`/orderItem/${orderItemId}/`);
    dispatch({ type: UPDATE_ORDER_ITEM, payload: orderItemId });
  } catch (error) {
    console.log("update from orderItem error is = ", error);
  }
}

