import React, { Component } from "react";
import Card from "./Card";
import { items } from "./data";
export default class DashboardPage extends Component {
  constructor() {
    super();
    this.state = {
      item: items,
      loading: false,
    };
  }
  render() {
    return (
      <div className="cardContainer">
        {this.state.item.map((element) => {
          return (
            <Card
              key={element.id}
              itemname={element.itemname}
              quantity={element.Qantity}
              price={element.price}
            />
          );
        })}
      </div>
    );
  }
}
