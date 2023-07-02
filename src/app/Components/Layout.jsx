import React, { useEffect } from "react";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.css";
const Layout = ({ children }) => {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <div>
      <Navbar name="Nova" />
      {children}
    </div>
  );
};

export default Layout;
