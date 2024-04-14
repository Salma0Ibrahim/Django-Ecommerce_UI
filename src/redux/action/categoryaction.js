import {
  GET_CATEGORIES,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
} from '../constant/categoryconstant';
import axios from 'axios';
const base_url = import.meta.env.VITE_base_url;
export const getCategoriesAction = () => async (dispatch) => {
  try {
    const response = await axios.get(`${base_url}category/`);
    dispatch({ type: GET_CATEGORIES, payload: response.data });
  } catch (error) {
    console.log('get categories error : ', error);
  }
};

export const addCategoryAction = (formdata) => async (dispatch) => {
  try {
    const response = await axios.post('${base_url}category/', formdata);
    dispatch({ type: ADD_CATEGORY, payload: response.data });
  } catch (error) {
    console.log('add Category error is = ', error);
  }
};

export const removeCategoryAction = (categoryId) => async (dispatch) => {
  try {
    await axios.delete(`${base_url}category/${categoryId}/`);
    dispatch({ type: DELETE_CATEGORY, payload: categoryId });
  } catch (error) {
    console.log('delete cartitem error is = ', error);
  }
};

// export const updatecartitemAction = (cartitemId,formdata) => async dispatch => {
//     try {
//         await axios.put(`${base_url}cartitem/${cartitemId}/`,formdata);
//         dispatch({
//             type: UPDATE_CARTITEM_QUANTITY,
//             payload: {
//                 cartitemId: cartitemId,
//                 newQuantity: formdata.quantity
//             }
//         });
//     } catch (error) {
//         console.log("update cartitem error is = ", error);
//     }
// }
