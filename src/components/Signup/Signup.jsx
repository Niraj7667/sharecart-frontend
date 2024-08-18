import React, { useState } from 'react';
import axios from 'axios';
import './signup.css'
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use navigate for redirection


  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/signup', { username, email, password }, { withCredentials: true });
      if (response.data.message === 'User signed up successfully') {
        console.log('Signup successful');
        localStorage.setItem('token', response.data.token);
        navigate('/'); // Redirect to home page after successful login
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="login-container">
      
      <form className="login-form" onSubmit={handleSignup}>
      <div className="image-container"><img src="https://res.cloudinary.com/dp3aoinmu/image/upload/v1723269218/Walmart_PNG/nkf7aa9iz6vqobaowd8k.jpg" alt="" /></div>
        <h2>Signup</h2>

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
          Signup
        </button>
        <div className="account-option">
      <span>Already have an account? </span>
      <a href="/login">Sign in</a>
    </div>
      </form>
    </div>
  );
};

export default Signup;
