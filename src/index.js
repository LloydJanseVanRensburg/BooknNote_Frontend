import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alerts/AlertState";
import AdvertState from "./context/adverts/AdvertState";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

ReactDOM.render(
  <AlertState>
    <AuthState>
      <AdvertState>
        <App />
      </AdvertState>
    </AuthState>
  </AlertState>,
  document.getElementById("root")
);
