import './HomeSlider.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
// import { banner_img_01, banner_img_02, banner_img_03 } from '../../assets/img';
import banner_img_01 from '../../assets/img/banner_img_01.jpg';
import banner_img_02 from '../../assets/img/banner_img_02.jpg';
import banner_img_03 from '../../assets/img/banner_img_03.jpg';

import { useNavigate } from 'react-router-dom';
const HomeSlider = () => {
  const navigate = useNavigate();

  const redirectToProducts = (id) => {
    navigate(`/products`);
  };
  return (
    <>
      <div
        id="template-mo-zay-hero-carousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        {/* <ol className="carousel-indicators">
            <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to="0" className="active"></li>
            <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to="1"></li>
            <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to="2"></li>
        </ol> */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="container">
              <div className="row p-5">
                <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                  <img className="img-fluid" src={banner_img_01} alt="" />
                </div>
                <div className="col-lg-6 mb-0 d-flex align-items-center">
                  <div className="text-align-left align-self-center">
                    <h1 className="h1 " style={{ color: '#c93535' }}>
                      <b>Electric</b> Products
                    </h1>
                    <h3 className="h2">Walk in Style, Everywhere You Go</h3>
                    <p>
                      See what you love, dream of more, and we will bring it to
                      your door.
                    </p>
                    <Button
                      className="customButton"
                      style={{ color: 'white' }}
                      onClick={redirectToProducts}
                    >
                      Shop Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="container">
              <div className="row p-5">
                <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                  <img className="img-fluid" src={banner_img_02} alt="" />
                </div>
                <div className="col-lg-6 mb-0 d-flex align-items-center">
                  <div className="text-align-left">
                    <h1 className="h1">Beauty and Skincare</h1>
                    <h3 className="h2">
                      Glow up with our skincare essentials.
                    </h3>
                    <p>
                      Find products that bring out your natural beauty. Shop now
                      and let your inner glow shine!
                    </p>
                    <Button
                      className="customButton"
                      style={{ color: 'white' }}
                      onClick={redirectToProducts}
                    >
                      Shop Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="container">
              <div className="row p-5">
                <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                  <img className="img-fluid" src={banner_img_03} alt="" />
                </div>
                <div className="col-lg-6 mb-0 d-flex align-items-center">
                  <div className="text-align-left">
                    <h1 className="h1">Home and Living</h1>
                    <h3 className="h2">
                      Elevate your living space with our decor.{' '}
                    </h3>
                    <p>
                      Shop now and find home essentials that enhance comfort and
                      convenience. Make life cozier
                    </p>
                    <Button
                      className="customButton"
                      style={{ color: 'white' }}
                      onClick={redirectToProducts}
                    >
                      Shop Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a
          className="carousel-control-prev text-decoration-none w-auto ps-3"
          href="#template-mo-zay-hero-carousel"
          role="button"
          data-bs-slide="prev"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </a>
        <a
          className="carousel-control-next text-decoration-none w-auto pe-3"
          href="#template-mo-zay-hero-carousel"
          role="button"
          data-bs-slide="next"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </a>
      </div>
    </>
  );
};

export default HomeSlider;
