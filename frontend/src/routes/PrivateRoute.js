import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const isAuth = useSelector((state) => state.user.token);

  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (path === "/login") {
          // Allow access to login and register routes only if not authenticated
          return isAuth ? <Redirect to="/" /> : <Component {...props} />;
        } else {
          if (path === "/signup") {
            // Allow access to login and register routes only if not authenticated
            return isAuth ? <Redirect to="/signup" /> : <Component {...props} />;
          } else {
            // For other private routes, allow access only if authenticated
            return isAuth ? <Component {...props} /> : <Redirect to="/" />;
          }
        }
      }}
    />
  );
};

export default PrivateRoute;