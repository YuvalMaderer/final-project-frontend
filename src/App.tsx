import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HomeDetailsPage from "./pages/HomeDetailsPage";
import MainLayout from "./layouts/MainLayout";
import StepOnePage from "./pages/becomeAhostPages/StepOnePage";
import BecomeAhostLayout from "./layouts/BecomeAhostLayout";
import ReservationPage from "./pages/ReservationPage";

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
        </Route>
      </Routes>
    </>
  );
}

export default App;
