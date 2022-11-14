import { GET_USER, UPDATE_USER, DELETE_USER } from '../actions/user.actions';

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      // Récupère les informations de l'utilisateur.
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_USER:
      // Met à jour la Bio de l'utilisateur.
      return { ...state, biography: action.payload };
    case DELETE_USER:
      // Supprime l'utilisateur.
      return { ...state, ...action.payload };
    default:
      return state;
  }
}