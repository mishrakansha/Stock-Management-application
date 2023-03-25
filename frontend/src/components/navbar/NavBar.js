import React, { Component } from "react";
// import TextField from "@mui/material/TextField";
import "./NavBarCss.css";
import SideNavBar from "../sidebarnav/SideNavBar";
import { ExpendableSlidebar } from "../sidebarnav/SideNavBar.js";
import { connect } from "react-redux";
import {} from "react-router-dom";
import { dataContainer, sideNavBarExpended } from "./../../actions/navBar";
export class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showhamburger: window.innerWidth > 760,
    };
  }
  hamburgerClick = async () => {
    if (window.innerWidth > 760) {
      if (!this.props.isExpended) {
        this.props.dataContainer({ gridColumn: "3/7" });
        this.props.sideNavBarExpended(true);
      } else {
        this.props.dataContainer({ gridColumn: "2/7" });
        this.props.sideNavBarExpended(false);
      }
    }
  };
  componentDidMount() {
    window.addEventListener("resize", (event) => {
      var width =
        document.documentElement.clientWidth ||
        document.body.clientWidth ||
        window.innerWidth;
      if (width > 760) {
        this.setState({ showhamburger: true });
      } else {
        this.props.dataContainer({ gridColumn: "2/7" });
        this.props.sideNavBarExpended(false);
        this.setState({ showhamburger: false });
      }
    });
    // window
    //   .matchMedia("(max-width: 4096px) and (min-width:761px)")
    //   .addEventListener("change", () => {
    //     this.setState({ showhamburger: true });
    //   });
    // window
    //   .matchMedia("( max-width: 760px )")
    //   .addEventListener("change", handler);
  }

  render() {
    const { isExpended } = this.props;
    return (
      <>
        <div className="headNavBar">
          <nav className="nav">
            <ul className="leftSideList">
              {this.state.showhamburger && (
                <li
                  onClick={this.hamburgerClick}
                  id="hamburger"
                  className="barIcon"
                >
                  <i className="fa-solid fa-bars"></i>
                </li>
              )}
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
        {isExpended && window.innerWidth > 760 ? (
          <ExpendableSlidebar />
        ) : (
          <SideNavBar />
        )}
        {/* </div> */}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { sideNavBarExpended, dataContainerGrid } = state.navBar;
  return {
    isExpended: sideNavBarExpended,
    dataContainerGrid: dataContainerGrid,
  };
};

export default connect(mapStateToProps, { dataContainer, sideNavBarExpended })(
  NavBar
);
