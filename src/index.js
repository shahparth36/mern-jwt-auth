import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";

import axios from "axios";

axios.interceptors.request.use(
  (req) => {
    const accessToken = window.localStorage.getItem("accessToken");
    req.headers = { Authorization: `Bearer ${accessToken}` };
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    console.log(error.response);
    if (
      error.response.status === 401 &&
      originalRequest.url === "http://localhost:5000/api/auth/refresh-token"
    ) {
      window.history.pushState({}, "", "http://localhost:3000/login");
      return Promise.reject(error);
    }
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return axios
        .post("http://localhost:5000/api/auth/refresh-token", {
          refreshToken: window.localStorage.getItem("refreshToken"),
        })
        .then((res) => {
          if (res.status === 200) {
            window.localStorage.setItem("accessToken", res.data.newAccessToken);
            window.localStorage.setItem(
              "refreshToken",
              res.data.newRefreshToken
            );

            axios.defaults.headers.common["Authorization"] =
              "Bearer " + window.localStorage.getItem("accessToken");

            return axios(originalRequest);
          }
        });
    }

    return Promise.reject(error);
  }
);

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
