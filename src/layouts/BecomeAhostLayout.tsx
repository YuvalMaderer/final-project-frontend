import BecomeAhostFooter from "@/components/becomeAhostComponents/BecomeAhostFooter";
import BecomeAhostHeader from "@/components/becomeAhostComponents/becomeAhostHeader";
import React from "react";
import { Outlet } from "react-router-dom";

function BecomeAhostLayout() {
  return (
    <div>
      <BecomeAhostHeader />
      <Outlet />
      <BecomeAhostFooter />
    </div>
  );
}

export default BecomeAhostLayout;
