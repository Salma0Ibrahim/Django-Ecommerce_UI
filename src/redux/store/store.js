import { combineReducers , applyMiddleware , createStore} from 'redux'
import { thunk } from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productreducer } from '../reducer/productreducer';
import { wishlistreducer } from '../reducer/wishlist-reducer';
import { cartItemReducer } from '../reducer/cartitemreducer';

const reducer = combineReducers({
    products : productreducer,
    wishlists : wishlistreducer,
    cartitems : cartItemReducer,
});

const initialstate = {};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialstate,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;