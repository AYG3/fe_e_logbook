import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { AuthProvider as UserAuthProvider } from "./context/user/UserAuthContext";
import { AuthProvider as AdminAuthProvider } from "./context/admin/AdminAuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserAuthProvider>
        <AdminAuthProvider>
          <App />
        </AdminAuthProvider>
      </UserAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
