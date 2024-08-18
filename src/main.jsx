import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,RouterProvider
} from "react-router-dom";
import ItemCard from './components/item-card/ItemCard.jsx'
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
  { path: "/",element: <App />,},
  { path: "/cards", element: <ItemCard/>},
  { path: "/profile", element: <Profile/>},
  { path: "/login", element: <Login />},
  { path: "/signup", element: <Signup/>},
  { path: "/logout", element: <Logout/>},
  { path: "/sharedcart", element: <SharedCart/>},
  { path: "/joincart", element: <JoinCart/>},
  { path: "/products", element: <HomePage/>},
  { path: "/carted", element: <SharedCartPage/>},
  { path: "/setcartid", element: <SetCardId/>},
  
// { path: "/user/sharedcarts", element: <UserSharedCartsPage/>},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)


// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import SharedCart from './components/SharedCart/SharedCart.jsx'
// import './index.css'
// import {
//   createBrowserRouter,RouterProvider
// } from "react-router-dom";
// import Profile from './components/profile/Profile.jsx';
// import Login from './components/Login/Login.jsx';
// import Signup from './components/Signup/Signup.jsx';



// const router = createBrowserRouter([
//   { path: "/",element: <App />},
//   { path: "/cart", element: <SharedCart/>},
//   { path: "/cards", element: <ItemCard/>},
//   { path: "/login", element: <Login />},
//   { path: "/signup", element: <Signup/>},
//   { path: "/profile", element: <Profile/>}
// ]);


// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>,
// )

