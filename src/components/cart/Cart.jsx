import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './Cart.css'; // Ensure your CSS file is imported

const Cart = () => {
  const [open, setOpen] = useState(false);
  const [shake, setShake] = useState(false); // State for shake effect
  const menuRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  const handleNavigate = (path) => {
    setOpen(false); // Close the dropdown menu after clicking
    navigate(path); // Navigate to the specified path
  };

  const handleSharedCartClick = () => {
    const cartId = localStorage.getItem('currentCartId');
    if (cartId) {
      handleNavigate('/setcartid'); // Redirect to /setcartid if cart ID exists
    } else {
      handleNavigate('/sharedcart'); // Redirect to /sharedcart if cart ID does not exist
    }
  };

  const toggleDropdown = () => {
    setOpen(!open);
    setShake(true); // Trigger shake on click
    setTimeout(() => setShake(false), 500); // Remove shake after animation duration
  };

  return (
    <div className='cart'>
      <div className='App'>
        <div className='menu-container' ref={menuRef}>
          <div 
            className={`menu-trigger ${shake ? 'shake' : ''}`} // Add shake class
            onClick={toggleDropdown}
          >
            <FontAwesomeIcon icon={faCartShopping} size='lg' color='white'/>
          </div>

          <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
            <h3>
              Choose Your Cart <br />
              <span>:)</span>
            </h3>
            <ul>
              <DropdownItem 
                icon={faCartPlus} 
                text="Shared Cart" 
                onClick={handleSharedCartClick} 
              />
              <DropdownItem 
                icon={faCartShopping} 
                text="Cart" 
                onClick={() => handleNavigate('/cart')} 
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

function DropdownItem({ icon, text, onClick }) {
  return (
    <li className='dropdownItem' onClick={onClick}>
      <FontAwesomeIcon icon={icon} size='lg' style={{ color: '#000000' }} />
      <a>{text}</a>
    </li>
  );
}

export default Cart;
