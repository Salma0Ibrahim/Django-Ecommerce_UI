import { combineReducers , applyMiddleware , createStore} from 'redux'
import { thunk } from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { wishlistreducer } from '../reducer/wishlist-reducer';

const reducer = combineReducers({
    wishlists : wishlistreducer,
});

const initialstate = {};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialstate,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;