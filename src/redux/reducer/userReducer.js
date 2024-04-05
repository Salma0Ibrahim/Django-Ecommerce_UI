import {GET_USERS} from '../constant/userconstant'

const INITIAL_STATE = {
    users : []
}


export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_USERS:
            return {
                users: [...action.payload],
            };
        default:
            return state;
    }
}
