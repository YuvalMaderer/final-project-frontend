import HeaderComponent from "@/components/general-components/HeaderComponent";
import HomeDetailsPage from "@/pages/HomeDetailsPage";
import HomePage from "@/pages/HomePage";
import { Outdent } from "lucide-react";
import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <HeaderComponent />
<Outlet/>
    </>
  );
}

export default MainLayout;
