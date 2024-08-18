// src/pages/UserSharedCartsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie'; // Assuming you are using js-cookie to handle cookies

const UserSharedCartsPage = () => {
  const [sharedCarts, setSharedCarts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSharedCarts = async () => {
      try {
        // Get the token from cookies
        const token = Cookies.get('jwt'); // Replace 'jwt' with the actual cookie name
        if (token) {
          // Decode the token to get the userId
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;

          // Fetch shared carts using the userId
          const response = await axios.get(`/api/user/${userId}/shared-carts`);
          setSharedCarts(response.data);
        } else {
          setError('User not authenticated');
        }
      } catch (err) {
        setError('Error fetching shared carts');
        console.error(err);
      }
    };

    fetchSharedCarts();
  }, []);


  const handleCartClick = (cartId) => {
    history.push(`/cart/${cartId}`);
  };

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Your Shared Carts</h1>
      <ul>
        {sharedCarts.map(cart => (
          <li key={cart.id}>
            <button onClick={() => handleCartClick(cart.id)}>
              {cart.name} - Owner: {cart.users[0].user.name} ({cart.users[0].user.email})
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSharedCartsPage;
