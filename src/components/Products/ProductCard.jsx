import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import styles from './style.module.css';
import { FaShoppingCart } from 'react-icons/fa';
import { IoPricetags } from 'react-icons/io5';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { IoEyeOutline } from 'react-icons/io5';
import decodeToken from '../../redux/action/decodeToken';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToWishlistAction,
  getWishlistAction,
  removeFromWishlistAction,
} from '../../redux/action/wishlist-action';
import { useNavigate } from 'react-router-dom';
import {
  getCartItemsAction,
  addcartitemAction,
  removecartitemAction,
} from '../../redux/action/cartitemaction';
import { toast } from 'react-toastify';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
function ProductCard({ product }) {
  const navigate = useNavigate();
  const redirectToDetails = (id) => {
    navigate(`/product-details/${id}`);
  };

  const base_url = import.meta.env.VITE_base_url;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <span key={i} style={{ color: 'gold', fontSize: '26px' }}>
            &#9733;
          </span>,
        ); // Full star
      } else {
        stars.push(
          <span key={i} style={{ color: 'gold', fontSize: '26px' }}>
            &#9734;
          </span>,
        ); // Empty star
      }
    }
    return stars;
  };

  const dispatch = useDispatch();
  const [customer_id, setCustomerId] = useState(null);
  const [cart_id, setCartId] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  const { wishlists } = useSelector((state) => state.wishlists);
  const { cartitems } = useSelector((state) => state.cartitems);

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

  const handleAddToWishlist = (e, productId) => {
    e.preventDefault();

    if (!customer_id) {
      navigate('/login');
      return;
    }

    if (isInWishlist) {
      if (wishlists && wishlists.length > 0) {
        const wishlistItem = wishlists.find(
          (item) => item.product_id === productId,
        );
        if (wishlistItem) {
          dispatch(removeFromWishlistAction(wishlistItem.id));
          toast.success('Item Removed From Wishlist 😃');
        }
      }
    } else {
      const data = {
        id: 1,
        customer_id: customer_id,
        product_id: productId,
      };
      dispatch(addToWishlistAction(data));
      toast.success('Item Added To Wishlist 😃');
    }
  };

  useEffect(() => {
    setIsInWishlist(wishlists.some((item) => item.product_id === product?.id));
  }, [wishlists, product?.id]);

  useEffect(() => {
    if (cart_id !== null) {
      const exist = cartitems.some(
        (item) => item.product_id === product?.id && item.cart_id === cart_id,
      );
      setIsInCart(exist);
    }
  }, [cartitems, product?.id, cart_id]);

  const AddCartitemSubmit = (productId) => {
    const data = {
      id: 1,
      product_id: productId,
      quantity: 1,
      cart_id: cart_id,
    };

    if (customer_id) {
      // Ensure cartitems is defined and not empty before searching for a cart item
      if (cartitems && cartitems.length > 0) {
        const cartItem = cartitems.find(
          (item) => item.product_id === productId && item.cart_id === cart_id,
        );
        if (cartItem) {
          dispatch(removecartitemAction(cartItem.id));
          toast.success('Item Removed From Cart 😃');
        } else {
          dispatch(addcartitemAction(data));
          toast.success('Item Added To Cart 😃');
        }
      } else {
        dispatch(addcartitemAction(data));
        toast.success('Item Added To Cart 😃');
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <div className={styles.productcard}>
      <form
        onSubmit={(e) => handleAddToWishlist(e, product.id)}
        style={{ height: '1px' }}
      >
        <input type="hidden" name="product_id" value={product.id} readOnly />
        <button className="border-0 bg-none">
          {isInWishlist ? (
            <MdFavorite className={`${styles.icon} ${styles.favoriteIcon}`} />
          ) : (
            <MdFavoriteBorder
              className={`${styles.icon} ${styles.favoriteIcon}`}
            />
          )}
        </button>
      </form>

      <IoEyeOutline
        className={`${styles.icon} ${styles.eyeIcon}`}
        onMouseEnter={() => setIsEyeHovered(true)}
        onMouseLeave={() => setIsEyeHovered(false)}
        onClick={() => redirectToDetails(product.id)}
      />

      <Card.Img
        variant="top"
        src={product.thumbnail_url}
        className={styles.cardImage}
      />

      <div className={styles.cardBody}>
        <Card.Title className={styles.cardTitle}>{product.name}</Card.Title>

        <div className={styles.priceRectangle}>
          <IoPricetags className={styles.priceIcon} />${product.price}
        </div>

        <div className={styles.rating}>
          {renderStars(product.rating)} ({product.rating})
        </div>

        <Button
          variant="primary"
          className={styles.customButton}
          onClick={() => AddCartitemSubmit(product.id)}
        >
          {/* <FaShoppingCart className={styles.cartIcon} /> */}
          <FontAwesomeIcon className="cartbuttonicon" icon={faShoppingCart} />
          {isInCart ? (
            <span>&nbsp; remove from cart</span>
          ) : (
            <span>&nbsp; Add to cart</span>
          )}
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
