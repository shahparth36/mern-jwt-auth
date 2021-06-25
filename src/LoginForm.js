import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginForm() {
    const navigate = useNavigate();

    const [user, setUser] = useState({ email: '', password: '' });

    const handleChange = (evt) => {
        setUser({ ...user, [evt.target.name]: evt.target.value });
    };

    const handleClick = async (evt) => {
        try {
            evt.preventDefault();
            const response = await axios.post(
                `http://localhost:5000/api/auth/login`,
                user
            );
            console.log(response.data);
            if (response.status === 200) {
                window.localStorage.setItem('accessToken', response.data.accessToken);
                navigate(`/home`); 
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>Login Form</h1>
            <p>Email</p>
            <input type="text" name="email" value={user.email} onChange={handleChange} />
            <p>Password</p>
            <input type="password" name="password" value={user.password} onChange={handleChange} />
            <div>
                <button onClick={handleClick}>Login</button>
            </div>
            <Link to="/register">Register?</Link>
        </div>
    )
}

export default LoginForm
