import HeaderComponent from "@/components/general-components/HeaderComponent";
import { Outlet } from "react-router-dom";

function WishlistLayout() {
  return (
    <>
      <HeaderComponent />
      <Outlet />;
    </>
  );
}

export default WishlistLayout;
