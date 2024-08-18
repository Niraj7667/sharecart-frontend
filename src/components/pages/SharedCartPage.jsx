import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import styles from "./SharedCartPage.module.scss";
import CartItem from './CartItem';

const SharedCartPage = () => {
  const [sharedCartProducts, setSharedCartProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [error, setError] = useState(null);
  const cartId = localStorage.getItem('currentCartId');

  useEffect(() => {
    const fetchSharedCartProducts = async () => {
      try {
        const response = await axios.get(`/api/cart/${cartId}/products`);
        const initialQuantities = response.data.reduce((acc, item) => {
          acc[item.productId] = 1; // Default quantity is 1
          return acc;
        }, {});
        setSharedCartProducts(response.data);
        setQuantities(initialQuantities);
      } catch (err) {
        setError('Error fetching shared cart products');
        console.error(err);
      }
    };

    fetchSharedCartProducts();
  }, [cartId]);

  const handleProductRemove = (productId) => {
    setSharedCartProducts(prevProducts => prevProducts.filter(product => product.productId !== productId));
    setQuantities(prevQuantities => {
      const updatedQuantities = { ...prevQuantities };
      delete updatedQuantities[productId];
      return updatedQuantities;
    });
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: newQuantity
    }));
  };

  const subtotal = sharedCartProducts.reduce((acc, item) => acc + (item.price * (quantities[item.productId] || 1)), 0).toFixed(2);
  const tax = Math.round(subtotal * 0.18);
  const shippingCharges = subtotal > 1000 ? 0 : 40;
  const discount = subtotal > 500 ? 400 : 0;
  const total = (parseFloat(subtotal) + tax + shippingCharges - discount).toFixed(2);

  return (
    <div>
      <Navbar />
      <div className={styles.cart}>
        <main>
          {sharedCartProducts.map((item) => (
            <CartItem
              key={item.productId}
              productId={item.productId}
              cartId={cartId}
              name={item.name}
              price={item.price}
              rating={item.rating}
              numRatings={item.numRatings}
              addedBy={item.addedBy}
              imageUrl={item.imageUrl}
              onProductRemove={handleProductRemove}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </main>
        <aside className={styles.calcSection}>
          <button>
            <Link to="/sharedcart">Share Your Cart</Link>
          </button>
          <p>GST: ₹{tax}</p>
          <p>Subtotal (Incl. GST): ₹{subtotal}</p>
          <p>Shipping Charges (Incl. GST): ₹{shippingCharges}</p>
          <p>Discount: <em className={styles.green}>- ₹{discount}</em></p>
          <p><b>Total: ₹{total}</b></p>
          <button>
            {sharedCartProducts.length > 0 && <Link to="/">Continue to checkout</Link>}
          </button>
        </aside>
      </div>
    </div>
  );
};

export default SharedCartPage;
