import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost/full-stack-expense-tracker-react-js/server/api/login.php', {
        username: username,
        password: password,
      });

      const data = response.data;
      console.log(data)
      if (data.status === 'Login Successful') {
        setMessage('Login Successful');
        setUser(data.user);
      } else {
        setMessage('Login Failed');
      }
    } catch (error) {
      setMessage('Error: Could not connect to the server');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      <div>{message}</div>

      {user && (
        <div>
          <h3>Welcome, {user.username}</h3>
        </div>
      )}
    </div>
  );
};

export default Login;
