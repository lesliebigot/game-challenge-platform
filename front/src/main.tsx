import ReactDOM from "react-dom/client";
import "./components/app/App.css";
import { BrowserRouter } from "react-router";
import App from "./components/app/App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
