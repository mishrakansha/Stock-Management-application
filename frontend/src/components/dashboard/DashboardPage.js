import React, { Component } from "react";
import Card from "../card/Card";
import "./DashboardPage.css";
import { getAllItem } from "./../../actions/itemsFetching";
import { connect } from "react-redux";
import Loader from "../Loader/Loader";
import DataContainer from "../dataContainer/DataContainer";

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
    return (
      <DataContainer
        child={
          isloading ? (
            <Loader></Loader>
          ) : (
            <div className="cardContainer">
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
  return {
    isloading: state.items.isloading,
    item: state.items.items,
  };
};

export default connect(mapStateToProps, {
  getAllItem,
})(DashboardPage);
