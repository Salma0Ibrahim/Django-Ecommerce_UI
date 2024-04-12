import React from "react";
import style from "./style.module.css"
import OrderDetails from "../../../components/Receipt/Receipt";
import LabTabs from "../../../components/shipment/Shipment";

const Order = () => {
    return(
        <>
          {/* <LabTabs/>   */}
          <OrderDetails/>
        </>
    );
}

export default Order