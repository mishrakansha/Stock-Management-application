import React, { Component } from "react";
import "./Loader.css";
export default class Loader extends Component {
  render() {
    return (
      <div className="loaderContainer">
        <div className="loader"></div>
        <div className="loader-text">Loading...</div>
      </div>
    );
  }
}
