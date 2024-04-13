import React from "react";
import "./productsSlider.css";
import { IoPricetags } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function StarRating({ rating }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <span key={i} style={{ color: "gold", fontSize: "24px" }}>
          ★
        </span>,
      );
    } else {
      stars.push(
        <span key={i} style={{ color: "gray", fontSize: "24px" }}>
          ★
        </span>,
      );
    }
  }

  return <>{stars}</>;
}

function TopRatedCard({ product }) {
  const navigate = useNavigate();
  const redirectToDetails = (id) => {
    navigate(`/product-details/${id}`);
  };

  return (
    <div
      onClick={() => redirectToDetails(product.id)}
      className="card product-card"
    >
      <img
        src={product.thumbnail_url}
        className="card-img-top"
        alt={product.name}
      />
      <div className="card-body d-flex flex-column justify-content-center align-items-center">
        <h5 className="card-title text-center">{product.name}</h5>
        <div className="priceRectangle">
          <IoPricetags className="priceIcon" />${product.price}
        </div>
        <p className="card-text mt-3">
          <StarRating rating={product.rating} />
        </p>
      </div>
    </div>
  );
}

export default TopRatedCard;
