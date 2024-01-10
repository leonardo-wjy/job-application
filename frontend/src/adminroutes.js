import React from "react";

const Lamaran = React.lazy(() =>
  import("./views/lamaran/Index")
);

const ViewLamaran = React.lazy(() =>
  import("./views/view_lamaran/Index")
);

const routes = [
  {
    path: "/home",
    name: "Form",
    component: Lamaran,
    exact: true,
  },
  {
    path: "/view/:id",
    name: "View",
    component: ViewLamaran,
    exact: true,
  },
];

export default routes;
