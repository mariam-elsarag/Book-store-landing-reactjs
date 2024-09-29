import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";

import App from "./App.jsx";
// start toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "primereact/resources/themes/tailwind-light/theme.css";
import "./assets/Styles/global/style.scss";
import { Provider } from "react-redux";

import Store from "../Store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={Store}>
      <PrimeReactProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PrimeReactProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
      />
    </Provider>
  </React.StrictMode>
);
