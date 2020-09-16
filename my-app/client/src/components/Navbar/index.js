import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Quick Money Trading
      </Link>
      <div>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              to="/summary"
              className={
                  window.location.pathname === "/summary"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              Summary
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/positions"
              className={window.location.pathname === "/positions" ? "nav-link active" : "nav-link"}
            >
              Positions
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/trade"
              className={window.location.pathname === "/trade" ? "nav-link active" : "nav-link"}
            >
              Trade
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/realtime"
              className={window.location.pathname === "/realtime" ? "nav-link active" : "nav-link"}
            >
              Realtime Chart
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/history"
              className={window.location.pathname === "/history" ? "nav-link active" : "nav-link"}
            >
              Portfolio Historical Performance
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
