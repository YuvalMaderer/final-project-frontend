import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HomeDetailsPage from "./pages/HomeDetailsPage";
import MainLayout from "./layouts/MainLayout";
import StepOnePage from "./pages/becomeAhostPages/StepOnePage";

import SelectTypePage from "./pages/becomeAhostPages/SelectTypePage";
import SelectRoomTypePage from "./pages/becomeAhostPages/SelectRoomTypePage";

import SelectLocationPage from "./pages/becomeAhostPages/SelectLocationPage";
import FloorPlan from "./pages/becomeAhostPages/FloorPlan";

import BecomeAhostLayout from "./layouts/BecomeAhostLayout";
import ReservationPage from "./pages/ReservationPage";
import StepTwoPage from "./pages/becomeAhostPages/StepTwoPage";
import SelectAmenities from "./pages/becomeAhostPages/SelectAmenities";
import AddTitlePage from "./pages/becomeAhostPages/AddTitlePage";
import AddDescriptionPage from "./pages/becomeAhostPages/AddDescriptionPage";
import AddPhotosPage from "./pages/becomeAhostPages/AddPhotosPage";
import StepThreePage from "./pages/becomeAhostPages/StepThreePage";
import SelectBookType from "./pages/becomeAhostPages/SelectBookType";
import AddPricePage from "./pages/becomeAhostPages/AddPricePage";
import WishlistPage from "./pages/WishlistPage";
import FooterLayout from "./layouts/FooterLayout";
import WishlistLayout from "./pages/WishlistLayout";
import WishlistDetailPage from "./pages/WishlistDetailPage";
import ReceiptPage from "./pages/becomeAhostPages/ReceiptPage";
import HostPage from "./pages/HostPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<FooterLayout />}>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/homes/:id" element={<HomeDetailsPage />} />
          </Route>

          <Route path="/reservation/:id" element={<ReservationPage />} />
          <Route path="wishlists" element={<WishlistLayout />}>
            <Route index element={<WishlistPage />} />
            <Route path=":title" element={<WishlistDetailPage />} />
          </Route>
        </Route>

        <Route path="becomeAhost" element={<BecomeAhostLayout />}>
          <Route index element={<StepOnePage />} />
          <Route path="selectType" element={<SelectTypePage />} />
          <Route path="selectRoomType" element={<SelectRoomTypePage />} />
          <Route path="selectLocation" element={<SelectLocationPage />} />
          <Route path="floorPlan" element={<FloorPlan />} />
          <Route path="stepTwo" element={<StepTwoPage />} />
          <Route path="amenities" element={<SelectAmenities />} />
          <Route path="addPhotos" element={<AddPhotosPage />} />
          <Route path="addTitle" element={<AddTitlePage />} />
          <Route path="addDescription" element={<AddDescriptionPage />} />
          <Route path="stepThree" element={<StepThreePage />} />
          <Route path="bookType" element={<SelectBookType />} />
          <Route path="addPrice" element={<AddPricePage />} />
          <Route path="receipt" element={<ReceiptPage />} />
        </Route>

        <Route path="/hostPage" element={<HostPage />} />
      </Routes>
    </>
  );
}

export default App;
