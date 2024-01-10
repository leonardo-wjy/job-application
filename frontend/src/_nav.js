import React from "react";
import { CNavItem } from "@coreui/react-pro";
import { AiFillDashboard } from "react-icons/ai";

const _nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard",
    icon: <AiFillDashboard className="nav-icon" color="#fff" />,
  },
];

export default _nav;
