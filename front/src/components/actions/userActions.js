import axios from "../../interceptors/axios";
import { setUser } from "../../reducers/userReducer";

const readUser = (user_id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`auth/${user_id}`);
      return dispatch(setUser(res.data));
    } catch (error) {
      console.log(error);
    }
  };
};

const updateUser = (user_id, data) => {
  return async () => {
    try {
      await axios.put(`auth/${user_id}`, data);
    } catch (error) {
      console.log(error);
    }
  };
};

const deleteUser = (user_id) => {
  return async () => {
    try {
      await axios.delete(`/auth/delete/${user_id}`);
    } catch (error) {
      console.log(error);
    }
  };
};


export { readUser, updateUser, deleteUser};