import React, { Component } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import "./css/Cards.css";
import TextField from "@mui/material/TextField";
export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: this.props.quantity };
  }
  handleIncrement = () => {
    this.setState({ counter: this.state.counter + 1 });
  };

  handleDecrement = () => {
    this.setState({ counter: this.state.counter - 1 });
  };
  counterChanged = (event) => {
    this.setState({ counter: event.target.value });
  };
  render() {
    return (
      <div class="cards">
        <div>
          <h2>{this.props.itemname}</h2>
        </div>
        <div>
          <h4> Price:-{this.props.price}</h4>
        </div>
        <div className="incrementdecrementbutton">
          <Button
            disabled={this.state.counter < 1}
            onClick={this.handleDecrement}
          >
            -
          </Button>
          <Button style={{ padding: "0px" }}>
            <TextField
              variant="outlined"
              hiddenLabel
              id="filled-hidden-label-small"
              placeholder="search item.........."
              size="small"
              margin="0"
              style={{ "max-width": "4.5em", textAlign: "center" }}
              inputProps={{
                style: {
                  textAlign: "center",
                },
              }}
              onChange={this.counterChanged}
              value={this.state.counter}
            />
          </Button>
          <Button onClick={this.handleIncrement}>+</Button>
        </div>
        <div className="crudButtons">
          <Button
            variant="contained"
            size="small"
            startIcon={<InfoIcon fontSize="inherit" />}
          >
            Show Details
          </Button>
          <Button
            variant="contained"
            size="small"
            startIcon={<EditIcon fontSize="inherit" />}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            size="small"
            startIcon={<DeleteIcon fontSize="inherit" />}
          >
            Delete
          </Button>
        </div>
      </div>
    );
  }
}
