import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getWishlistAction, removeFromWishlistAction } from "../../../redux/action/wishlist-action";
import axios from 'axios';
import './wishlist.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Wishlist = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const { wishlists } = useSelector(state => state.wishlists);
    const [wishlistProducts, setWishlistProducts] = useState([]);

    useEffect(() => {
        dispatch(getWishlistAction());
    }, [dispatch]);

    // Fetch product details for wishlist items
    useEffect(() => {
        const fetchWishlistProducts = async () => {
            const productsWithDetails = await Promise.all(
                wishlists.map(async (wishlistItem) => {
                    const productResponse = await fetchProductDetails(wishlistItem.product_id);
                    return {
                        ...wishlistItem,
                        productDetails: productResponse, // Add product details to wishlist item
                    };
                })
            );
            setWishlistProducts(productsWithDetails);
        };
        fetchWishlistProducts();
    }, [wishlists]);

    // Function to fetch product details based on product_id
    const fetchProductDetails = async (productId) => {
        try {
            const response = await axios.get(`http://localhost:8000/products/${productId}/`);
            return response.data;
        } catch (error) {
            console.error("Error fetching product details:", error);
            return null;
        }
    };

    return (
        <div className="wishlist">
            {isOpen && <div className="overlay" onClick={onClose}></div>}
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="wishlistdiv1">
                    <div className='wishlistdiv1child1'>
                        <p className='wishlistTitle'>Shopping Wishlist</p>
                    </div>
                    <div className='wishlistdiv1child1'>
                        <button className="close-btn" onClick={onClose}><FontAwesomeIcon icon={faXmark} /></button>
                    </div>
                </div>
                {/* Add your sidebar content here */}
                <div className='wishlistMainBody'>
                    {wishlistProducts.length > 0 ? (
                        wishlistProducts.map((wishlistItem) => (
                            <div className="wishlistItem" key={wishlistItem.id}>
                                {wishlistItem.productDetails && (
                                    <div className='productDetails'>
                                        <img src="https://i.pinimg.com/564x/56/78/bd/5678bdf9361dffbb932d143b333ff3e2.jpg" alt={wishlistItem.productDetails.name} />
                                        <div className='productdetails2'>
                                            <div className='productInfo'>
                                                <p>{wishlistItem.productDetails.name}</p>
                                                <p style={{color:"gray"}}>{wishlistItem.productDetails.price} $</p>
                                            </div>
                                            <div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Stop the event from propagating
                                                        dispatch(removeFromWishlistAction(wishlistItem.id));
                                                    }}
                                                    className="wishlistitemremove"
                                                >
                                                    <FontAwesomeIcon className="wishlistitemremovechild" icon={faXmark} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <hr />
                            </div>
                        ))
                    ) : (
                        <div className='wishlistBody'>
                            <div className='body1'>
                                <p>No products in the wishlist.</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className='wishlistbutton'>
                    <button className='lastbutton' onClick={onClose}>Continue Shopping</button>
                </div>
            </div>
        </div>
    );
}

export default Wishlist;
