import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCartItemsAction,
  removecartitemAction,
  updatecartitemAction,
} from '../../../redux/action/cartitemaction';
import axios from 'axios';
import decodeToken from '../../../redux/action/decodeToken';
import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../components/spinner/spinner';

const Cart = () => {
  const dispatch = useDispatch();
  const { cartitems, loading } = useSelector((state) => state.cartitems);
  const [cart_id, setCartId] = useState(null);
  const [cartitemsProducts, setCartItemsProducts] = useState([]);
  const navigate = useNavigate();
  const base_url = import.meta.env.VITE_base_url;

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = decodeToken(token);
        const userId = decodedToken.id;
        try {
          const response = await axios.get(
            `${base_url}cart/searchcustomercart/${userId}/`,
          );
          if (response.data.length > 0 && response.data[0].id) {
            const retrievedCartId = response.data[0].id;
            setCartId(retrievedCartId);
            dispatch(getCartItemsAction(retrievedCartId));
          }
        } catch (error) {
          console.error('Error fetching or creating cart:', error);
        }
      } else {
        console.log('Token does not exist');
      }
    };

    checkToken();
  }, [dispatch]);

  useEffect(() => {
    const fetchCartItemsProducts = async () => {
      const productsWithDetails = await Promise.all(
        cartitems.map(async (cartItem) => {
          const productResponse = await fetchProductDetails(
            cartItem.product_id,
          );
          return {
            ...cartItem,
            productDetails: productResponse,
          };
        }),
      );
      setCartItemsProducts(productsWithDetails);
    };

    if (cartitems.length >= 0) {
      fetchCartItemsProducts();
    }
  }, [cartitems]);

  const fetchProductDetails = async (productId) => {
    try {
      const response = await axios.get(`${base_url}products/${productId}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product details:', error);
      return null;
    }
  };

  const handleIncrementQuantity = async (cartItemId, productId) => {
    const cartItem = cartitems.find((item) => item.id === cartItemId);
    const newQuantity = cartItem.quantity + 1;
    await updateCartItemQuantity(cartItemId, productId, newQuantity);
  };

  const handleDecrementQuantity = async (cartItemId, productId) => {
    const cartItem = cartitems.find((item) => item.id === cartItemId);
    const newQuantity = cartItem.quantity - 1;
    if (newQuantity >= 0) {
      await updateCartItemQuantity(cartItemId, productId, newQuantity);
    }
  };

  const updateCartItemQuantity = async (cartItemId, productId, newQuantity) => {
    try {
      const formdata = {
        id: 1,
        product_id: productId,
        quantity: newQuantity,
        cart_id: cart_id,
      };
      dispatch(updatecartitemAction({ cartItemId, formdata }));
    } catch (error) {
      console.log('Error updating cart item quantity:', error);
    }
  };

  const getTotalPrice = () => {
    return cartitemsProducts.reduce((total, cartItem) => {
      if (cartItem.productDetails) {
        return (
          total + Number(cartItem.productDetails.price) * cartItem.quantity
        );
      }
      return total;
    }, 0);
  };

  return (
    <div className="cart-container">
      <div className="text-center mx-4">
        <h2 className="carttitle">Cart</h2>
      </div>
      <div className="row">
        <div className="col-md-8">
          {/* Product Details Section */}
          <div className="product-details">
            {loading ? (
              <Spinner />
            ) : cartitemsProducts.length > 0 ? (
              cartitemsProducts.map((cartItem) => (
                <div className="cart-item" key={cartItem.id}>
                  {cartItem.productDetails && (
                    <div
                      className="row"
                      style={{ alignItems: 'center', padding: '25px' }}
                    >
                      <div className="col-md-2">
                        <button
                          onClick={() => {
                            dispatch(removecartitemAction(cartItem.id));
                            toast.success('the item removed from your card 👍🏼');
                          }}
                          className="wishlistitemremove"
                        >
                          <FontAwesomeIcon
                            className="wishlistitemremovechild"
                            icon={faXmark}
                          />
                        </button>
                      </div>
                      <div className="col-md-3">
                        <img
                          src={cartItem.productDetails.thumbnail_url}
                          alt={cartItem.productDetails.name}
                          className="img-fluid"
                        />
                      </div>
                      <div className="col-md-2">
                        <h5 className="itemname">
                          {cartItem.productDetails.name}
                        </h5>
                      </div>
                      <div className="col-md-2">
                        <h5 className="textmute">
                          ${cartItem.productDetails.price}
                        </h5>
                      </div>
                      <div className="col-md-2 cartquantity">
                        <button
                          onClick={() =>
                            handleIncrementQuantity(
                              cartItem.id,
                              cartItem.productDetails.id,
                            )
                          }
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                        <h5 className="textmute">{cartItem.quantity}</h5>
                        <button
                          onClick={() =>
                            handleDecrementQuantity(
                              cartItem.id,
                              cartItem.productDetails.id,
                            )
                          }
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="empty-cart" style={{ marginTop: '80px' }}>
                <p>No products in the cart.</p>
              </div>
            )}
          </div>
        </div>
        <div className="col-md-4">
          {/* Cart Summary Section */}
          <div className="cart-summary">
            <div className="summary-header">
              <h5>Cart Summary</h5>
            </div>
            <div className="summary-content">
              <p>Total Items: {cartitems.length}</p>
              <p>Total Price: ${getTotalPrice().toFixed(2)}</p>
              <button
                className="cartbutton"
                onClick={() => {
                  navigate('/order');
                }}
              >
                Make Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
