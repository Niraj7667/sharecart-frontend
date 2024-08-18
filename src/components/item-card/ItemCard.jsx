import styles from "./ItemCard.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faCartPlus } from "@fortawesome/free-solid-svg-icons"
const ItemCard = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.imageContainer}><img src="https://res.cloudinary.com/dp3aoinmu/image/upload/v1722951167/Walmart_PNG/iuc99geboebpe0rxea67.jpg" alt="" /></div>
    <div className={styles.buttonsContainer}>
        <div className={styles.addToCart}> <FontAwesomeIcon icon={faPlus} size='lg' className={styles.plus_icon}/><p>Add to cart</p></div> 
        <div className={styles.addToSharedCart}> <FontAwesomeIcon icon={faCartPlus} size='lg' /><p>Add to <br />Shared cart</p></div>
     </div>
     <div className={styles.price}><p>$4.88</p></div>
     <div className={styles.description}><p>Oreo Cookie, Mint Flavour, 10.68oz</p></div>
    </div>
  )
}

export default ItemCard
