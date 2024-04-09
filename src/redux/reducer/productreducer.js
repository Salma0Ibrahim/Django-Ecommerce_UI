import { GET_PRODUCT , GET_PRODUCTS } from "../constant/productconstant";

const INITIAL_STATE = {
    products : []
}

export const productreducer = (state = INITIAL_STATE , action) => {
    switch (action.type){
        case GET_PRODUCTS:
            return{
                products: [...action.payload],
            };
        case GET_PRODUCT:
            return{
                product : action.payload,
            };
        default:
            return state;
    }
}