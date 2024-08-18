import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use navigate for redirection

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/login', { username, email, password }, { withCredentials: true });
      if (response.data.message === 'Login successful') {
        console.log('Login successful');
        localStorage.setItem('token', response.data.token);

        // Store the cart ID in localStorage if it exists
        if (response.data.cartId) {
          localStorage.setItem('currentCartId', response.data.cartId);
        }
        navigate('/'); // Redirect to home page after successful login
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    /* <div className={styles.loginContainer}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username or Email:</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div> */
    <div className="login-container">
      
      <form className="login-form" onSubmit={handleLogin}>
      <div className="image-container"><img src="https://res.cloudinary.com/dp3aoinmu/image/upload/v1723269218/Walmart_PNG/nkf7aa9iz6vqobaowd8k.jpg" alt="" /></div>
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
        {error && <div>{error}</div>}
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
