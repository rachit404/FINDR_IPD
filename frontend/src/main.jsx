import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CompareProvider } from "./utils/comparecontext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CompareProvider>
      <App />
    </CompareProvider>
  </StrictMode>
);
