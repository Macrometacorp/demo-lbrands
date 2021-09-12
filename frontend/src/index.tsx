import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";

ReactDOM.render(
  <Router>
    <SnackbarProvider maxSnack={3}>
      <App />
    </SnackbarProvider>
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
