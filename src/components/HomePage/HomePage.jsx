import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../navbar/Navbar';
import styles from './HomePage.module.scss';
import { faPlus, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HomePage = () => {
  const cartId = localStorage.getItem('currentCartId');
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://sharecart-backend.vercel.app/api/cart/products', {
          headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
          },
          withCredentials: true,
        });
        setProducts(response.data);
      } catch (err) {
        setError('Error fetching products');
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, [token]);

  const addToCart = async (productId) => {
    try {
      await axios.post(
        'https://sharecart-backend.vercel.app/api/cart/add-product',
        { productId },
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
          },
          withCredentials: true,
        }
      );
      alert('Product added to cart');
    } catch (err) {
      console.error('Error adding product to cart:', err);
    }
  };

  const addToSharedCart = async (productId, cartId) => {
    try {
      await axios.post(
        `https://sharecart-backend.vercel.app/api/cart/${cartId}/add-product`,
        { productId },
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
          },
          withCredentials: true,
        }
      );
      alert('Product added to shared cart');
    } catch (err) {
      console.error('Error adding product to shared cart:', err);
    }
  };

  if (error) return <div>{error}</div>;

  return (
    <div>
      <Navbar />
      <br /> <br />
      <h1>Products</h1>
      <section className={styles.mainContainer}>
        <div className={styles.productContainer}>
          {products.map((product) => (
            <div key={product.id} className={styles.mainItemContainer}>
              <div className={styles.imageItemContainer}>
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className={styles.buttonsItemContainer}>
                <div className={styles.addToCart} onClick={() => addToCart(product.id)}>
                  <FontAwesomeIcon icon={faPlus} size="lg" className={styles.plus_icon} />
                  <p>Add to cart</p>
                </div>
                <div className={styles.addToSharedCart}>
                  <FontAwesomeIcon icon={faCartPlus} size="lg" />
                  <p onClick={() => addToSharedCart(product.id, cartId)} className={styles.sharedCartText}>
                    Add to <br />
                    Shared cart
                  </p>
                </div>
              </div>
              <div className={styles.price}>
                <p>₹{product.price}</p>
              </div>
              <div className={styles.description}>
                <p>{product.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
