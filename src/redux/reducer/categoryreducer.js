import {GET_CATEGORIES , ADD_CATEGORY , DELETE_CATEGORY , UPDATE_CATEGORY} from '../constant/categoryconstant'

const INITIAL_STATE = {
    categories : []
}

export const categoryReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_CATEGORIES:
            return {
                categories: [...action.payload],
            };
        case ADD_CATEGORY:
            return {
                categories: [...state.categories, action.payload],
            };
        case DELETE_CATEGORY:
            return {
                categories: state.categories.filter(item => item.id !== action.payload),
            };
        default:
            return state;
    }
}
