import { createStore, applyMiddleware } from "redux";
import authReducer from './authReducer';
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = [thunk]

const initialState = {};

const store = createStore(
    authReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;