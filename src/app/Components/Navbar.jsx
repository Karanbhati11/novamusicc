"use client"
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Navbar = ({ name }) => {
  let navigate = useRouter();

  return (
    <div>
      <nav className="navbar bg-dark">
        <div className="container-fluid">
          <span
            className="navbar-brand mb-0 h1"
            style={{ color: "wheat" }}
            onClick={() => navigate.push("/")}
          >
            {name}
          </span>

          <div className="dropdown">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{ marginRight: "20px" }}
            >
              OPTIONS
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <Link className="dropdown-item" href="/">
                Home
              </Link>
              <div className="dropdown-divider"></div>
              <Link className="dropdown-item" href="/playlist">
                Playlist
              </Link>
              <div className="dropdown-divider"></div>
              <Link className="dropdown-item" href="/exportplaylist">
                Export
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
