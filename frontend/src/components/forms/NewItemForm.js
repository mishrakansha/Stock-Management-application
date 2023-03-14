import React, { Component } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./FormCss.css";
export default class NewItemForm extends Component {
  constructor() {
    super();
    this.state = {
      itemName: "",
      quantity: "",
      price: "",
      discription: "",
      date: "",
      manufacturingCompany: "",
      itemNameError: false,
      // quantityError: false,
      // priceError: false,
      // discriptionError: false,
      dateError: false,
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // for (const [key, value] of data) {
    //   console.log(`${key}: ${value}\n`);
    // }
    console.log("itemName", this.state.itemName);
    console.log("quantity", this.state.quantity);
    console.log("price", this.state.price);
    console.log("discription", this.state.discription);
    console.log("date", this.state.date);
    console.log("Manufacturing company", this.state.manufacturingCompany);
  };
  handelOnchange = (event) => {
    console.log(event.target.name);
    if (event.target.name === "itemName") {
      var data = event.target.value;
      if (data.length > 2 && data.length <= 100) {
        this.setState({ itemNameError: false });
      } else {
        this.setState({ itemNameError: true });
        this.setState({ itemName: data });
      }
    } else if (event.target.name === "quantity") {
      this.setState({ quantity: event.target.value });
    } else if (event.target.name === "discription") {
      this.setState({ discription: event.target.value });
    } else if (event.target.name === "price") {
      this.setState({ price: event.target.value });
    } else if (event.target.name === "manufacturingCompany") {
      this.setState({ manufacturingCompany: event.target.value });
    } else if (event.target.name === "date") {
      var inputtedDate = event.target.value;
      var today = new Date();
      let datenew = new Date(inputtedDate);
      if (today < datenew) {
        console.log("invalid");
        this.setState({ dateError: true });
      } else {
        this.setState({ dateError: false });
        this.setState({ date: event.target.value });
      }
    }
  };

  render() {
    return (
      <div className="formContainer">
        <div className="innerFormContainer">
          <form onSubmit={this.handleSubmit} id="form">
            <h1>Add New Item</h1>
            <TextField
              required
              id="filled-basic"
              name="itemName"
              label="Item Name"
              variant="filled"
              onChange={this.handelOnchange}
              type="text"
              style={{ width: "100%" }}
            />
            {this.state.itemNameError && (
              <div className="errorMessage">
                * Name of the item should contain atleast 3 character and atmost
                100 character
              </div>
            )}
            <TextField
              required
              id="filled-basic"
              label="Quantity"
              name="quantity"
              variant="filled"
              onInput={this.handelOnchange}
              type="number"
              style={{ width: "100%" }}
            />
            <TextField
              required
              id="filled-basic"
              name="price"
              label="Price"
              variant="filled"
              onChange={this.handelOnchange}
              type="number"
              style={{ width: "100%" }}
            />
            <TextField
              required
              id="filled-basic"
              name="manufacturingCompany"
              label="Manufacturing company"
              variant="filled"
              onChange={this.handelOnchange}
              type="text"
              style={{ width: "100%" }}
            />
            <TextField
              multiline
              rows={2}
              name="discription"
              onChange={this.handelOnchange}
              variant="filled"
              label="Discription"
            />
            <TextField
              id="datetime-local"
              label="Next appointment"
              type="date"
              variant="filled"
              name="date"
              onChange={this.handelOnchange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {this.state.dateError && (
              <div className="errorMessage">* invalid date</div>
            )}
            <div className="submitButtonContainer">
              <Button
                disabled={this.state.dateError || this.state.itemNameError}
                type="submit"
                onChange={this.handelOnchange}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, width: "50%" }}
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
