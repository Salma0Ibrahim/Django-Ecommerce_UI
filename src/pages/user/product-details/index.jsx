import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../apis/congif";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const params = useParams();

  useEffect(() => {
    axiosInstance
      .get(`/products/${params.id}/`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  }, [params.id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-5">
      <div
        className="container px-4 px-lg-5 my-5"
        style={{
          boxShadow:
            "0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
        }}
      >
        <div className="row gx-4 gx-lg-5 align-items-center">
          <div className="col-md-6">
            <img
              className="card-img-top mb-5 mb-md-0"
              src={product.image}
              alt={product.title}
            />
          </div>
          <div className="col-md-6">
            <h1 className="display-5 fw-bolder">{product.name}</h1>
            <div className="fs-5 mb-5">
              <span>${product.price}</span>
            </div>
            <div className="d-flex mb-4">
              <div className="flex-grow-1">
                <span className="me-2">Rating:</span>
                <div className="rating">
                  <span className="bi bi-star-fill"></span>
                  <span className="bi bi-star-fill"></span>
                  <span className="bi bi-star-fill"></span>
                  <span className="bi bi-star-fill"></span>
                  <span className="bi bi-star"></span>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <span className="me-2">Stock:</span>
              <span>{product.stock}</span>
            </div>
            <p className="lead">{product.description}</p>
            <div className="d-flex">
              <button
                className="btn btn-outline-dark flex-shrink-0"
                type="button"
              >
                <i className="bi-cart-fill me-1"></i>
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
