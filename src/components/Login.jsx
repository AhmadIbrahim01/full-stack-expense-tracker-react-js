import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/base/base.css";
import "../components/Login.css";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();  // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost/full-stack-expense-tracker-react-js/server/api/login.php', {
        username: username,
        password: password,
      });

      const data = response.data;
      console.log(data);

      if (data.status === 'Login Successful') {
        setMessage('Login Successful');
        setUser(data.user);  // Store the user information in App's state
        navigate('/');  // Navigate to Home page
      } else {
        setMessage('Login Failed');
      }
    } catch (error) {
      setMessage('Error: Could not connect to the server');
    }
  };

  return (
    <div className='flex column center'>
      <h2>Login</h2>
      <form className='flex column center' onSubmit={handleLogin}>
        <div className='flex column'>
          <label className='label'>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='input'
            required
          />
        </div>
        <div className='flex column'>
          <label className='label'>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='input'
            required
          />
        </div>
        <button className='submit' type="submit">Login</button>
      </form>

      <p>Create an account <a href="/register">Registe here</a></p>


      <div className={message.includes("Login Successful") ? "successful" : "failed"}>{message}</div>
    </div>
  );
};

export default Login;
