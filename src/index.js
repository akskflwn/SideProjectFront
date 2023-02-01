import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
// antd 적용
// import "antd/dist/antd.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // BrowerRouter 적용
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

reportWebVitals();
