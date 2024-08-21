import { Route, Routes } from "react-router-dom";
import HeaderComponent from "./components/general-components/HeaderComponent";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
