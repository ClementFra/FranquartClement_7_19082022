import { combineReducers,configureStore  } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import postReducer from './postReducer';
import usersReducer from './userReducer';
import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

export default combineReducers({
  userReducer,
  usersReducer,
  postReducer
});

const persistConfig = {
  key: 'root',f,
  storageSession,
}
const persistedReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})

export const persistor = persistStore(store)
