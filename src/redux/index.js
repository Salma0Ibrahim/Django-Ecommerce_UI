import { configureStore } from "@reduxjs/toolkit";
import shipment from "./slices/shipment";

export default configureStore({
  reducer: {
    shipment : shipment,
  },
});
