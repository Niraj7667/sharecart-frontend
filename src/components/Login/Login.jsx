import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://sharecart-backend.vercel.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include credentials (cookies) in the request
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok && data.message === 'Login successful') {
        console.log('Login successful');
        localStorage.setItem('token', data.token);

        if (data.cartId) {
          localStorage.setItem('currentCartId', data.cartId);
        }
        navigate('/'); 
      } else {
        setError(data.message || 'An error occurred');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" 
            onSubmit={handleLogin} 
            method="POST" 
            action="" 
            autoComplete="off">
        <div className="image-container">
          <img src="https://res.cloudinary.com/dp3aoinmu/image/upload/v1723269218/Walmart_PNG/nkf7aa9iz6vqobaowd8k.jpg" alt="Walmart logo" />
        </div>
        <h2>Sign in</h2>

        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="login-button">
          Login
        </button>
        <div className="account-option">
          <span>Don't have an account? </span>
          <a href="/signup">Sign Up</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
