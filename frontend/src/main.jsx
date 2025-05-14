import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CompareProvider } from "./utils/comparecontext.jsx";
import { DataProvider } from "./utils/dataContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataProvider>
      <CompareProvider>
        <App />
      </CompareProvider>
    </DataProvider>
  </StrictMode>
);
