import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import "./ProductCard.css";
import { FaShoppingCart } from "react-icons/fa";
import { IoPricetags } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";

function ProductCard({ product }) {
  const [isFavoriteHovered, setIsFavoriteHovered] = useState(false);
  const [isEyeHovered, setIsEyeHovered] = useState(false);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i}>&#9733;</span>); // Full star
      } else {
        stars.push(<span key={i}>&#9734;</span>); // Empty star
      }
    }
    return stars;
  };

  return (
    <div className="card" style={{ width: "18rem", height: "28rem" }}>
      <MdFavoriteBorder
        className="icon favorite-icon"
        onMouseEnter={() => setIsFavoriteHovered(true)}
        onMouseLeave={() => setIsFavoriteHovered(false)}
      />
      {isFavoriteHovered && (
        <Badge className="badge-hover favorite-badge" pill variant="danger">
          Add to Wishlist
        </Badge>
      )}

      <IoEyeOutline
        className="icon eye-icon"
        onMouseEnter={() => setIsEyeHovered(true)}
        onMouseLeave={() => setIsEyeHovered(false)}
      />
      {isEyeHovered && (
        <Badge className="badge-hover eye-badge" pill variant="primary">
          View Details
        </Badge>
      )}

      <Card.Img
        variant="top"
        src="E:/ITI Labs/ecommerce/Django_Ecommerce_App/photos/products/24/03/30/Screenshot_20240204_100617_com.huawei.hwsearch_Ge2lZgl.jpg"
        style={{ width: "100%", height: "15rem", objectFit: "cover" }}
      />
      <div className="card-body text-center">
        <Card.Title>{product.name}</Card.Title>

        {/* Price rectangle */}
        <div className="price-rectangle">
          <IoPricetags style={{ marginRight: "0.5rem" }} />${product.price}
        </div>

        {/* Rating */}
        <div className="rating">
          {renderStars(product.rating)} ({product.rating})
        </div>

        <Button variant="primary" className="custom-button">
          <FaShoppingCart style={{ marginRight: "0.5rem" }} />
          Add to cart
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
