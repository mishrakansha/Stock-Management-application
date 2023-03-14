import React, { Component } from "react";
import Card from "../card/Card";
import { items } from "../data";
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
              id={element.id}
              itemName={element.itemName}
              quantity={element.quantity}
              price={element.price}
              discription={element.discription}
              date={element.date}
              manufacturingCompany={element.manufacturingCompany}
            />
          );
        })}
      </div>
    );
  }
}
