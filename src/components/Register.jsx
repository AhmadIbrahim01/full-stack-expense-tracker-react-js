import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/base/base.css";
import "../components/Login.css";

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();  // Hook for navigation

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost/full-stack-expense-tracker-react-js/server/api/register.php', {
        username: username,
        password: password,
      });

      const data = response.data;
      console.log(data);

      if (data.status === 'Account Created and Logged In') {
        setMessage('Registration Successful, Welcome!');
        navigate('/login');  // Redirect to login page after registration
      } else {
        setMessage(data.status || 'Registration Failed');
      }
    } catch (error) {
      setMessage('Error: Could not connect to the server');
    }
  };

  return (
    <div className='flex column center'>
      <h2>Register</h2>
      <form className='flex column center' onSubmit={handleRegister}>
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
        <div className='flex column'>
          <label className='label'>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='input'
            required
          />
        </div>
        <button className='submit' type="submit">Register</button>
      </form>

      <p>Already have an account? <a href="/Login">Login here</a></p>

      <div className={message.includes("Successful") ? "successful" : "failed"}>{message}</div>
    </div>
  );
};

export default Register;
