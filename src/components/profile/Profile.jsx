import styles from "./Profile.module.scss";
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [navbarUserIsLogged, setnavbarUserIsLogged] = useState(false);
    const [username, setUsername] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage

        axios.get('https://sharecart-backend.vercel.app/api/auth/check', {
            headers: { 
                Authorization: `Bearer ${token}` // Pass the token in the Authorization header
            },
            withCredentials: true // Include credentials (cookies) if needed
        })
        .then(response => {
            if (response.data.user) {
                setnavbarUserIsLogged(true);
                setUsername(response.data.user.name);
            }
        })
        .catch(error => {
            console.log('Not authenticated', error);
        });

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve token again for logout
            await axios.post('https://sharecart-backend.vercel.app/api/auth/logout', {}, {
                headers: { 
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            });
            localStorage.removeItem('token');
            localStorage.removeItem('currentCartId');
            window.location.reload();
        } catch (error) {
            console.error('Error during logout:', error.message || 'An error occurred');
        }
    };

    return (
        <>
            {!navbarUserIsLogged ? (
                <div className={styles.profile_2} ref={dropdownRef}>
                    <a href="/login">
                        <a className={styles.items_Button} onClick={toggleDropdown}>
                            <div className={styles.icon}><FontAwesomeIcon icon={faUser} /></div>
                            <div><span className={styles.reorder}>Hi user</span><br />Sign in</div>
                        </a>
                    </a>
                </div>
            ) : (
                <div className={styles.profile_2} ref={dropdownRef}>
                    <a className={styles.items_Button} onClick={toggleDropdown}>
                        <div className={styles.icon}><FontAwesomeIcon icon={faUser} /></div>
                        <div><span className={styles.reorder}>Hi {username}</span><br />Account</div>
                    </a>
                    {dropdownOpen && (
                        <div className={styles.dropdownMenu}>
                            <a href="/orders" className={styles.dropdownItem}>Orders</a>
                            <a className={styles.dropdownItem} onClick={handleLogout}>Sign Out</a>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default Profile;
