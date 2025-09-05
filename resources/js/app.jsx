import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Layout from "./components/Layout";
import Index from "./pages/index";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token || token === "undefined") {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    axios
      .get("/api/v1/checkuser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setIsAuthenticated(true);
      })
      .catch(() => {
        setIsAuthenticated(false);
        localStorage.removeItem("auth_token");
      })
      .finally(() => setLoading(false));
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Layout /> : <Index />;
}

createRoot(document.getElementById("app")).render(<App />);