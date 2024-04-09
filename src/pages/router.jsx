import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";

import Home from "./user/home";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Signup from "./user/signup";
import Order from "./user/order";
import Login from "./user/login";
import ProductDetails from "./user/product-details";
import Cart from "./user/cart";
import UserProfile from "./user/user-profile";
import Wishlist from "./user/wishlist";
import ProductsPage from "./user/product/products";

const isAuthenticated = (role) => {
  // if(role === 'user'){
  //     //! will get cookie and decode it and check if it is admin or
  // }

  return true;
};

const UserLayoutAuth = () => {
  if (!isAuthenticated("user")) {
    return <Navigate to="/signup" />;
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
        element: <ProductsPage />,
        path: "/products",
      },
      {
        element: <ProductDetails />,
        path: "/product-details",
      },

      {
        element: <Cart />,
        path: "/cart",
      },
      {
        element: <Order />,
        path: "/order",
      },
      {
        element: <Wishlist />,
        path: "/wishlist",
      },
      {
        element: <UserProfile />,
        path: "/user-profile",
      },
    ],
  },

  {
    element: <UserLayoutUnAuth />,
    children: [
      {
        element: <Home />,
        path: "/",
      },
      {
        element: <Home />,
        path: "/home",
      },
    ],
  },

  {
    element: <WithoutLayoutUnAuth />,
    children: [
      {
        element: <Signup />,
        path: "/signup",
      },

      {
        element: <Login />,
        path: "/login",
      },
    ],
  },
]);

export default router;
