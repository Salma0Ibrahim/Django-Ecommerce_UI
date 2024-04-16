import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../../apis/congif';
import { IoPricetags } from 'react-icons/io5';
import { FaShoppingCart } from 'react-icons/fa';
import decodeToken from '../../../redux/action/decodeToken';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getCartItemsAction,
  addcartitemAction,
  removecartitemAction,
} from '../../../redux/action/cartitemaction';
import { toast } from 'react-toastify';

import './index.css';
import CardLoader from '../../../components/cardLoader/cardLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTag } from '@fortawesome/free-solid-svg-icons';
import Rating from 'react-rating';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [customer_id, setCustomerId] = useState(null);
  const [cart_id, setCartId] = useState(null);
  const [isInCart, setIsInCart] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const { cartitems } = useSelector((state) => state.cartitems);

  const base_url = import.meta.env.VITE_base_url;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`products/${params.id}/`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

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
        console.log('Token does not exist');
        // Redirect to login or handle the absence of token
      }
    };

    checkToken();
  }, [dispatch]);

  useEffect(() => {
    const fetchUserRating = async () => {
      if (customer_id && product) {
        try {
          const response = await axiosInstance.get(
            `users/${customer_id}/ratings/${params.id}/`,
          );
          setUserRating(response.data.user_rating);
        } catch (error) {
          console.error('Error fetching user rating:', error);
        }
      }
    };

    fetchUserRating();
  }, [customer_id, product]);

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
      navigate('/signup');
    }
  };

  const handleRatingChange = async (value) => {
    setUserRating(value);
    const token = localStorage.getItem('token');
    if (token) {
      try {
        let response;
        const existingRating = await axiosInstance.get(
          `users/${customer_id}/ratings/${params.id}/`,
        );
        if (existingRating.data) {
          response = await axiosInstance.put(
            `ratings/${existingRating.data.id}/`,
            {
              user: customer_id,
              product: params.id,
              user_rating: value,
            },
          );
        } else {
          response = await axiosInstance.post(`ratings/`, {
            user: customer_id,
            product: params.id,
            user_rating: value,
          });
        }

        if (response.status === 200 || response.status === 201) {
          toast.success('Rating Updated Successfully 😃');
        }
      } catch (error) {
        console.error('Error updating rating:', error);
      }
    } else {
      console.log('Token does not exist');
      // Redirect to login or handle the absence of token
    }
  };

  if (loading) return <CardLoader />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className="py-5">
      <div className="container">
        <div className="row gx-5">
          <aside className="col-lg-6">
            <div className="border rounded-4 mb-3 d-flex justify-content-center">
              <img
                style={{
                  maxWidth: '100%',
                  maxHeight: '100vh',
                  margin: 'auto',
                }}
                className="rounded-4 fit"
                src={product.thumbnail_url}
                alt="Product"
              />
            </div>
          </aside>
          <main className="col-lg-6">
            <div className="ps-lg-3">
              <h4 className="title text-dark border-bottom pb-2 mb-4">
                {product.name}
              </h4>
              <div className="d-flex flex-row my-3 align-items-center">
                <Rating
                  emptySymbol={
                    <FontAwesomeIcon icon={farStar} style={{ color: '#ccc' }} />
                  }
                  fullSymbol={
                    <FontAwesomeIcon
                      icon={fasStar}
                      style={{ color: '#ffc107' }}
                    />
                  }
                  initialRating={userRating}
                  onClick={handleRatingChange}
                />
                <span className="ms-2">{`Avg: ${product.rating} Stars`}</span>
              </div>
              <div className="mb-4">
                <span className="price">
                  <FontAwesomeIcon icon={faTag} /> ${product.price}
                </span>
              </div>
              <h5>About the product:</h5>
              <p className="mb-4">{product.description}</p>
              <div className="row mb-4">
                <dt className="col-2">Stock:</dt>
                <dd className="col-9">{product.stock}</dd>
              </div>
              <hr />
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-primary shadow-0 customButton"
                  onClick={() => AddCartitemSubmit(product.id)}
                  disabled={product.stock === 0}
                >
                  <FontAwesomeIcon icon={faShoppingCart} /> &nbsp;{' '}
                  {isInCart ? 'Remove from cart' : 'Add to cart'}
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
