import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { DayPickerProvider, DayPickerProps } from "react-day-picker";
import { AuthProvider } from "./providers/user.context.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
            <QueryClientProvider client={new QueryClient()}>
              <App />
            </QueryClientProvider>
          </GoogleOAuthProvider>
        </AuthProvider>
      </DayPickerProvider>
    </BrowserRouter>
  </StrictMode>
);
