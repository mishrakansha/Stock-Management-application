import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import "./css/NavBarCss.css";
import SideNavBar from "./SideNavBar";
import NewItemForm from "./forms/NewItemForm";
import DashboardPage from "./DashboardPage";

import { Route, Routes } from "react-router-dom";

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hamburgerOpen: false,
    };
    // const { window } = this.props;
  }
  hamburgerClick = async () => {
    console.log("clicked");
    this.setState({
      hamburgerOpen: !this.state.hamburgerOpen,
    });
  };
  componentDidUpdate() {
    console.log(document.querySelector("#dataContainer"));
    this.state.hamburgerOpen
      ? (document.querySelector("#dataContainer").style = "grid-column: 2/7;")
      : (document.querySelector("#dataContainer").style = "grid-column: 1/7;");
  }
  render() {
    return (
      <>
        <div className="headnavbar">
          <nav className="nav">
            <ul className="leftsidelist">
              <li onClick={this.hamburgerClick} className="baricon">
                <i className="fa-solid fa-bars"></i>
              </li>
              <li>
                <div className="icon">Stock management app</div>
              </li>
            </ul>
            <ul className="searchbar">
              <span className="searchicon">
                <i className="fas fa-search "></i>
              </span>
              <TextField
                variant="outlined"
                hiddenLabel
                id="filled-hidden-label-small"
                placeholder="search item.........."
                size="small"
                inputProps={{
                  style: {
                    border: "none",
                    padding: "8.5px 14px 8.5px 30px",
                  },
                }}
              />{" "}
            </ul>
          </nav>
        </div>

        {this.state.hamburgerOpen && <SideNavBar />}
        <div id="dataContainer">
          <Routes>
            <Route
              exact
              path="/AddItem"
              element={<NewItemForm key="addItem" />}
            ></Route>
            <Route
              exact
              path="/"
              element={<DashboardPage key="DashBoard" />}
            ></Route>
          </Routes>
        </div>
      </>
    );
  }
}

export default NavBar;
