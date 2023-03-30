import React, { Component } from "react";
import Card from "../card/Card";
import "./dashboardPage.css";
import EditForm from "../editForm/EditForm";
import { getAllItem } from "./../../redux/actions/stocks";
import { connect } from "react-redux";
import DataContainer from "../dataContainer/DataContainer";
import CircularProgress from "@mui/material/CircularProgress";
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
                item.map((element) => {
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
const mapStateToProps = (state) => {
  return {
    isPopperOpen: state.items.isPopperOpen.isPopperOpen,
    isloading: state.items.isloading,
    item: state.items.stockItems,
  };
};
export default connect(mapStateToProps, {
  getAllItem,
})(DashboardPage);
