import { store } from "reducers/store";
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

const TokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAllToken,
};

export default TokenService;
