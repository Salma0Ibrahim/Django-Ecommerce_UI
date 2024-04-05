import {GET_USERS} from '../constant/userconstant'

export const register = (formdata) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:8000/users/register/',formdata)
        dispatch({type:GET_USERS , payload : response.data})
    } catch (error) {
        console.log("get user error : " , error)
    }
}