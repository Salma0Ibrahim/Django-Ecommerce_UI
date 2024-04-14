import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import ProductsList from "../../../components/Products/ProductList";

function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);

  const handleChangeCategory = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleChangeRating = (event) => {
    setSelectedRating(event.target.value);
  };

  return (
    <>
      <div className="row">
        <div className="col-md-2 col-sm-6 col-xs-6">
          <Sidebar
            handleChangeCategory={handleChangeCategory}
            handleChangeRating={handleChangeRating}
          />
        </div>
        <div className="col-md-10 col-sm-6 col-xs-6">
          <ProductsList
            selectedCategory={selectedCategory}
            selectedRating={selectedRating}
          />
        </div>
      </div>
    </>
  );
}

export default ProductsPage;
