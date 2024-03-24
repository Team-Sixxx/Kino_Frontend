import React from "react";
import NavHeader from "./NavHeader";
import "./layout.css";

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <header className="nav-header">
        <NavHeader />
      </header>
      <main className="page-content">{children}</main>
    </div>
  );
};

export default Layout;
