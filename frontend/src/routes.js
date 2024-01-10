import React from "react";

//User
// const User = React.lazy(() =>
//   import("./views/settings/user/Index")
// );

const Form = React.lazy(() =>
  import("./views/form/Index")
);

const routes = [
  {
    path: "/home",
    name: "Form",
    component: Form,
    exact: true,
  },
  //User
  // {
  //   path: "/settings/user",
  //   name: "User",
  //   component: User,
  //   exact: true,
  // },
];

export default routes;
