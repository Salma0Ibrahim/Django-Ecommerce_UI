import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from 'mdb-react-ui-kit';
import './Receipt.css';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import ShipmentForm from '../../components/shipment-form/shipment-form';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { getCartItemsAction } from '../../redux/action/cartitemaction';
import decodeToken from '../../redux/action/decodeToken';
import axios from 'axios';
import { fetchShipment } from '../../redux/action/shipment-action';
import { createOrder, createOrderItem } from '../../redux/action/order-actions';
import React from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { cartitems } = useSelector((state) => state.cartitems);
  const [cart_id, setCartId] = useState(null);
  const [response, serResponse] = useState('');
  const [cartitemsProducts, setCartItemsProducts] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const { shipments } = useSelector((state) => state.shipment);
  const [openAddModal, setOpenAddModal] = useState(false);

  const handleAdd = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  useEffect(() => {
    dispatch(fetchShipment());
  }, [dispatch]);

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };

  const handlePlaceOrder = () => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = decodeToken(token);
        const userId = decodedToken.id;
        return userId;
      }
      return null;
    };

    const userId = checkToken();

    if (!userId) {
      console.log('Token does not exist');
      // Handle the absence of token
      return;
    }

    // Define orderData with necessary information
    const orderData = {
      total_price: getTotalPrice(),
      shipment_id: selectedAddress,
      delivery_date: new Date(),
      status: 'pending',
      user: userId,
      items: cartitemsProducts.map((item) => ({
        quantity: item.quantity,
        product_id: item.productDetails.id,
      })),
    };
    return orderData;
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${base_url}stripe/create-checkout-session`,
        handlePlaceOrder(dispatch, selectedAddress, cartitemsProducts),
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': localStorage.getItem('token'),
          },
        },
      );
      // Redirect to the checkout session URL
      window.location.href = response.data.redirect_to;
      const [message, setMessage] = useState('');
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  const base_url = import.meta.env.VITE_base_url;

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = decodeToken(token);
        const userId = decodedToken.id;
        try {
          const response = await axios.get(
            `${base_url}searchcustomercart/${userId}/`,
          );
          if (response.data.length > 0 && response.data[0].id) {
            const retrievedCartId = response.data[0].id;
            setCartId(retrievedCartId);
            dispatch(getCartItemsAction(retrievedCartId));
          }
        } catch (error) {
          console.error('Error fetching or creating cart:', error);
          // Handle the error condition, e.g., display a message to the user
        }
      } else {
        console.log('Token does not exist');
        // Redirect to login or handle the absence of token
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

    if (cartitems.length > 0) {
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
    <>
      <section
        className="h-100 gradient-custom"
        style={{ backgroundColor: '#eee' }}
      >
        {cartitemsProducts.length == 0 ? (
          <div className="row">
            <div className="col text-center" style={{ height: '100vh' }}>
              <h3 style={{ color: '#c93535' }} className="mt-5">
                Please Add Products to the Cart
              </h3>
              <div className="d-flex justify-content-center align-items-center ">
                <img
                  src="src/assets/empty_cart.png"
                  alt="No products found"
                  style={{ maxWidth: '20%', maxHeight: '20%' }}
                />
              </div>
            </div>
          </div>
        ) : (
          <MDBContainer className="py-5 h-100 ">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol lg="10" xl="8">
                <MDBCard style={{ borderRadius: '10px' }}>
                  <MDBCardHeader className="px-4 py-5">
                    <MDBTypography
                      tag="h5"
                      className="text-secondary-dark mb-0"
                    >
                      Thanks for your Order
                    </MDBTypography>
                  </MDBCardHeader>
                  <MDBCardBody className="p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <p className="lead mb-0 recipet_color">Receipt</p>
                    </div>
                    {cartitemsProducts.length > 0 &&
                      cartitemsProducts.map((cartItem) => (
                        <MDBCard
                          key={cartItem.id}
                          className="shadow-0 border mb-4"
                        >
                          <MDBCardBody>
                            <MDBRow>
                              <MDBCol md="2">
                                <MDBCardImage
                                  src={cartItem.productDetails.thumbnail_url}
                                  fluid
                                  alt="Phone"
                                />
                              </MDBCol>
                              <MDBCol
                                md="2"
                                className="text-center d-flex justify-content-center align-items-center"
                              >
                                <p className="text-secondary-dark mb-0 recipet_color">
                                  {cartItem.productDetails.name}&nbsp;{' '}
                                  <span className="text-secondary-dark mb-0 recipet_entity small">
                                    &times;{cartItem.quantity}
                                  </span>
                                </p>
                              </MDBCol>
                              <MDBCol
                                md="8"
                                className="text-center d-flex justify-content-center align-items-center"
                              >
                                <p className="text-secondary-dark mb-0 recipet_entity ">
                                  Price: {cartItem.productDetails.price}
                                </p>
                              </MDBCol>
                            </MDBRow>
                            <hr
                              className="mb-5"
                              style={{ backgroundColor: '#e0e0e0', opacity: 1 }}
                            />
                          </MDBCardBody>
                        </MDBCard>
                      ))}

                    {shipments.length === 0 ? (
                      <div className="text-center mt-5 position-absolute top-50 start-50 translate-middle">
                        <h6 className="mt-5" style={{ color: 'black' }}>
                          Please add shipment to proceed your order
                        </h6>
                      </div>
                    ) : (
                      <>
                        <div className="position-relative mt-2">
                          <hr
                            className="mb-4"
                            style={{ backgroundColor: '#e0e0e0', opacity: 1 }}
                          />
                          <div className="text-center position-absolute top-50 start-50 translate-middle">
                            <span className="bg-white px-2">
                              SHIPPING OPTIONS
                            </span>
                          </div>
                        </div>
                        <div className="d-flex justify-content-center mt-2">
                          {shipments.map((shipment) => (
                            <div
                              key={shipment.id}
                              className="form-check form-check-inline"
                            >
                              <input
                                className="form-check-input"
                                type="radio"
                                name="shipmentAddress"
                                id={`shipmentAddress${shipment.id}`}
                                value={shipment.id}
                                style={{ backgroundColor: '#c93535' }}
                                onChange={handleAddressChange}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`shipmentAddress${shipment.id}`}
                              >
                                {`${shipment.address}, ${shipment.city}, ${shipment.state}`}
                              </label>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    <div className="d-flex justify-content-between pt-2">
                      <p className="fw-bold mx-4">Order Details</p>
                      <p className="text-secondary-dark mb-0 mx-3 recipet_entity">
                        <span className="text-secondary-dark mb-0 recipet_entity">
                          Total:
                        </span>{' '}
                        ${getTotalPrice().toFixed(2)}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between pt-2">
                      <button className="order_button mb-0">
                        return to cart
                      </button>
                      <button onClick={handleAdd} className="order_button mb-0">
                        Add Shipment
                      </button>
                      <Modal
                        open={openAddModal}
                        onClose={handleCloseAddModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        sx={{
                          border: 'none',
                          boxShadow: 'none',
                        }}
                      >
                        <Box sx={style}>
                          <ShipmentForm onCloseModal={handleCloseAddModal} />
                        </Box>
                      </Modal>
                      <button
                        className={`order_button mb-0 ${
                          !selectedAddress ? 'disabled_button' : ''
                        }`}
                        disabled={!selectedAddress}
                        onClick={handleSubmit}
                      >
                        place order
                      </button>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        )}
      </section>
    </>
  );
};

export default OrderDetails;
