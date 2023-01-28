import TokenService from "interceptors/tokenService";
import { redirect } from "react-router-dom";
import { store } from "reducers/store";
import axios from "../../interceptors/axios";
import { setUser } from "../../reducers/userReducer";
import { logout } from "../../reducers/userReducer";

const readUser = () => {
  return async () => {
    try {
      const res = await axios.get(`/auth`);
      return setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };
};

const updateUser = () => {
  return async () => {
    try {
      await axios.put(`/auth`);
    } catch (error) {
      console.log(error);
    }
  };
};

const deleteUser = () => {
  return async () => {
    try {
      await axios.delete(`/auth/delete`);
    } catch (error) {
      console.log(error);
    }
  };
};

const LogoutUser = () => {
  try {
    store.logout.dispatch(logout);
    TokenService.logout();
    redirect.push("/login");
  } catch (error) {
    console.log(error);
  }
};

const uploadPicture = (data, id) => {};

export { readUser, updateUser, deleteUser, LogoutUser, uploadPicture };
