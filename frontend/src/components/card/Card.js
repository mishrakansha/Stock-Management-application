import React, { Component } from "react";
import Button from "@mui/material/Button";
import "./Cards.css";
import { Link } from "react-router-dom";

// import TextField from "@mui/material/TextField";
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
      <div className="cards">
        <div className="cardHeading">
          <h4>{this.props.itemName}</h4>
        </div>
        <div className="cardBody">
          <div>By:-{this.props.manufacturingCompany}</div>
          <div className="dateContainer">
            <div className="dateTextContainer">Added On</div>
            <div className="dateIconContainer">
              <i className="fa-solid fa-calendar-days"></i> {this.props.date}
            </div>
          </div>
          <div className="priceQuantityContainer">
            <div>Qty : {this.props.quantity}</div>
            <div>₹ : {this.props.price}</div>
          </div>
          <div className="crudButtons">
            <Link
              to={`showdetails/${this.props.id}`}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                sx={{
                  width: 35,
                  minHeight: 35,
                  minWidth: 35,
                  height: 35,
                  backgroundColor: "#323765",
                  borderRadius: 0,
                  border: "1px solid",
                  borderColor: "primary.main",
                  "& .MuiButton-startIcon": { margin: 0 },
                  ":hover": {
                    bgcolor: "#323765",
                    color: "white",
                  },
                }}
                size="small"
              >
                <i className="fa-solid fa-eye"></i>
              </Button>
            </Link>
            <Button
              sx={{
                width: 35,
                minHeight: 35,
                minWidth: 35,
                height: 35,
                backgroundColor: "#323765",
                borderRadius: 0,
                border: "1px solid",
                borderColor: "primary.main",
                "& .MuiButton-startIcon": { margin: 0 },
                ":hover": {
                  bgcolor: "#323765",
                  color: "white",
                },
              }}
              variant="contained"
              size="small"
            >
              <i className="fa-solid fa-pencil"></i>
            </Button>
            <Button
              sx={{
                width: 35,
                minHeight: 35,
                minWidth: 35,
                height: 35,
                backgroundColor: "#323765",
                borderRadius: 0,
                border: "1px solid",
                borderColor: "primary.main",
                "& .MuiButton-startIcon": { margin: 0 },
                ":hover": {
                  bgcolor: "#323765",
                  color: "white",
                },
              }}
              variant="contained"
              size="small"
            >
              <i className="fa-solid fa-trash"></i>
            </Button>
          </div>
        </div>
        {/* <div>
          <h4> Price:-{this.props.price}</h4>
        </div>
        <div>
          <h4> Price:-{this.props.price}</h4>
        </div> */}
        {/*     <div className="incrementDecrementButton">
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
              size="small"
              style={{ maxWidth: "4.5em", textAlign: "center" }}
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
        </div>*/}
      </div>
    );
  }
}
