import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import registerServiceWorker from "./serviceWorker";

import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
// import { makeRoutes } from "./routes";
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
