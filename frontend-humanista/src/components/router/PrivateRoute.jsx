import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuthStateContext } from "../../context/auth/AuthContext";

/**
 *  A wrapper for <Route> that redirects to the login page
 *  if you're not authenticated
 */

const PrivateRoute = ({ component: Component, path, isPrivate, ...rest }) => {
  const isAuth = useAuthStateContext();

  return (
    <Route
      path={path}
      render={(props) =>
        isPrivate && !Boolean(isAuth.token) ? (
          <Redirect to={{ pathname: "/login" }} />
        ) : (
          <Component {...props} />
        )
      }
      {...rest}
    />
  );
};

export default PrivateRoute;
