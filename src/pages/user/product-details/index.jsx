import React from "react";

function ProductDetails({ product }) {
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="container mt-5"
      style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="row">
        {/* Product Image */}
        <div className="col-md-6 mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
          <div className="row mt-3">
            {product.smallImages.map((image, index) => (
              <div key={index} className="col-3 mb-2">
                <img
                  src={image}
                  alt={`Thumbnail ${index}`}
                  className="img-fluid"
                  style={{ width: "100%", objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p className="text-muted">{product.category}</p>
          <h3 className="text-primary">${product.price}</h3>
          <p>
            <strong>Quantity:</strong> {product.quantity}
          </p>
          <p>{product.description}</p>
          <p>
            <strong>Rating:</strong> {product.rating}/5
          </p>
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

// Example product object
const product = {
  id: 1,
  name: "Sample Product",
  price: 100,
  category: "Electronics",
  quantity: 10,
  description: "This is a sample product description.",
  rating: 4.5,
  image: "https://via.placeholder.com/600x400",
  smallImages: [
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
  ],
};

export default ProductDetails;
