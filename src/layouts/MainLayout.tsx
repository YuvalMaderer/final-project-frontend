import HeaderComponent from "@/components/general-components/HeaderComponent";
import React from "react";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <HeaderComponent />
      <Outlet />
    </>
  );
}

export default MainLayout;
