import { useState } from "react";
import "./App.css";
import Signup from "./pages/user/signup";
import { RouterProvider } from "react-router-dom";
import router from "./pages/router";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
