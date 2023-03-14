import React, { Component } from "react";
// import TextField from "@mui/material/TextField";
import "./NavBarCss.css";
import SideNavBar from "../sidebarnav/SideNavBar";
import { ExpendableSlidebar } from "../sidebarnav/SideNavBar.js";

import {} from "react-router-dom";

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hamburgerOpen: false,
    };
  }

  hamburgerClick = async () => {
    console.log("clicked");
    this.setState({
      hamburgerOpen: !this.state.hamburgerOpen,
    });
  };
  componentDidUpdate() {
    console.log(document.querySelector("#dataContainer"));
    if (this.state.hamburgerOpen) {
      document.querySelector("#dataContainer").style = "grid-column: 3/7;";
      document.querySelector("#sideNav").style = "border-right:none;";
    } else {
      document.querySelector("#dataContainer").style = "grid-column: 2/7;";
      document.querySelector("#sideNav").style =
        "border-right: 2px solid #323765;";
    }
  }
  render() {
    return (
      <>
        <div className="headNavBar">
          <nav className="nav">
            <ul className="leftSideList">
              <li onClick={this.hamburgerClick} className="barIcon">
                <i className="fa-solid fa-bars"></i>
              </li>
              <li>
                <div className="icon">Stock management app</div>
              </li>
            </ul>
            {/* <ul className="searchBar">
              <span className="searchIcon">
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
            </ul> */}
            <ul className="profileIcon">
              <li className="barIcon">
                <i className="fa-solid fa-user"></i>
              </li>
            </ul>
          </nav>
        </div>
        {/* <div className="sideNavBarContainers"> */}
        <SideNavBar />
        {this.state.hamburgerOpen && <ExpendableSlidebar />}
        {/* </div> */}
      </>
    );
  }
}

export default NavBar;
