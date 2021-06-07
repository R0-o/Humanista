import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";

import { AuthProvider } from "./context/auth/AuthContext";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import AppNav from "./components/common/AppNav";
import AppRouter from "./components/router/AppRouter";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_RIGHT,
};

const App = () => {
  return (
    <>
      <Provider template={AlertTemplate} {...options}>
        <AuthProvider>
          <AppNav />
          <AppRouter />
        </AuthProvider>
      </Provider>
    </>
  );
};

export default App;
