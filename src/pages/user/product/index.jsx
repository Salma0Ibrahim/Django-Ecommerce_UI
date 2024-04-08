import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getproductsaction } from '../../../redux/action/productaction';
import { addToWishlistAction } from "../../../redux/action/wishlist-action";
import decodeToken from '../../../redux/action/decodeToken'
import axios from 'axios';
import { addcartitemAction } from "../../../redux/action/cartitemaction";

const Product = () => {
  const dispatch = useDispatch();
  const { products } = useSelector(state => state.products);
  const [id, setId] = useState(1); // Assuming this is a fixed value
  const [customer_id, setCustomerId] = useState(null); // Initialize customer_id with null
  const [cart_id, setCartId] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = decodeToken(token);
        const userId = decodedToken.id;
        setCustomerId(userId); 
  
        try {
          const response = await axios.get(`http://localhost:8000/cart/searchcustomercart/${userId}/`);
          if (response.data.length > 0 && response.data[0].id) {
            setCartId(response.data[0].id);
            console.log("cartId = ", response.data[0].id);
          } else {
            // Handle the case where no cart is found and create a new cart
            const newCartResponse = await axios.post('http://localhost:8000/cart/', { customer_id: userId });
            if (newCartResponse.data && newCartResponse.data.id) {
              setCartId(newCartResponse.data.id);
              console.log("new cartId = ", newCartResponse.data.id);
            } else {
              console.error("Error creating new cart: Response data or cart ID is undefined.");
              // Handle the error condition, e.g., display a message to the user
            }
          }
        } catch (error) {
          console.error("Error fetching or creating cart:", error);
          // Handle the error condition, e.g., display a message to the user
        }
      } else {
        console.log('Token does not exist');
        // Redirect to login or handle the absence of token
      }
    };
  
    checkToken();
    dispatch(getproductsaction());
  }, [dispatch]);
  

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
    console.log("the form = ", data)
    dispatch(addToWishlistAction(data));
  };

  const handlecartitemsubmit = (e, productId) => {
    e.preventDefault();
    const data = {
      id: id,
      product_id: productId,
      quantity : 1,
      cart_id : cart_id
    };
    console.log("the cart item form = ", data)
    dispatch(addcartitemAction(data));
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
              {/*         add to wishlist form         */}
              <form onSubmit={(e) => handlesubmit(e, product.id)}>
                <input type='text' name="id" className='form-control' onChange={handlechange} value={id} />
                <input type='text' name="product_id" className='form-control' value={product.id} readOnly />
                <input type='text' name="customer_id" className='form-control' value={customer_id || ''} readOnly />
                <button className="btn btn-danger">add to wishlist</button>
              </form>
              <hr />
              {/*         add to cart form         */}
              <form onSubmit={(e) => handlecartitemsubmit(e, product.id)}>
                <input type='text' name="id" className='form-control' onChange={handlechange} value={id} />
                <input type='text' name="product_id" className='form-control' value={product.id} readOnly />
                <input type="text" name="cart_id" className="form-contorl" value={cart_id} readOnly />
                 <button className="btn btn-danger">add to cart</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
