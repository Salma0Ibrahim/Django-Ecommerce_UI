import {GET_WISHLIST,ADD_TO_WISHLIST,REMOVE_FROM_WISHLIST} from '../constant/wishlist-constant'

const INITIAL_STATE = {
    wishlists : []
}

export const wishlistreducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_WISHLIST:
            return {
                wishlists: [...action.payload],
            };
        case ADD_TO_WISHLIST:
            return {
                wishlists: [...state.wishlists, action.payload],
            };
        case REMOVE_FROM_WISHLIST:
            return {
                wishlists: state.wishlists.filter(item => item.id !== action.payload),
            };
        default:
            return state;
    }
}
