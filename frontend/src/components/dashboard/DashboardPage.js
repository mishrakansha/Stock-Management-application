import React, { Component } from "react";
import Card from "../card/Card";
import "./DashboardPage.css";
import EditForm from "../editForm/EditForm";
import { getAllItem } from "../../actions/stocksActions";
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
    this.props.getAllItem();
    // axios
    //   .get("http://localhost:5000/api/stock/allItem")
    //   .then((response) => {
    //     this.setState({
    //       item: response.data,
    //     });
    //     console.log(response.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // var data = await axios.get("http://localhost:5000/api/stock/allItem");
    // console.log(data.data);
    // this.setState({
    //   item: data.data,
    // });
  }
  render() {
    const { item } = this.props;
    const { isloading } = this.props;
    const { isPopperOpen } = this.props;
    console.log(isPopperOpen);
    console.log("render card");
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
                      key={element._id}
                      id={element._id}
                      itemName={element.itemName}
                      quantity={element.quantity}
                      price={element.price}
                      description={element.description}
                      date={element.date}
                      manufacturingCompany={element.manufacturingCompany}
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
  // console.log(state.items.isPopperOpen);
  return {
    isPopperOpen: state.items.isPopperOpen.isPopperOpen,
    isloading: state.items.isloading,
    item: state.items.stockItems,
  };
};
export default connect(mapStateToProps, {
  getAllItem,
})(DashboardPage);
