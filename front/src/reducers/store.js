import { combineReducers } from 'redux';
import userReducer from './userReducer';
import postReducer from './postReducer';
import usersReducer from './userReducer';

export default combineReducers({
  userReducer,
  usersReducer,
  postReducer
});

