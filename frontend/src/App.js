import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Component } from "react";
import NavBar from "./components/navbar/index";
import NewItemForm from "./components/forms/index";
import DashboardPage from "./components/dashboard/index";
import Details from "./components/details/index";

export default class App extends Component {
  render() {
    return (
      <>
        <div className="mainLayout">
          <Router>
            <NavBar />
            <Routes>
              <Route
                exact
                path="additem"
                element={<NewItemForm key="addItem" />}
              ></Route>
              <Route
                exact
                path="/"
                element={<DashboardPage key="DashBoard" />}
              ></Route>
              <Route
                exact
                path="showdetails/:id"
                element={<Details key="Details" />}
              ></Route>
            </Routes>
          </Router>
        </div>
      </>
    );
  }
}
