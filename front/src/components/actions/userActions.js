import axios from 'axios';

export const GET_USER = 'GET_USER';
export const UPDATE_USER = 'UPDATE_BIO';
export const DELETE_USER = 'DELETE_USER';
export const UPLOAD_PICTURE = 'UPLOAD_PICTURE';
const REACT_APP_URL="http://localhost:8000/api";

// Récupération des informations d'un utilisateur et de ses likes.
export const getUser = uid => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  return dispatch => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}/user/${uid}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
      .then(res => {
        dispatch({
          type: GET_USER, payload: {
            ...res.data.user,
            ...res.data.likes,
          }
        });
      })
      .catch(err => err.message);
  };
};

// Mise à jour de la biographie d'un utilisateur.
export const updateBio = (id, biography) => {
  const token = JSON.parse(localStorage.getItem('user')).token;

  return dispatch => {
    return axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}/api/user/updateUser/${id}`,
      data: { biography },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        dispatch({ type: UPDATE_USER, payload: biography });
      })
      .catch(err => err.response);
  };
};


// Suppression de l'utilisateur.
export const deleteUser = id => {
  const token = JSON.parse(localStorage.getItem('user')).token;

  return dispatch => {
    return axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}/user/${id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        dispatch({ type: DELETE_USER });
      })
      .catch(err => err.response);
  };
}

export const uploadPicture = (data, id) => {
  const token = JSON.parse(localStorage.getItem('user')).token;

  return dispatch => {
    return axios
      .put(`${process.env.REACT_APP_API_URL}/user/upload/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
      .then(res => {
        return axios
          .get(`${process.env.REACT_APP_API_URL}/api/user/${id}`)
          .then(res => {
            dispatch({ type: UPLOAD_PICTURE, payload: res.data.user.avatar });
          })
          .catch(err => err.message);
      })
      .catch(err => err.message);
  };
};