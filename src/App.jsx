import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Hero from './components/hero/Hero';
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

const router = createBrowserRouter([
  { path: "/", element: <Hero /> },
  { path: "/login", element: <Login /> },
  { path: "/cards", element: <ItemCard /> },
  { path: "/profile", element: <Profile /> },
  { path: "/signup", element: <Signup /> },
  { path: "/logout", element: <Logout /> },
  { path: "/sharedcart", element: <SharedCart /> },
  { path: "/joincart", element: <JoinCart /> },
  { path: "/products", element: <HomePage /> },
  { path: "/carted", element: <SharedCartPage /> },
  { path: "/setcartid", element: <SetCardId /> },
  // { path: "/user/sharedcarts", element: <UserSharedCartsPage /> },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
