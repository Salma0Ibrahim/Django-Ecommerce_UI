import { GET_WISHLIST , ADD_TO_WISHLIST , REMOVE_FROM_WISHLIST } from "../constant/wishlist-constant";
import axios from "axios";

export const getWishlistAction = () => async dispatch => {
    try {
        const response = await axios.get('http://localhost:8000/wishlist/')
        dispatch({type:GET_WISHLIST , payload : response.data})
    } catch (error) {
        console.log("get wishlist error : " , error)
    }
}

export const addToWishlistAction = (formdata) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:8000/wishlist/',formdata)
        dispatch({type:ADD_TO_WISHLIST , payload : response.data})
    } catch (error) {
        console.log("add to wishlist error is = ",error)
    }
}

export const removeFromWishlistAction = wishlistId => async dispatch => {
    try {
        await axios.delete(`http://localhost:8000/wishlist/${wishlistId}/`);
        dispatch({ type: REMOVE_FROM_WISHLIST, payload: wishlistId });
    } catch (error) {
        console.log("delete from wishlist error is = ", error);
    }
}
