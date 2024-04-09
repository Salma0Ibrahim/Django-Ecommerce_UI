import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import styles from "./style.module.css";
import { FaShoppingCart } from "react-icons/fa";
import { IoPricetags } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function ProductCard({ product }) {
  const navigate = useNavigate();
  const redirectToDetails = (id) => {
    navigate(`/product-details/${id}`);
  };
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
    <div className={styles.card}>
      <MdFavoriteBorder
        className={`${styles.icon} ${styles.favoriteIcon}`}
        onMouseEnter={() => setIsFavoriteHovered(true)}
        onMouseLeave={() => setIsFavoriteHovered(false)}
      />
      {isFavoriteHovered && (
        <Badge
          className={`${styles.badgeHover} ${styles.favoriteBadge}`}
          pill
          variant="danger"
        >
          Add to Wishlist
        </Badge>
      )}

      <IoEyeOutline
        className={`${styles.icon} ${styles.eyeIcon}`}
        onMouseEnter={() => setIsEyeHovered(true)}
        onMouseLeave={() => setIsEyeHovered(false)}
        onClick={() => redirectToDetails(product.id)}
      />
      {isEyeHovered && (
        <Badge
          className={`${styles.badgeHover} ${styles.eyeBadge}`}
          pill
          variant="primary"
        >
          View Details
        </Badge>
      )}

      <Card.Img
        variant="top"
        src="src\assets\istockphoto-1436061606-612x612.jpg"
        className={styles.cardImage}
      />
      <div className={styles.cardBody}>
        <Card.Title className={styles.cardTitle}>{product.name}</Card.Title>

        {/* Price rectangle */}
        <div className={styles.priceRectangle}>
          <IoPricetags className={styles.priceIcon} />${product.price}
        </div>

        {/* Rating */}
        <div className={styles.rating}>
          {renderStars(product.rating)} ({product.rating})
        </div>

        <Button variant="primary" className={styles.customButton}>
          <FaShoppingCart className={styles.cartIcon} />
          Add to cart
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
