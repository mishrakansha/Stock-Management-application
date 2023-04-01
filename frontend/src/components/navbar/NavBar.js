import React, { Component } from "react";
import "./navBar.css";
import SideNavBar from "../sidebarnav/SideNavBar";
import { ExpendableSlidebar } from "../sidebarnav/SideNavBar.js";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
export class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showhamburger: window.innerWidth > 760,
    };
  }
  hamburgerClick = async () => {
    const { isExpended, dataContainer, sideNavBarExpended } = this.props;
    if (window.innerWidth > 760) {
      if (!isExpended) {
        dataContainer({ gridColumn: "3/7" });
        sideNavBarExpended(true);
      } else {
        dataContainer({ gridColumn: "2/7" });
        sideNavBarExpended(false);
      }
    }
  };
  componentDidMount() {
    const { dataContainer, sideNavBarExpended } = this.props;
    window.addEventListener("resize", (event) => {
      const width =
        document.documentElement.clientWidth ||
        document.body.clientWidth ||
        window.innerWidth;
      if (width > 760) {
        this.setState({ showhamburger: true });
      } else {
        dataContainer({ gridColumn: "2/7" });
        sideNavBarExpended(false);
        this.setState({ showhamburger: false });
      }
    });
  }

  render() {
    const { isExpended } = this.props;
    const { showhamburger } = this.state;
    return (
      <>
        <div className="headNavBar">
          <nav className="nav">
            <ul className="leftSideList">
              {showhamburger && (
                <li
                  onClick={this.hamburgerClick}
                  id="hamburger"
                  className="barIcon"
                >
                  <i className="fa-solid fa-bars"></i>
                </li>
              )}
              <li>
                <div className="navHeading">Stock management app</div>
              </li>
            </ul>

            <ul className="profileIcon">
              <li className="barIcon">
                <i className="fa-solid fa-user"></i>
              </li>
            </ul>
          </nav>
        </div>
        {isExpended && window.innerWidth > 760 ? (
          <ExpendableSlidebar />
        ) : (
          <SideNavBar />
        )}{" "}
        <Outlet />
      </>
    );
  }
}
NavBar.propTypes = {
  dataContainer: PropTypes.func,
  sideNavBarExpended: PropTypes.func,
  isExpended: PropTypes.bool,
  dataContainerGrid: PropTypes.object,
};
export default NavBar;
