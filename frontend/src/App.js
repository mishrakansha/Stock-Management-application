import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Component } from "react";
import NewItemForm from "./components/forms/index";
import DashboardPage from "./components/dashboard/index";
import Details from "./components/details/index";
import PrivateRoutes from "./PrivateRoutes";

export default class App extends Component {
  render() {
    return (
      <>
        <div className="mainLayout">
          <Router>
            <Routes>
              <Route exact path="/" element={<PrivateRoutes />}>
                <Route
                  exact
                  index
                  element={<DashboardPage key="DashBoard" />}
                ></Route>
                <Route
                  exact
                  path="additem"
                  element={<NewItemForm key="addItem" />}
                ></Route>

                <Route
                  exact
                  path="showdetails/:id"
                  element={<Details key="Details" />}
                ></Route>
              </Route>
            </Routes>
          </Router>
        </div>
      </>
    );
  }
}
