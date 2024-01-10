import React from "react";

const Lamaran = React.lazy(() =>
  import("./views/lamaran/Index")
);

const routes = [
  {
    path: "/home",
    name: "Form",
    component: Lamaran,
    exact: true,
  },
];

export default routes;
