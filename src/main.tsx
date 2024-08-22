import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { DayPickerProvider, DayPickerProps } from "react-day-picker";
import { AuthProvider } from "./providers/user.context.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const dayPickerProps: DayPickerProps = {
  // Add any initial DayPicker props you need here
};

const googleId: string = import.meta.env.VITE_GOOGLE_CLIENT_ID;
if (!googleId) {
  console.error("Google Client ID is not defined");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <DayPickerProvider initialProps={dayPickerProps}>
        <AuthProvider>
          <GoogleOAuthProvider clientId={googleId}>
            <App />
          </GoogleOAuthProvider>
        </AuthProvider>
      </DayPickerProvider>
    </BrowserRouter>
  </StrictMode>
);
