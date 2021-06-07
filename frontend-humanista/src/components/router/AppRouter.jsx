import React from "react";
import { Switch } from "react-router-dom";

import routes from "./routes";

import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
  return (
    <Switch>
      {routes.map((route) => (
        <PrivateRoute
          key={route.path}
          exact
          path={route.path}
          component={route.component}
          isPrivate={route.isPrivate}
        />
      ))}
    </Switch>
  );
};

export default AppRouter;
