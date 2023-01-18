import axios from "../../interceptors/axios";
import { setUser } from "../../reducers/userReducer";

const readUser = () => {
  return async () => {
    try {
      const res = await axios.get(`auth/`);
      return setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };
};

const updateUser = (data) => {
  return async () => {
    try {
      await axios.put(`auth/`, data);
    } catch (error) {
      console.log(error);
    }
  };
};

const deleteUser = () => {
  return async () => {
    try {
      await axios.delete(`/auth`);
    } catch (error) {
      console.log(error);
    }
  };
};

const LogoutUser=()=>{
  return async () => {
    try {
      await axios.get(`/logout`);
    } catch (error) {
      console.log(error);
    }
  };
}


export { readUser, updateUser, deleteUser,LogoutUser};