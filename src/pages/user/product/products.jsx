import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar';
import ProductsList from '../../../components/Products/ProductList';

function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true); // State to manage sidebar visibility

  const handleChangeCategory = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleChangeRating = (event) => {
    setSelectedRating(event.target.value);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <div className="row">
        <div
          className={`col-md-2 col-sm-6 col-xs-6 ${showSidebar ? '' : 'd-none'}`}
        >
          <Sidebar
            handleChangeCategory={handleChangeCategory}
            handleChangeRating={handleChangeRating}
          />
        </div>

        <div
          className={`col-md-10 col-sm-6 col-xs-6 ${showSidebar ? 'col-md-offset-2' : ''}`}
        >
          <button
            className="btn btn-sm btn-danger d-block d-md-none mb-3 mt-2"
            onClick={toggleSidebar}
          >
            {showSidebar ? 'Hide Sidebar' : 'Show Sidebar'}
          </button>

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
