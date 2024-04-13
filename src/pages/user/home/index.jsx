import React from "react";
import style from "./style.module.css";
import HomeSlider from "../../../components/HomeSlider/HomeSlider";
import ProductsSlider from "../../../components/TopRatedSlider/slider";
import FeaturesList from "../../../components/features/featuresList";
import AboutUs from "../../../components/aboutUs/aboutUs";
import ContactUs from "../../../components/contactUs/contactUs";

const Home = () => {
  return (
    <>
      <HomeSlider />
      <ProductsSlider />
      <FeaturesList />
      <AboutUs />
      {/* <ContactUs /> */}
      
    </>
  );
};

export default Home;
