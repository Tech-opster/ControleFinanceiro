import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { setupIonicReact } from "@ionic/react";
import "./tailwind.css";

setupIonicReact({
  mode: "ios", // Força iOS para tudo
});

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);