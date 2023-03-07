import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import React, { Component } from "react";
import NavBar from "./components/NavBar";
import NewItemForm from "./components/forms/NewItemForm";
import DashboardPage from "./components/DashboardPage";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <NavBar />
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
        </Router>
      </div>
    );
  }
}

// export default App;
