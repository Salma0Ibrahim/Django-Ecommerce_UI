import React, { useState, useEffect } from 'react';
import style from './style.module.css';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShieldHeart,
  faUserPlus,
  faMagnifyingGlass,
  faCartShopping,
  faUser,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import Wishlist from '../../pages/user/wishlist';
import { useDispatch, useSelector } from 'react-redux';
import { getWishlistAction } from '../../redux/action/wishlist-action';
import { getCartItemsAction } from '../../redux/action/cartitemaction';
import decodeToken from '../../redux/action/decodeToken';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';
import { setSearchValue } from '../../redux/slices/searchReducer';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/home');
  };
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const dispatch = useDispatch();
  const { wishlists } = useSelector((state) => state.wishlists);
  const { cartitems } = useSelector((state) => state.cartitems);
  const [cart_id, setCartId] = useState(null);
  const [customer_id, setCustomerId] = useState(null);
  const searchValue = useSelector((state) => state.search.searchValue); // Get the searchValue from Redux

  const base_url = import.meta.env.VITE_base_url;

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = decodeToken(token);
        const userId = decodedToken.id;
        setCustomerId(userId);

        try {
          const response = await axios.get(
            `${base_url}cart/searchcustomercart/${userId}/`,
          );
          if (response.data.length > 0 && response.data[0].id) {
            const cartId = response.data[0].id;
            setCartId(cartId);
            dispatch(getCartItemsAction(cartId));
          } else {
            const newCartResponse = await axios.post(`${base_url}cart/`, {
              customer_id: userId,
            });
            if (newCartResponse.data && newCartResponse.data.id) {
              const newCartId = newCartResponse.data.id;
              setCartId(newCartId);
              dispatch(getCartItemsAction(newCartId));
            } else {
              console.error(
                'Error creating new cart: Response data or cart ID is undefined.',
              );
            }
          }
        } catch (error) {
          console.error('Error fetching or creating cart:', error);
        }
      } else {
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
        <button className="toggle-button" onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div
          className={`nav-links ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}
        >
          <Link className="navlink" to="/">
            Home
          </Link>
          <Link className="navlink" to="/products">
            Products
          </Link>
          <Link className="navlink" to="/">
            Services
          </Link>
          <Link className="navlink" to="/">
            About Us
          </Link>
          <Link className="navlink" to="/">
            Contact
          </Link>
        </div>
        <div className="company-title">
          <span>electric</span>
          <br />
          products
        </div>
        <div className="auth-buttons">
          <div
            className={`auth-fields1 ${
              isMobileMenuOpen ? 'mobile-menu-open' : ''
            }`}
          >
            <input
              type="text"
              className="form-control"
              placeholder="search...."
              value={searchValue}
              onChange={(e) => dispatch(setSearchValue(e.target.value))}
            />
            <button className="navbutton1" onClick={toggleMobileMenu}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
          {localStorage.getItem('token') ? (
            <>
              <div className="notificationparent">
                <div className="notification">{cartitems.length}</div>
                <Link to="/cart">
                  <button className="navbutton2">
                    <FontAwesomeIcon
                      style={{ color: 'black' }}
                      icon={faCartShopping}
                    />
                  </button>
                </Link>
              </div>
              <div className="notificationparent">
                <div className="notification">{wishlists.length}</div>
                <button className="navbutton2" onClick={toggleSidebar}>
                  <FontAwesomeIcon
                    style={{ color: 'black' }}
                    icon={faShieldHeart}
                  />
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
                  <Dropdown.Item
                    onClick={() => {
                      navigate('/user-profile');
                    }}
                  >
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="navbutton2">
                  Login
                  <FontAwesomeIcon style={{ color: 'black' }} icon={faUser} />
                </button>
              </Link>
              <Link to="/signup">
                <button className="navbutton2">
                  Signup
                  <FontAwesomeIcon
                    style={{ color: 'black' }}
                    icon={faUserPlus}
                  />
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
      <Wishlist isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </>
  );
};

export default Navbar;
