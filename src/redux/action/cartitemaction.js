import { GET_CARTITEMS , ADD_CARTITEM , REMOVE_CARTITEM , UPDATE_CARTITEM_QUANTITY } from "../constant/cartitemsconstant";
import axios from "axios";

export const getCartItemsAction = (cartId) => async dispatch => {
    try {
        const response = await axios.get(`http://localhost:8000/cartitem/searchitems/${cartId}/`)
        dispatch({type:GET_CARTITEMS , payload : response.data})
    } catch (error) {
        console.log("get cartitems error : " , error)
    }
}

export const addcartitemAction = (formdata) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:8000/cartitem/',formdata)
        dispatch({type:ADD_CARTITEM , payload : response.data})
    } catch (error) {
        console.log("add cartitem error is = ",error)
    }
}


export const removecartitemAction = (cartitemId) => async dispatch => {
    try {
        await axios.delete(`http://localhost:8000/cartitem/${cartitemId}/`);
        dispatch({ type: REMOVE_CARTITEM, payload: cartitemId });
    } catch (error) {
        console.log("delete cartitem error is = ", error);
    }
}

export const updatecartitemAction = (cartitemId,formdata) => async dispatch => {
    try {
        await axios.put(`http://localhost:8000/cartitem/${cartitemId}/`,formdata);
        dispatch({
            type: UPDATE_CARTITEM_QUANTITY,
            payload: {
                cartitemId: cartitemId,
                newQuantity: formdata.quantity
            }
        });
    } catch (error) {
        console.log("update cartitem error is = ", error);
    }
}
