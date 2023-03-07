import React, { Component } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Card from "./Card";
import { items } from "./data";
export default class DashboardPage extends Component {
  constructor() {
    super();
    console.log("Hello I am a constructor from News component");
    this.state = {
      item: items,
      loading: false,
    };
  }
  render() {
    return (
      <div>
        <Box component="main" sx={{ p: 3, width: "100%" }}>
          <Toolbar />
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
        </Box>
      </div>
    );
  }
}
