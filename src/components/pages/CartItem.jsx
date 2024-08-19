import { FaTrash } from "react-icons/fa";
import axios from 'axios';
import styles from "./CartItem.module.scss";
import { useState } from "react";

const CartItem = ({ price, name, productId, cartId, rating, numRatings, addedBy, imageUrl, onProductRemove, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(1);

  // Function to retrieve the token from local storage
  const getToken = () => {
    return localStorage.getItem('token'); // Use the correct token key
  };

  const handleDelete = async () => {
    try {
      const token = getToken();
      await axios.delete(`https://sharecart-backend.vercel.app/api/cart/${cartId}/remove-product/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true, // Include this if you're using cookies as well
      });
      alert('Product removed from cart');
      onProductRemove(productId);  // Notify parent component about the removal
    } catch (err) {
      console.error('Error removing product from cart:', err);
      alert('Failed to remove product from cart');
    }
  };

  const handleIncrease = () => {
    if (quantity < 10) {
      setQuantity(prevQuantity => {
        const newQuantity = prevQuantity + 1;
        onQuantityChange(productId, newQuantity); // Notify parent about the quantity change
        return newQuantity;
      });
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) { // Ensure quantity doesn't go below 1
      setQuantity(prevQuantity => {
        const newQuantity = prevQuantity - 1;
        onQuantityChange(productId, newQuantity); // Notify parent about the quantity change
        return newQuantity;
      });
    }
  };

  return (
    <div className={styles.cartItem}>
      <img src={imageUrl} alt={name} />
      <article>
        <p className={styles.productName}>{name}</p>
        <span><b>₹{price}</b></span>
        <span><b>Added By: </b>{addedBy}</span>
        <p>Product rating: <meter className="average-rating" min="0" max="5" value={rating} title={`${rating} out of 5`}>{rating} out of 5</meter></p>
        <p>Number of ratings: {numRatings}</p>
      </article>
      <div>
        <button onClick={handleDecrease}>-</button>
        <p>{quantity}</p>
        <button onClick={handleIncrease}>+</button>
      </div>
      <button onClick={handleDelete}>
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;
