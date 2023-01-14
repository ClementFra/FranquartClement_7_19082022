import { store} from "reducers/store";
import { updateToken } from "reducers/userReducer";

const getLocalRefreshToken = () => {
    const state= store.getState().user
    return state?.refreshToken;
  };
  
  const getLocalAccessToken = () => {
    const state= store.getState().user
    return state?.accessToken;
  };
  
  
   const updateLocalAccessToken = (newToken) => {
    store.dispatch(updateToken(newToken))
   };

  const TokenService = {
    getLocalRefreshToken,
    getLocalAccessToken,
    updateLocalAccessToken
  };
  
  export default TokenService;