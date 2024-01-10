import React from "react";
import {
  AppContent,
  AppAside,
  AppSidebar,
  AppHeader,
} from "../components/index";
import colors from "src/utils/colors";

const DefaultLayout = () => {
  return (
    <>
      <AppSidebar />
      <div
        className="wrapper d-flex flex-column min-vh-100 dark:bg-transparent"
        style={{ background: colors.background }}
      >
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
      </div>
      <AppAside />
    </>
  );
};

export default DefaultLayout;
