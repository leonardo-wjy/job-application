import { cilMenu } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CContainer,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
} from "@coreui/react-pro";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppHeaderDropdown } from "./header/index";

const AppHeader = () => {

  const theme = useSelector((state) => state.toggle.theme);
  theme === "dark"
    ? document.body.classList.add("dark-theme")
    : document.body.classList.remove("dark-theme");

  const sidebarShow = useSelector((state) => state.toggle.sidebarShow);
  const asideShow = useSelector((state) => state.toggle.asideShow);

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
        >
        </CHeaderToggler>

        <CHeaderNav className="ms-3 me-4">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  );
};

export default AppHeader;
