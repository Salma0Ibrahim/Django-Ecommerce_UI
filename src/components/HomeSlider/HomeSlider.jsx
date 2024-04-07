import React from "react";
import sliderData from "./slidersData.json";

function HomeSlider() {
  return (
    <section className="slider-section">
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          {sliderData.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : ""}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {sliderData.map((slide, index) => (
            <div
              key={slide.id}
              className={`carousel-item ${slide.bgColor} ${
                index === 0 ? "active" : ""
              }`}
              style={{
                backgroundColor: slide.bgColor,
              }}
            >
              <div className="row d-flex align-items-center">
                <div className="col-lg-6 d-flex justify-content-center">
                  <div className="text-center">
                    <h3 className={`h3 fw-light ${slide.textColor} fw-bold`}>
                      {slide.title1}
                    </h3>
                    <h1 className={`h1 ${slide.textColor} fw-bold`}>
                      {slide.title2}
                    </h1>
                    <p className={`${slide.textColor} fw-bold`}>
                      <i>{slide.discount}</i>
                    </p>
                    <div>
                      <a
                        className="btn btn-dark btn-ecomm"
                        href="shop-grid.html"
                      >
                        {slide.btnText}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <img src={slide.imgSrc} className="img-fluid" alt="..." />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  );
}

export default HomeSlider;
