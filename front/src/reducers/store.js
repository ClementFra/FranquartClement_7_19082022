import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import userReducer from "../reducers/userReducer";
import postReducer from "../reducers/postReducer";

const applyMiddleware = require("redux").applyMiddleware
const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

const reducers = combineReducers({
  user: userReducer,
  post: postReducer,
});
const store = configureStore({
  reducer: reducers,
  composedEnhancer,
});
export default store;

