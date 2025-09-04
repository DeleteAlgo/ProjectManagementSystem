import React from "react";
import { createRoot } from "react-dom/client";
import Layout from "./components/Layout";

function App() {
  return <Layout />;
}

createRoot(document.getElementById("app")).render(<App />);