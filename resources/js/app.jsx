import React from "react";
import { createRoot } from "react-dom/client";
import Layout from "./components/Layout";
import Index from "./pages/index";

function App() {
  const token = localStorage.getItem("auth_token");
  return token ? <Layout /> : <Index />;
}

createRoot(document.getElementById("app")).render(<App />);