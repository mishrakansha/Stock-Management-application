import React, { Component } from "react";
import Card from "../card/index";
import "./dashboardPage.css";
import EditForm from "../editForm/index";
import DataContainer from "../dataContainer/index";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";
class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [],
    };
  }
  async componentDidMount() {
    const { getAllItem } = this.props;
    getAllItem();
  }
  render() {
    const { item, isloading, isPopperOpen } = this.props;
    return (
      <DataContainer
        child={
          isloading ? (
            <div className="loaderContainer">
              <CircularProgress disableShrink />
            </div>
          ) : (
            <div className="cardContainer">
              {isPopperOpen ? <EditForm /> : null}
              {item &&
                item.length > 0 &&
                item.reverse().map((element) => {
                  return (
                    <Card
                      key={element && element._id}
                      id={element && element._id}
                      itemName={element && element.itemName}
                      quantity={element && element.quantity}
                      price={element && element.price}
                      description={element && element.description}
                      date={element && element.date}
                      manufacturingCompany={
                        element && element.manufacturingCompany
                      }
                    />
                  );
                })}
            </div>
          )
        }
      />
    );
  }
}
DashboardPage.propTypes = {
  item: PropTypes.array,
  isloading: PropTypes.bool,
  isPopperOpen: PropTypes.bool,
  getAllItem: PropTypes.func,
};
export default DashboardPage;
