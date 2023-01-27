import axios from "axios";
import TokenService from "./tokenService";

const Axios = axios.create({
  baseURL:process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

Axios.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalRefreshToken();
    if (token) {
      config.headers["x-access-token"] = token;
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

          const { accessToken } = rs.data;
          TokenService.updateLocalAccessToken(accessToken);

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
