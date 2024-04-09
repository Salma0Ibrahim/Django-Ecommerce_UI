import React from "react";
import "./productsSlider.css";
import { IoPricetags } from "react-icons/io5";

function StarRating({ rating }) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <span key={i} style={{ color: "gold" }}>
          ★
        </span>
      );
    } else {
      stars.push(
        <span key={i} style={{ color: "gray" }}>
          ★
        </span>
      );
    }
  }

  return <>{stars}</>;
}

function TopRatedCard({ product }) {
  return (
    <div
      className="card"
      style={{
        width: "18rem",
        height: "100%",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        margin: "1rem",
      }}
    >
      <img
        src="src/assets/shoe-photography-featured-image.webp"
        className="card-img-top"
        alt={product.name}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
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
