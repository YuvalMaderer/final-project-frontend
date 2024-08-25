import { Route, Routes } from "react-router-dom";
import HeaderComponent from "./components/general-components/HeaderComponent";
import HomePage from "./pages/HomePage";
import HomeDetailsPage from "./pages/HomeDetailsPage";

function App() {
  return (
    <>
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/homes/:id" element={<HomeDetailsPage />} />
      </Routes>
    </>
  );
}

export default App;
