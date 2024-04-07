import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../apis/congif";
import ProductCard from "./ProductCard";

export default function ProductsList({ selectedCategory }) {
  // Receive selectedCategory as prop
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    if (selectedCategory) {
      axiosInstance
        .get(`products/?category=${selectedCategory}`) // Fetch products based on selected category
        .then((res) => {
          setProductsList(res.data.results);
          console.log(res.data.results);
        })
        .catch((error) => console.log(error));
    } else {
      axiosInstance
        .get("products/")
        .then((res) => setProductsList(res.data.results))
        .catch((error) => console.log(error));
    }
  }, [selectedCategory]);

  return (
    <>
      <h2>Products list</h2>
      <hr />
      <div className="row row-cols-1 row-cols-md-4 g-2">
        {productsList.map((product) => {
          return (
            <div className="col mb-4">
              <ProductCard product={product} />
            </div>
          );
        })}
      </div>
    </>
  );
}
