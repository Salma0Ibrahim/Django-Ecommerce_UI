import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import App from "./App.jsx";
import "./index.css";
import HomeSlider from "./components/HomeSlider/HomeSlider";
import FeaturesList from "./components/features/featuresList";
import Helw from "./bagrab";
import BasicExample from "./components/Products/ProductCard";
import ProductsList from "./components/Products/ProductList";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <HomeSlider /> */}
    <Helw />
    {/* <ProductsList /> */}
  </React.StrictMode>
);
