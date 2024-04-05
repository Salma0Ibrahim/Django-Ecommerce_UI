import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getproductsaction } from '../redux/action/productaction';
import { addToWishlistAction , getWishlistAction , removeFromWishlistAction } from "../redux/action/wishlist-action";
import Cookies from 'js-cookie'; // Import Cookies
import decodeToken from "../redux/action/decodeToken";

function Products() {
  const dispatch = useDispatch();
  const { products } = useSelector(state => state.products);
  const { wishlists } = useSelector(state => state.wishlists)
  const [id, setId] = useState(1); // Assuming this is a fixed value
  const [customer_id, setCustomerId] = useState(null); // Initialize customer_id with null

  useEffect(() => {
    /* start */
    const checkToken = () => {
      const token = localStorage.getItem('token');
      if (token) {
        // Token exists, decode and process it
        const decodedToken = decodeToken(token);
        console.log('Decoded token:', decodedToken);
        const userId = decodedToken.id;
        console.log('user id:', userId);
        setCustomerId(userId); // Update customer_id with userId
        // Perform further actions based on the decoded token
      } else {
        // Token does not exist
        console.log('Token does not exist');
        console.log(Cookies.get())
        // Redirect to login or handle the absence of token
      }
    };

    checkToken(); // Call the function when the component mounts

    /*  end  */
    dispatch(getproductsaction());
    dispatch(getWishlistAction());
  }, [dispatch]);

  /* event handler */
  const handlechange = (e) => {
    const { name, value } = e.target;
    if (name === 'id') setId(value);
  };

  const handlesubmit = (e, productId) => {
    e.preventDefault();
    const data = {
      id: id,
      customer_id: customer_id,
      product_id: productId,
    };
    console.log("the form = ",data)
    dispatch(addToWishlistAction(data));
  };

  return (
    <div className="container">
      <div className="row">
        {products?.map(product => (
          <div className="col-md-4" style={{ padding: '10px 50px' }} key={product.id}>
            <div className="card text-center">
              <div className="card-img-top">
                <img src={product.thumbnail} height='150' width="100%" alt={product.title} />
              </div>
              <h6>{product.name}</h6>
              <h6>{product.price} $</h6>
              <form onSubmit={(e) => handlesubmit(e, product.id)}>
                <input type='text' name="id" className='form-control' onChange={handlechange} value={id} />
                <input type='text' name="product_id" className='form-control' value={product.id} readOnly />
                <input type='text' name="customer_id" className='form-control' value={customer_id || ''} readOnly /> {/* Ensure customer_id is not null */}
                <button className="btn btn-danger">add to wishlist</button>
              </form>
            </div>
          </div>
        ))}
      </div>
      {wishlists?.map(product => (
          <div className="col-md-4" style={{ padding: '10px 50px' }} key={product.id}>
            <div className="card text-center">
              <h6>id : {product.id}</h6>
              <h6>customer id : {product.customer_id} $</h6>
              <h6>product id : {product.product_id} $</h6>
              <button onClick={() => dispatch(removeFromWishlistAction(product.id))} className="btn btn-danger">remove</button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Products;
