import { useState } from "react";
import Signup from "./pages/user/signup";
import { RouterProvider } from "react-router-dom";
import router from "./pages/router";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import OrderDetails from "./components/Receipt/Receipt";
function App() {
  const [count, setCount] = useState(0);

  return (
    <> 
      <RouterProvider router={router} />
      {/* <OrderDetails /> */}
    </>
  );
}

export default App;
