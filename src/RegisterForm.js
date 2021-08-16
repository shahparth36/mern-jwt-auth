import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterForm() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });

  const handleChange = (evt) => {
    setUser({ ...user, [evt.target.name]: evt.target.value });
  };

  const handleClick = async (evt) => {
    try {
      evt.preventDefault();
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        user
      );
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Registration Form</h1>
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
        <button onClick={handleClick}>Register</button>
      </div>
    </div>
  );
}

export default RegisterForm;
