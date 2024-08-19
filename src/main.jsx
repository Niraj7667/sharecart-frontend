import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ItemCard from './components/item-card/ItemCard.jsx';
import Profile from './components/profile/Profile.jsx';
import Login from './components/Login/Login.jsx';
import Signup from './components/Signup/Signup.jsx';
import Logout from './components/logout/Logout.jsx';
import SharedCart from './components/CreateSharedCart/CreateSharedCart.jsx';
import JoinCart from './components/JoinCart/JoinCart.jsx';
import HomePage from './components/HomePage/HomePage.jsx';
import SharedCartPage from './components/pages/SharedCartPage.jsx';
import SetCardId from './components/cartIdSet/SetCartId.jsx';

function MainRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cards" element={<ItemCard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/sharedcart" element={<SharedCart />} />
        <Route path="/joincart" element={<JoinCart />} />
        <Route path="/products" element={<HomePage />} />
        <Route path="/carted" element={<SharedCartPage />} />
        <Route path="/setcartid" element={<SetCardId />} />
      </Routes>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MainRouter />
  </React.StrictMode>,
);
