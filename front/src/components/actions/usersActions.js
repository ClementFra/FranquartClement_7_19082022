import axios from 'axios';

export const GET_USERS = 'GET_USERS';


// Get all users.
export const getUsers = () => {
  return dispatch => {
    const REACT_APP_URL="http://localhost:8000/api";
    return axios
      .get(`${process.env.REACT_APP_URL}/user`)
      .then(res => {
        dispatch({ type: GET_USERS, payload: res.data });
      })
      .catch(err =>
        err.stack
      );
  };
};