import React from 'react';
import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';
import Home from './user/home';
import Product from './user/product/products';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Signup from './user/signup';
import Order from './user/order';
import Login from './user/login';
import ProductDetails from './user/product-details';
import Cart from './user/cart';
import UserProfile from './user/user-profile';
import Wishlist from './user/wishlist';
import { jwtDecode } from 'jwt-decode';

const isAuthenticated = (role) => {
  if (role === 'user') {
    if (localStorage.getItem('token') === null) return false;
    const decoded = jwtDecode(localStorage.getItem('token'));
    if (decoded?.is_superuser === false) {
      return true;
    } else {
      return false;
    }
  }
};

const UserLayoutAuth = () => {
  console.log(isAuthenticated('user'));
  if (!isAuthenticated('user')) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const UserLayoutUnAuth = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const WithoutLayoutUnAuth = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <UserLayoutAuth />,
    children: [
      {
        element: <ProductDetails />,
        path: '/product-details/:id',
      },

      {
        element: <Cart />,
        path: '/cart',
      },
      {
        element: <Order />,
        path: '/order',
      },
      {
        element: <Wishlist />,
        path: '/wishlist',
      },
      {
        element: <UserProfile />,
        path: '/user-profile',
      },
    ],
  },

  {
    element: <UserLayoutUnAuth />,
    children: [
      {
        element: <Home />,
        path: '/',
      },
      {
        element: <Home />,
        path: '/home',
      },
      {
        element: <Product />,
        path: '/products',
      },
    ],
  },

  {
    element: <WithoutLayoutUnAuth />,
    children: [
      {
        element: <Signup />,
        path: '/signup',
      },

      {
        element: <Login />,
        path: '/login',
      },
    ],
  },
]);

export default router;
