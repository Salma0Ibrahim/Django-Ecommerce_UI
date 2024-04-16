import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { axiosInstance } from '../../apis/congif';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './productsSlider.css';
import TopRatedCard from './TopRatedCard';
import CardLoader from '../cardLoader/cardLoader';

function ProductsSlider() {
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let params = {
      order_by_rating: 'desc',
    };

    axiosInstance
      .get('products/', {
        params: params,
      })
      .then((res) => {
        console.log(res);
        setProductsList(res.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const renderLoaders = () => {
    let loaders = [];
    for (let i = 0; i < settings.slidesToShow; i++) {
      loaders.push(
        <div className="col mb-4" key={i}>
          <CardLoader />
        </div>,
      );
    }
    return loaders;
  };

  return (
    <div className="slider-container">
      <h2 className="text-center mb-4 mt-4">Top Rated Products</h2>
      <div className="slider-wrapper">
        {loading ? (
          <Slider {...settings} className="slider-box-shadow">
            {renderLoaders()}
          </Slider>
        ) : (
          <Slider {...settings} className="slider-box-shadow">
            {productsList.map((product) => (
              <div className="col mb-4" key={product.id}>
                <TopRatedCard product={product} />
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
}

export default ProductsSlider;
