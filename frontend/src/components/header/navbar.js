import React, { useContext } from "react";
import "./navbar.css";
import _authContext from "../../context/authContext";
import VerifiedNavbar from "./verifiednavbar";
import UnVerifiedNavbar from "./unverifiednavbar";

export default function Navbar() {
  const { isAuthenticated,UserType } = useContext(_authContext);

  return (
    <nav className="navbar navbar-expand-lg bg-white static-top">
      <div className="container navbar_responsive">
          <a className="navbar-brand nav_name" href="/"><span className="material-symbols-outlined brand_logo">eco</span>NOTEFLECT</a>
    
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto" style={{ alignItems: "center" }}>
            {isAuthenticated ? <VerifiedNavbar UserType={UserType} /> : <UnVerifiedNavbar />}
          </ul>
        </div>
      </div>
    </nav>
  );
}
