import React from "react";
import Category from "./Category/Category";
import Rating from "./Rating/Rating";
import { FaFilter } from "react-icons/fa";

// import Price from "./Price/Price";
import "./Sidebar.css";

const Sidebar = ({ handleChangeCategory, handleChangeRating }) => {
  return (
    <>
      <section className="sidebar">
        <div className="logo-container">
          <h3>
            Filters <FaFilter />
          </h3>
        </div>
        <div className="scrollable-section">
          <Category handleChange={handleChangeCategory} />
        </div>
        <Rating handleChange={handleChangeRating} />
      </section>
    </>
  );
};

export default Sidebar;
