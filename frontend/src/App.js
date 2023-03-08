import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

import React, { Component } from "react";
import NavBar from "./components/NavBar";
// import SideNavBar from "./components/SideNavBar";

export default class App extends Component {
  render() {
    return (
      <div className="mainlayout">
        <Router>
          <NavBar />
        </Router>
      </div>
    );
  }
}

// export default App;
