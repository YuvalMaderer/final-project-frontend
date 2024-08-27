import { Route, Routes } from "react-router-dom";
import HeaderComponent from "./components/general-components/HeaderComponent";
import HomePage from "./pages/HomePage";
import HomeDetailsPage from "./pages/HomeDetailsPage";
import BecomeAhostLayout from "./layouts/becomeAhostLayout";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/homes/:id" element={<HomeDetailsPage />} />
        </Route>

        <Route path="becomeAhost" element={<BecomeAhostLayout />} />
      </Routes>
    </>
  );
}

export default App;
