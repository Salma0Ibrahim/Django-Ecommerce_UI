import ReactDOM from 'react-dom';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import {Provider} from 'react-redux'
import store from '../src/redux/store/store.js'
import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <App />
  </Provider>
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode></React.StrictMode>
);
