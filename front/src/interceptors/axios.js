import axios from "axios";
import { redirect } from "react-router-dom";
import { store } from "reducers/store";
import TokenService from "./tokenService";

const Axios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

Axios.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await Axios.post("/auth/refresh", {
            refreshToken: TokenService.getLocalRefreshToken(),
          });

          TokenService.updateLocalAllToken(rs.data);
          const logout = () => {
            store.logout.dispatch(logout);
            TokenService.logout();
            redirect.push("/login");
          };
          return Axios(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default Axios;
