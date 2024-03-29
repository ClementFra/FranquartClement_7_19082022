import axios from "../../interceptors/axios";
import { setUser } from "../../reducers/userReducer";

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

const uploadPicture=(data,id)=>{

}


export { readUser, updateUser, deleteUser,LogoutUser,uploadPicture};