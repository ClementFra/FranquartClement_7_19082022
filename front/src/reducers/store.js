import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer,persistStore } from "redux-persist";
import thunk from "redux-thunk";
import storage from 'redux-persist/lib/storage';
import userReducer from "../reducers/userReducer";
import postReducer from "../reducers/postReducer";


const persistConfig= {
  key:"root",
  storage
};
const reducers =combineReducers({
  user: userReducer,
  post: postReducer,
});
const store = configureStore({
  reducer: reducers,
  middleware:[thunk]
});
const persistedReducer = persistReducer(persistConfig,reducers);

export default() =>{
  let store = configureStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
}






