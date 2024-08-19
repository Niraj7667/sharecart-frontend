import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import styles from './SetCardId.module.scss'; // Import your SCSS module

const SetCardId = () => {
  const [joinedCarts, setJoinedCarts] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  // Function to retrieve the token from local storage
  const getToken = () => {
    return localStorage.getItem('token'); // Use the correct token key
  };

  useEffect(() => {
    const fetchJoinedCarts = async () => {
      try {
        const token = getToken();
        const response = await axios.get('https://sharecart-backend.vercel.app/api/cart/joinedcarts', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          withCredentials: true, // Include this if you're using cookies as well
        });
        setJoinedCarts(response.data);
        console.log(response);
      } catch (err) {
        console.error('Error fetching joined carts:', err);
      }
    };
    fetchJoinedCarts();
  }, []);

  const handleCartClick = (cartId) => {
    // Store the selected cartId in localStorage
    localStorage.setItem('currentCartId', cartId);
    // Redirect to the /carted route
    navigate('/carted');
  };

  const handleNavigateToSharedCart = () => {
    // Redirect to the /sharedcart route
    navigate('/sharedcart');
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <h2>Your Joined Carts</h2>
      <button onClick={handleNavigateToSharedCart} className={styles.sharedCartButton}>
        Join or Create a Shared Cart
      </button>
      <ul>
        {joinedCarts.map(cart => (
          <li key={cart.cartId}>
            <button onClick={() => handleCartClick(cart.cartId)}>
              {cart.ownerName}'s Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SetCardId;
