import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from '../navbar/Navbar.jsx';
import HomePage from '../HomePage/HomePage.jsx';
import Login from '../Login/Login.jsx';
import ItemCard from '../item-card/ItemCard.jsx';
import Profile from '../profile/Profile.jsx';
import Signup from '../Signup/Signup.jsx';
import Logout from '../logout/Logout.jsx';
import SharedCart from '../CreateSharedCart/CreateSharedCart.jsx';
import JoinCart from '../JoinCart/JoinCart.jsx';
import SharedCartPage from '../pages/SharedCartPage.jsx';
import SetCardId from '../cartIdSet/SetCardId.jsx';

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <Login /> },
  { path: "/cards", element: <ItemCard /> },
  { path: "/profile", element: <Profile /> },
  { path: "/signup", element: <Signup /> },
  { path: "/logout", element: <Logout /> },
  { path: "/sharedcart", element: <SharedCart /> },
  { path: "/joincart", element: <JoinCart /> },
  { path: "/carted", element: <SharedCartPage /> },
  { path: "/setcartid", element: <SetCardId /> },
]);

function Hero() {
  return (
    <RouterProvider router={router} />
  );
}

export default Hero;
