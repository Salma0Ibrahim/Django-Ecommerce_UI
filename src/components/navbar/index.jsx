import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import { Link } from "react-router-dom";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldHeart,
  faUserPlus,
  faMagnifyingGlass,
  faCartShopping,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Wishlist from "../../pages/user/wishlist";
import { useDispatch, useSelector } from "react-redux";
import { getWishlistAction } from "../../redux/action/wishlist-action";
import { getCartItemsAction } from "../../redux/action/cartitemaction";
import decodeToken from "../../redux/action/decodeToken";
import axios from "axios";
import { Dropdown } from "react-bootstrap";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const dispatch = useDispatch();
  const { wishlists } = useSelector((state) => state.wishlists);
  const { cartitems } = useSelector((state) => state.cartitems);
  const [cart_id, setCartId] = useState(null);
  const [customer_id, setCustomerId] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = decodeToken(token);
        const userId = decodedToken.id;
        setCustomerId(userId);

        try {
          const response = await axios.get(
            `http://localhost:8000/cart/searchcustomercart/${userId}/`
          );
          if (response.data.length > 0 && response.data[0].id) {
            const cartId = response.data[0].id;
            setCartId(cartId);
            dispatch(getCartItemsAction(cartId));
          } else {
            const newCartResponse = await axios.post(
              "http://localhost:8000/cart/",
              { customer_id: userId }
            );
            if (newCartResponse.data && newCartResponse.data.id) {
              const newCartId = newCartResponse.data.id;
              setCartId(newCartId);
              dispatch(getCartItemsAction(newCartId));
            } else {
              console.error(
                "Error creating new cart: Response data or cart ID is undefined."
              );
            }
          }
        } catch (error) {
          console.error("Error fetching or creating cart:", error);
        }
      } else {
        console.log("Token does not exist");
        // Redirect to login or handle the absence of token
      }
    };

    checkToken();
  }, [dispatch]);

  useEffect(() => {
    // This useEffect will run whenever `customer_id` changes
    if (customer_id !== null) {
      dispatch(getWishlistAction(customer_id));
    }
  }, [customer_id, dispatch]);

  return (
    <>
      <div className="navbar2">
        <div className="nav-links">
          <Link className="navlink" to="/">
            Home
          </Link>
          <Link className="navlink" to="/products">
            Products
          </Link>
          <Link className="navlink" to="#">
            Services
          </Link>
          <Link className="navlink" to="#">
            About Us
          </Link>
          <Link className="navlink" to="#">
            Contact
          </Link>
        </div>
        <div className="company-title">
          <span>electric</span>
          <br />
          products
        </div>
        <div className="auth-buttons">
          <div className="auth-fields1">
            <input
              type="text"
              className="form-control"
              placeholder="search...."
            />
            <button className="navbutton1">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
          <div className="notificationparent">
            <div className="notification">{cartitems.length}</div>
            <Link to="/cart">
              <button className="navbutton2">
                <FontAwesomeIcon style={{ color: "black" }} icon={faCartShopping} />
              </button>
            </Link>
          </div>
          <div className="notificationparent">
            <div className="notification">{wishlists.length}</div>
            <button className="navbutton2" onClick={toggleSidebar}>
              <FontAwesomeIcon style={{ color: "black" }} icon={faShieldHeart} />
            </button>
          </div>
          <Dropdown alignRight>
            <Dropdown.Toggle
              variant="light"
              id="dropdown-basic"
              className="navbutton3"
            >
              <FontAwesomeIcon icon={faUser} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/update-profile">Update Profile</Dropdown.Item>
              <Dropdown.Item href="/logout">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <Wishlist isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </>
  );
};

export default Navbar;
