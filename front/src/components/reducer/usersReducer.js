import { GET_USERS } from '../actions/users.actions';

const initialState = {};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      // Get all info of users.
      return action.payload;
    default:
      return state;
  }
}