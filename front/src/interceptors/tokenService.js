import { store} from "reducers/store";

const getLocalRefreshToken = () => {
    const state= store.getState().user
    return state?.refreshToken;
  };
  
  const getLocalAccessToken = () => {
    const state= store.getState().user
    return state?.accessToken;
  };
  
  
  // const updateLocalAccessToken = (token) => {
  //   let user = JSON.parse(localStorage.getItem("user"));
  //   user.accessToken = token;
  //   localStorage.setItem("user", JSON.stringify(user));
  // };
  
  const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };
  
  const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };
  
  
  const TokenService = {
    getLocalRefreshToken,
    getLocalAccessToken,
    getUser,
    setUser,
  };
  
  export default TokenService;