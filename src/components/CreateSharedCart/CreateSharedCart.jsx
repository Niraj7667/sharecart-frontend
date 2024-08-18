import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import styles from './CreateSharedCart.module.scss';
import Navbar from '../navbar/Navbar';
const SharedCart = () => {
  const [username, setUsername] = useState('');
  const [invitationLink, setInvitationLink] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use navigate for redirection

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/check', {
          method: 'GET',
          credentials: 'include', // Include cookies in the request
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }

        const data = await response.json();
        setUsername(data.user.name);
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
      const response = await axios.post('/api/cart/create', { name: username }, { withCredentials: true });

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
    navigate('/joinCart'); // Redirect to /joinCart page
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
      <button onClick={handleJoinCart} className={styles.joinCartButton}>Have a Link?</button> {/* New button */}
    </div>
  );
};

export default SharedCart;
