import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css'; // Import the CSS file

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [loginStatus, setLoginStatus] = useState(); // New state for login status

  const HandleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const HandleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/users/login', loginData);
      const { success, message } = response.data;

      if (message == "login successful") {
        setLoginStatus('success');
        console.log('login successful');
      } else {
        setLoginStatus('error');
        console.log(message);
      }
    } catch (error) {
      setLoginStatus('error');
      console.error('login error', error);
    }

    setLoginData({
      username: '',
      password: '',
    });
  };

  return (
    <div className="container">
      <h1>Login Page</h1>
      <form onSubmit={HandleLoginSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={HandleLoginChange}
          value={loginData.username}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={HandleLoginChange}
          value={loginData.password}
          required
        />
        <button type="submit">Login</button>
      </form>
      {loginStatus === 'success' && (
        <p className="success-message">Login successful!</p>
      )}
      {loginStatus === 'error' && (
        <p className="error-message">Wrong credentials, please try again.</p>
      )}
      <p>
        Not registered yet? <Link to="/register">Register Now</Link>
      </p>
    </div>
  );
};

export default Login;
