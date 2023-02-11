import { store } from "reducers/store";
import { redirect } from "react-router-dom";
import { updateTokens } from "reducers/userReducer";


const getLocalRefreshToken = () => {
  const state = store.getState().user;
  return state?.refreshToken;
};

const getLocalAccessToken = () => {
  const state = store.getState().user;
  return state?.accessToken;
};

const updateLocalAllToken = (newToken) => {
  store.dispatch(updateTokens(newToken));
};
const goLogout = () => {
  store.logout.dispatch();
  TokenService.goLogout();
  redirect.push("/login");
};
const TokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAllToken,
  goLogout
};

export default TokenService;
