import axios from "axios";

import baseURL from "./baseURL";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

axiosInstance.interceptors.request.use(
  (req) => {
    const accessToken = window.localStorage.getItem("accessToken");
    req.headers = { Authorization: `Bearer ${accessToken}` };
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest.url === `${baseURL}/auth/refresh-token`
    ) {
      window.location.href = "/login/";
    }
    if (
      error.response.status === 401 &&
      error.response.data.message === "Invalid JWT token" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      return axios
        .post(`${baseURL}/auth/refresh-token`, {
          refreshToken: window.localStorage.getItem("refreshToken"),
        })
        .then((res) => {
          if (res.status === 200) {
            window.localStorage.setItem("accessToken", res.data.newAccessToken);
            window.localStorage.setItem(
              "refreshToken",
              res.data.newRefreshToken
            );

            originalRequest.headers["Authorization"] =
              "Bearer " + window.localStorage.getItem("accessToken");

            return axios(originalRequest);
          }
        });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
