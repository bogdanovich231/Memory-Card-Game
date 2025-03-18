import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import gameStore from "./stores/gameStore.ts";
import { StoreContext } from "./stores/storeContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreContext.Provider value={{ gameStore }}>
      <App />
    </StoreContext.Provider>
  </StrictMode>
);
