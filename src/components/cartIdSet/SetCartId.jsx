import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import styles from './SetCardId.module.scss'; // Import your SCSS module

const SetCardId = () => {
  const [joinedCarts, setJoinedCarts] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchJoinedCarts = async () => {
      try {
        const response = await axios.get(`/api/cart/joinedcarts`);
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

  return (
    <div className={styles.container}>
      <Navbar />
      <h2>Your Joined Carts</h2>
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
