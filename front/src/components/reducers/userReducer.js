import { GET_USER, UPDATE_USER, DELETE_USER } from '../actions/userActions';

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      // Get info of user.
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_USER:
      // Update bio of user.
      return { ...state, biography: action.payload };
    case DELETE_USER:
      // Delete user.
      return { ...state, ...action.payload };
    default:
      return state;
  }
}