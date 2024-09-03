import HostHeader from "@/components/host/HostHeader";
import { useAuth } from "@/providers/user.context";
import React from "react";
import { Outlet } from "react-router-dom";

function HostLayout() {
  return (
    <div>
      <HostHeader />
      <Outlet />
    </div>
  );
}

export default HostLayout;
