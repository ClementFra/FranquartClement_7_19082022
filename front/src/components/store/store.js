//  import {  configureStore } from '@reduxjs/toolkit';
//  import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
//  const store = configureStore({
//    reducer: {
//     users: usersReducer,
//     posts:postsReducer
//    },
//  })
// export default store

import {configureStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'

import formReducer from '../reducer/formReducer'
import userReducer from '../reducer/userReducer'
import postReducer from '../reducer/postReducer'
import commentReducer from '../reducer/commentReducer'

const rootReducer = combineReducers({
    formReducer,
    userReducer,
    postReducer,
    commentReducer
})

export const store = configureStore(rootReducer, applyMiddleware(thunk))
