import axios from "axios";
import { setUser } from "../../reducers/userReducer";

const readUser = (user_id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`api/user/${user_id}`);
      return dispatch(setUser(res.data));
    } catch (error) {
      console.log(error);
    }
  };
};

const updateUser = (user_id, data) => {
  return async () => {
    try {
      await axios.put(`api/user/${user_id}`, data);
    } catch (error) {
      console.log(error);
    }
  };
};

const deleteUser = (user_id) => {
  return async () => {
    try {
      await axios.delete(`api/user/delete/${user_id}`);
    } catch (error) {
      console.log(error);
    }
  };
};
const refreshTokenUser=() =>{
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.refreshToken;
}

export { readUser, updateUser, deleteUser,refreshTokenUser};