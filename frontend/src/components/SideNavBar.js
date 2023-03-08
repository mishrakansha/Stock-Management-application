import React, { Component } from "react";
import "./css/SideBarCss.css";
import { Link } from "react-router-dom";
export default class SideNavBar extends Component {
  render() {
    return (
      <nav id="sidenav">
        <ul>
          <li>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              to="/AddItem"
              style={{ textDecoration: "none", color: "white" }}
            >
              Add Items
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
