import React from "react";
import style from "./style.module.css";
import HomeSlider from "../../../components/HomeSlider/HomeSlider";
import ProductsSlider from "../../../components/TopRatedSlider/slider";
import FeaturesList from "../../../components/features/featuresList";

const Home = () => {
  return (
    <>
      <HomeSlider />
      <ProductsSlider />
      <FeaturesList />
    </>
  );
};

export default Home;
