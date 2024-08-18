import React from 'react';
import styles from './ItemCard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ItemCard = ({ name, price, imageUrl }) => {
  return (
    <div className={styles.mainItemContainer}>
      <div className={styles.imageItemContainer}>
        <img src={imageUrl} alt={name} />
      </div>
      <div className={styles.buttonsItemContainer}>
        <div className={styles.addToCart}>
          <FontAwesomeIcon icon={faPlus} size='lg' className={styles.plus_icon} />
          <p>Add to cart</p>
        </div>
        <div className={styles.addToSharedCart}>
          <FontAwesomeIcon icon={faCartPlus} size='lg' />
          <p> <Link to='/cart'  className={styles.sharedCartText}> Add to <br />Shared cart </Link></p>
        </div>
      </div>
      <div className={styles.price}><p>{price}</p></div>
      <div className={styles.description}><p>{name}</p></div>
    </div>
  );
};

export default ItemCard;
