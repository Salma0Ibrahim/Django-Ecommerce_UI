import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getWishlistAction,
  removeFromWishlistAction,
} from '../../../redux/action/wishlist-action';
import axios from 'axios';
import './wishlist.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import decodeToken from '../../../redux/action/decodeToken';
import { toast } from 'react-toastify';

const Wishlist = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { wishlists } = useSelector((state) => state.wishlists);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [customer_id, setCustomerId] = useState(null);

  const base_url = import.meta.env.VITE_base_url;
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = decodeToken(token);
        const userId = decodedToken.id;
        setCustomerId(userId);
      } else {
        console.log('Token does not exist');
        // Redirect to login or handle the absence of token
      }
    };
    checkToken();
  }, []);

  useEffect(() => {
    if (customer_id) {
      dispatch(getWishlistAction(customer_id));
    }
  }, [dispatch, customer_id]);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      const productsWithDetails = await Promise.all(
        wishlists.map(async (wishlistItem) => {
          const productResponse = await fetchProductDetails(
            wishlistItem.product_id,
          );
          return {
            ...wishlistItem,
            productDetails: productResponse,
          };
        }),
      );
      setWishlistProducts(productsWithDetails);
    };
    fetchWishlistProducts();
  }, [wishlists]);

  const fetchProductDetails = async (productId) => {
    try {
      const response = await axios.get(`${base_url}products/${productId}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product details:', error);
      return null;
    }
  };

  return (
    <div className="wishlist">
      {isOpen && <div className="overlay" onClick={onClose}></div>}
      <div className={`wishlistsidebar ${isOpen ? 'open' : ''}`}>
        <div className="wishlistdiv1">
          <div className="wishlistdiv1child1">
            <p className="wishlistTitle">Shopping Wishlist</p>
          </div>
          <div className="wishlistdiv1child1">
            <button className="close-btn" onClick={onClose}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>
        {/* Add your sidebar content here */}
        <div className="wishlistMainBody">
          {wishlistProducts.length > 0 ? (
            wishlistProducts.map((wishlistItem) => (
              <div className="wishlistItem" key={wishlistItem.id}>
                {wishlistItem.productDetails && (
                  <div className="productDetails">
                    <img
                      src={wishlistItem.productDetails.thumbnail_url}
                      alt={wishlistItem.productDetails.name}
                    />
                    <div className="productdetails2">
                      <div className="productInfo">
                        <p>{wishlistItem.productDetails.name}</p>
                        <p style={{ color: 'gray' }}>
                          {wishlistItem.productDetails.price} $
                        </p>
                      </div>
                      <div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Stop the event from propagating
                            dispatch(removeFromWishlistAction(wishlistItem.id));
                            toast.success(
                              'the item removed from your wishlist 👍🏼',
                            );
                          }}
                          className="wishlistitemremove"
                        >
                          <FontAwesomeIcon
                            className="wishlistitemremovechild"
                            icon={faXmark}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                <hr />
              </div>
            ))
          ) : (
            <div className="wishlistBody">
              <div className="text-center body1">
                <p>No products in the wishlist.</p>
              </div>
            </div>
          )}
        </div>
        <div className="wishlistbutton">
          <button className="lastbutton" onClick={onClose}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
