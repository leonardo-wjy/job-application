import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CContainer, CSpinner } from "@coreui/react-pro";
import { useSelector } from "react-redux";
// routes config
import routes from "../routes";
import adminRoutes from "../adminroutes";

const AppContent = () => {
  const { role } = useSelector((state) => state.user.data);

  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        {role === "Admin" ? 
          <Switch>
            {adminRoutes.map((route, idx) => {
              return (
                route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => (
                      <>
                        <route.component {...props} />
                      </>
                    )}
                  />
                )
              );
            })}
            <Redirect from="/" to="/home" />
          </Switch>
          : 
          <Switch>
            {routes.map((route, idx) => {
              return (
                route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => (
                      <>
                        <route.component {...props} />
                      </>
                    )}
                  />
                )
              );
            })}
            <Redirect from="/" to="/home" />
          </Switch>
        }
      </Suspense>
    </CContainer>
  );
};

export default React.memo(AppContent);
