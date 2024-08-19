import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './CreateSharedCart.module.scss';
import Navbar from '../navbar/Navbar';

const SharedCart = () => {
  const [username, setUsername] = useState('');
  const [invitationLink, setInvitationLink] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage

        const response = await axios.get('https://sharecart-backend.vercel.app/api/auth/check', {
          headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
          },
          withCredentials: true,
        });

        setUsername(response.data.user.name);
      } catch (err) {
        setError('Error fetching user details');
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  // Create cart with invitation link
  const handleCreateCart = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage

      const response = await axios.post('https://sharecart-backend.vercel.app/api/cart/create', 
        { name: username }, 
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
          },
          withCredentials: true,
        }
      );

      // Store the cartId in localStorage
      localStorage.setItem('currentCartId', response.data.cartId);

      setInvitationLink(response.data.invitationLink);
    } catch (err) {
      setError('Error creating cart');
      console.error(err);
    }
  };

  // Copy invitation link to clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(invitationLink);
    alert('Invitation link copied to clipboard!');
  };

  // Redirect to joinCart page
  const handleJoinCart = () => {
    navigate('/joinCart');
  };

  return (
    <div className={styles.sharedCartContainer}>
      <Navbar />
      <h2>Welcome, {username}</h2>
      <button onClick={handleCreateCart}>Create Shared Cart</button>
      {invitationLink && (
        <div className={styles.invitationSection}>
          <p>Your invitation link:</p>
          <input type="text" value={invitationLink} readOnly />
          <button onClick={handleCopyLink}>Copy Link</button>
        </div>
      )}
      {error && <div className={styles.error}>{error}</div>}
      <button onClick={handleJoinCart} className={styles.joinCartButton}>Have a Link?</button>
    </div>
  );
};

export default SharedCart;
