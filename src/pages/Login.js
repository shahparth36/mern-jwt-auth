import React, { useState, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";

import axios from "../utils/axios";
import baseURL from "../utils/baseURL";
import { isLoggedIn } from "../utils/auth";

function LoginForm() {
  const navigate = useNavigate();

  const [user, setUser] = useState({ email: "", password: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function verifyUser() {
      try {
        const verifiedUser = await axios.post(`/auth/verify-user`);
        setIsAuthenticated(true);
        setUser(verifiedUser.data);
      } catch (error) {
        setIsAuthenticated(false);
      }
    }

    if (isLoggedIn()) {
      verifyUser();
    }
  }, []);

  const handleChange = (evt) => {
    setUser({ ...user, [evt.target.name]: evt.target.value });
  };

  const handleClick = async (evt) => {
    try {
      evt.preventDefault();
      const response = await axios.post(`${baseURL}/auth/login`, user);
      if (response.status === 200) {
        window.localStorage.setItem("accessToken", response.data.accessToken);
        window.localStorage.setItem("refreshToken", response.data.refreshToken);
        navigate(`/home`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <Navigate to={`/home`} />
      ) : (
        <>
          <h1>Login Form</h1>
          <p>Email</p>
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          <p>Password</p>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          <div>
            <button onClick={handleClick}>Login</button>
          </div>
          <Link to="/register">Register?</Link>
        </>
      )}
    </div>
  );
}

export default LoginForm;
