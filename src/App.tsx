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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/homes/:id" element={<HomeDetailsPage />} />
        </Route>
        <Route path="/homes/reservation" element={<ReservationPage />} />

        <Route path="becomeAhost" element={<BecomeAhostLayout />}>
          <Route index element={<StepOnePage />} />
          <Route path="selectType" element={<SelectTypePage />} />
          <Route path="selectRoomType" element={<SelectRoomTypePage />} />
          <Route path="selectLocation" element={<SelectLocationPage />} />
          <Route path="floorPlan" element={<FloorPlan />} />
          <Route path="stepTwo" element={<StepTwoPage />} />
          <Route path="amenities" element={<SelectAmenities />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
