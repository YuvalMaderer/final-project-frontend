import TripsHeader from "@/components/general-components/TripsHeader";
import { Outlet } from "react-router-dom";

function TripsLayout() {
  return (
    <div>
      <TripsHeader />
      <Outlet />
    </div>
  );
}

export default TripsLayout;
