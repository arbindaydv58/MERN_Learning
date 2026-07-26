import { createRoot } from "react-dom/client";
import "./assets/css/global.css"
import { StrictMode } from "react";
import RouterConfig from "./config/router.config";



createRoot(document.getElementById("root")!).render(
  <StrictMode>
 <RouterConfig />
  </StrictMode>,
);
