/* eslint-disable */
import React, { Component, Suspense } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { CSpinner } from "@coreui/react-pro";
import "./scss/style.scss";

import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./views/auth/login/Login"));
const Signup = React.lazy(() => import("./views/auth/signup/Signup"));

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Toaster />
        <Suspense fallback={<CSpinner color="primary" />}>
          <Switch>
            <PublicRoute exact path="/" component={Login} />
            <PublicRoute exact path="/signup" component={Signup} />
            <PrivateRoute path="/" component={DefaultLayout} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
