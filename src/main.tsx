import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { DayPickerProvider, DayPickerProps } from "react-day-picker";

const dayPickerProps: DayPickerProps = {
  // Add any initial DayPicker props you need here
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <DayPickerProvider initialProps={dayPickerProps}>
        <App />
      </DayPickerProvider>
    </BrowserRouter>
  </StrictMode>
);
