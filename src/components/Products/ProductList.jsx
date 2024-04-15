import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../apis/congif';
import ProductCard from './ProductCard';
import CardLoader from '../cardLoader/cardLoader';
import Pagination from '../pagination/pagination';
import { useSelector } from 'react-redux';
import productnotfount from '../../assets/img/productnotfount.png';
import './style.css';

export default function ProductsList({ selectedCategory, selectedRating }) {
  const [productsList, setProductsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const searchValue = useSelector((state) => state.search.searchValue);

  useEffect(() => {
    let params = {
      page: currentPage,
    };

    if (selectedCategory) {
      params = { ...params, category: selectedCategory };
    }

    if (selectedRating) {
      params = { ...params, rating: selectedRating };
    }

    if (searchValue) {
      params = { ...params, name: searchValue };
    }

    axiosInstance
      .get('products/', {
        params: params,
      })
      .then((res) => {
        setProductsList(res.data.results);
        setTotalPages(Math.ceil(res.data.count / 8));
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [selectedCategory, selectedRating, currentPage, searchValue]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <h2 className="mt-4">Products list</h2>
      <hr />

      {isLoading ? (
        <div className="row row-cols-1 row-cols-md-4 g-2">
          {[...Array(4)].map((_, index) => (
            <div className="col mb-4" key={index}>
              <CardLoader />
            </div>
          ))}
        </div>
      ) : productsList.length === 0 ? (
        <div className="row">
          <div className="col text-center" style={{ height: '60vh' }}>
            <div className="d-flex justify-content-center align-items-center ">
              <img
                src={productnotfount}
                alt="No products found"
                style={{ maxWidth: '50%', maxHeight: '60%' }}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="row row-cols-1 row-cols-md-4 g-2">
            {productsList.map((product) => (
              <div className="productthecart col-md-3" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-center mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </>
  );
}
