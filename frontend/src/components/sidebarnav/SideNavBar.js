import React, { Component } from "react";
import "./SideBarCss.css";
import { Link } from "react-router-dom";

export default class SideNavBar extends Component {
  render() {
    return (
      <nav id="sideNav">
        <ul>
          <li id="dashboardIcon">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <i className="fas fa-home"></i>
            </Link>
          </li>

          <li id="addIcon">
            <Link
              to="/additem"
              style={{ textDecoration: "none", color: "white" }}
            >
              <i className="fa-solid fa-circle-plus"></i>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export class ExpendableSlidebar extends Component {
  render() {
    return (
      <nav id="sideNavExpandable">
        <ul>
          <li id="dashboardText">
            <Link to="/" style={{ textDecoration: "none" }}>
              Dashboard
            </Link>
          </li>

          <li id="addText">
            <Link to="/additem" style={{ textDecoration: "none" }}>
              Add Item
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
