import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import React, { Component } from "react";
import NavBar from "./components/navbar/NavBar";
import NewItemForm from "./components/forms/NewItemForm";
import DashboardPage from "./components/dashboard/DashboardPage";
import Details from "./components/details/Details";
// import Test from "./test/Test";
export default class App extends Component {
  render() {
    return (
      <>
        <div className="mainLayout">
          {/* <Test /> */}
          <Router>
            <NavBar />

            <Routes>
              <Route
                exact
                path="/additem"
                element={<NewItemForm key="addItem" />}
              ></Route>
              <Route
                exact
                path="/"
                element={<DashboardPage key="DashBoard" />}
              ></Route>
              <Route
                exact
                path="/showdetails/:id"
                element={<Details key="Details  " />}
              ></Route>
            </Routes>
          </Router>
        </div>
      </>
    );
  }
}
