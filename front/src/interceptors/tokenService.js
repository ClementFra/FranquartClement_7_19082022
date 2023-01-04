import { store} from "reducers/store";

const getLocalRefreshToken = () => {
    const state= store.getState().user
    return state?.refreshToken;
  };
  
  const getLocalAccessToken = () => {
    const state= store.getState().user
    return state?.accessToken;
  };
  
  
   const updateLocalAccessToken = () => {
    const state =store.getState().user.refreshToken
    return state?.accessToken;
   };

  const TokenService = {
    getLocalRefreshToken,
    getLocalAccessToken,
    updateLocalAccessToken
  };
  
  export default TokenService;