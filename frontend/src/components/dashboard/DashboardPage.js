import React, { Component } from "react";
import Card from "../card/Card";
import "./DashboardPage.css";
import { getAllItem } from "./../../actions/itemsFetching";
import { connect } from "react-redux";
// import { items } from "../data";
// import axios from "axios";
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
    console.log("item", this.props);
    // const { item } = this.state;
    return (
      <div id="dataContainer">
        <div className="cardContainer">
          {item &&
            item.length > 0 &&
            item.map((element) => {
              element.date = new Date(element.date).toLocaleDateString();
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
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log("mapstatetoprops");
  console.log(state.allItem);
  return {
    item: state.allItem.payload,
  };
};

export default connect(mapStateToProps, { getAllItem })(DashboardPage);
