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
      description: "",
      date: "",
      manufacturingCompany: "",
      manufacturingCompanyError: true,
      itemNameError: true,
      quantityError: true,
      priceError: true,
      descriptionError: true,
      dateError: true,
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
    console.log("description", this.state.description);
    console.log("date", this.state.date);
    console.log("Manufacturing company", this.state.manufacturingCompany);
  };
  handelOnchange = (event) => {
    console.log(event.target.name);
    var data = event.target.value;
    if (event.target.name === "itemName") {
      if (data.length > 2 && data.length <= 100) {
        this.setState({ itemNameError: false });
        this.setState({ itemName: data });
      } else {
        this.setState({ itemNameError: true });
      }
    } else if (event.target.name === "quantity") {
      if (data > 0) {
        this.setState({ quantityError: false });
        this.setState({ quantity: event.target.value });
      } else {
        this.setState({ quantityError: true });
        event.target.value = "";
      }
    } else if (event.target.name === "description") {
      if (data.length > 0) {
        this.setState({ descriptionError: false, description: data });
      } else {
        this.setState({ descriptionError: true });
      }
    } else if (event.target.name === "manufacturingCompany") {
      if (data.length > 0) {
        this.setState({
          manufacturingCompanyError: false,
          manufacturingCompany: data,
        });
      } else {
        this.setState({ manufacturingCompanyError: true });
      }
    } else if (event.target.name === "price") {
      if (data > 0) {
        this.setState({
          priceError: false,
          price: event.target.value,
        });
      } else {
        this.setState({
          priceError: true,
        });
        event.target.value = "";
      }
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
      <div id="dataContainer">
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
                  * Name of the item should contain atleast 3 character and
                  atmost 100 character
                </div>
              )}
              <TextField
                required
                id="filled-basic"
                min="1"
                label="Quantity"
                InputProps={{
                  inputProps: {
                    min: 1,
                  },
                }}
                name="quantity"
                variant="filled"
                onInput={this.handelOnchange}
                type="number"
                style={{ width: "100%" }}
              />
              {this.state.quantityError && (
                <div className="errorMessage">
                  * Quantity should be greater than 1.
                </div>
              )}
              <TextField
                required
                id="filled-basic"
                name="price"
                label="Price"
                variant="filled"
                InputProps={{
                  inputProps: {
                    min: 1,
                  },
                }}
                onChange={this.handelOnchange}
                type="number"
                style={{ width: "100%" }}
              />
              {this.state.priceError && (
                <div className="errorMessage">
                  * Price should be greater than 1.
                </div>
              )}
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
              {this.state.manufacturingCompanyError && (
                <div className="errorMessage">* this field is required.</div>
              )}
              <TextField
                required
                multiline
                rows={2}
                name="description"
                onChange={this.handelOnchange}
                variant="filled"
                label="Description"
              />
              {this.state.descriptionError && (
                <div className="errorMessage">* this field is required.</div>
              )}
              <TextField
                id="datetime-local"
                label="Added On"
                type="date"
                variant="filled"
                name="date"
                onChange={this.handelOnchange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {this.state.dateError && (
                <div className="errorMessage">
                  * date should not be greater than than today
                </div>
              )}
              <div className="submitButtonContainer">
                <Button
                  disabled={
                    this.state.dateError ||
                    this.state.itemNameError ||
                    this.state.descriptionError ||
                    this.state.priceError ||
                    this.state.manufacturingCompanyError
                  }
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
      </div>
    );
  }
}
