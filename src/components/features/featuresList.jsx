import {
  BiSolidTruck,
  BiCreditCard,
  BiSolidCart,
  BiHeadphone,
} from "react-icons/bi";
import FeaturesCard from "./featureCard";

function FeaturesList() {
  return (
    <section className="product-thumb-slider section-padding shadow">
      <div className="container">
        {" "}
        {/* Added shadow class here */}
        <div className="text-center pb-3">
          <h3 className="mb-0 h3 fw-bold">What We Offer!</h3>
          <p className="mb-0 text-capitalize">The purpose of lorem ipsum</p>
        </div>
        <div className="row row-cols-1 row-cols-lg-4 g-4 justify-content-center">
          <FeaturesCard
            color="primary"
            icon={<BiSolidTruck />}
            title="Free Delivery"
            description="Nor again is there anyone who loves or pursues or desires to obtain pain of itself."
          />
          <FeaturesCard
            color="danger"
            icon={<BiCreditCard />}
            title="Secure Payment"
            description="Nor again is there anyone who loves or pursues or desires to obtain pain of itself."
          />
          <FeaturesCard
            color="success"
            icon={<BiSolidCart />}
            title="Free Returns"
            description="Nor again is there anyone who loves or pursues or desires to obtain pain of itself."
          />
          <FeaturesCard
            color="warning"
            icon={<BiHeadphone />}
            title="24/7 Support"
            description="Nor again is there anyone who loves or pursues or desires to obtain pain of itself."
          />
        </div>
        {/* end row */}
      </div>
    </section>
  );
}
export default FeaturesList;
