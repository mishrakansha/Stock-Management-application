import React, { Component } from "react";
import { addItem } from "./../../redux/actions/stocks";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./newItemForm.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import DataContainer from "../dataContainer/DataContainer";

class NewItemForm extends Component {
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
    const {
      itemName,
      quantity,
      price,
      description,
      date,
      manufacturingCompany,
    } = this.state;
    const data = {
      itemName: itemName,
      quantity: quantity,
      price: price,
      description: description,
      date: date,
      manufacturingCompany: manufacturingCompany,
    };
    const { addItem } = this.props;
    addItem(data);
    window.location.assign("/");
  };
  handelOnchange = (event) => {
    const data = event.target.value;
    if (event.target.name === "itemName") {
      if (data.length > 2 && data.length <= 100) {
        this.setState({ itemNameError: false });
      } else {
        this.setState({ itemNameError: true });
      }
      this.setState({ itemName: data });
    } else if (event.target.name === "quantity") {
      if (data >= 0) {
        this.setState({ quantityError: false });
      } else {
        this.setState({ quantityError: true });
        event.target.value = "";
      }
      this.setState({ quantity: event.target.value });
    } else if (event.target.name === "description") {
      if (data.length > 0) {
        this.setState({ descriptionError: false });
      } else {
        this.setState({ descriptionError: true });
      }
      this.setState({ description: data });
    } else if (event.target.name === "manufacturingCompany") {
      if (data.length > 0) {
        this.setState({
          manufacturingCompanyError: false,
        });
      } else {
        this.setState({ manufacturingCompanyError: true });
      }
      this.setState({
        manufacturingCompany: data,
      });
    } else if (event.target.name === "price") {
      if (data > 0) {
        this.setState({
          priceError: false,
        });
      } else {
        this.setState({
          priceError: true,
        });
        event.target.value = "";
      }
      this.setState({
        price: event.target.value,
      });
    } else if (event.target.name === "manufacturingCompany") {
      this.setState({ manufacturingCompany: event.target.value });
    } else if (event.target.name === "date") {
      const inputtedDate = event.target.value;
      const today = new Date();
      const datenew = new Date(inputtedDate);
      if (today < datenew) {
        console.log("invalid");
        this.setState({ dateError: true });
      } else {
        this.setState({ dateError: false });
      }
      this.setState({ date: event.target.value });
    }
  };
  render() {
    const {
      itemName,
      quantity,
      price,
      description,
      date,
      manufacturingCompany,
      manufacturingCompanyError,
      itemNameError,
      quantityError,
      priceError,
      descriptionError,
      dateError,
    } = this.state;
    return (
      <DataContainer
        child=<div className="formContainer">
          <div className="innerFormContainer">
            {" "}
            <div>
              <h3 className="backButton">
                <Link className="Link" to={-1}>
                  <i className="fa-solid fa-arrow-left"></i>
                </Link>
              </h3>
              <h1>Add New Item</h1>
            </div>
            <form onSubmit={this.handleSubmit} method="post" id="form">
              <TextField
                required
                id="filled-basic"
                InputProps={{
                  style: {
                    height: "50px",
                  },
                }}
                name="itemName"
                value={itemName}
                label="Item Name"
                variant="filled"
                onChange={this.handelOnchange}
                type="text"
                style={{ width: "100%" }}
              />
              {itemNameError && (
                <div className="errorMessage">
                  * Name of the item should contain atleast 3 character and
                  atmost 100 character
                </div>
              )}
              <div className="flexInputBoxForm">
                <div>
                  <TextField
                    required
                    id="filled-basic"
                    min="1"
                    label="Quantity"
                    value={quantity}
                    InputProps={{
                      inputProps: {
                        min: 0,
                      },
                      style: {
                        height: "50px",
                      },
                    }}
                    name="quantity"
                    variant="filled"
                    onInput={this.handelOnchange}
                    type="number"
                    style={{ width: "100%" }}
                  />
                  {quantityError && (
                    <div className="flexFormErrorMessage">
                      * Quantity should be greater than 1.
                    </div>
                  )}
                </div>
                <div>
                  <TextField
                    required
                    id="filled-basic"
                    name="price"
                    label="Price"
                    value={price}
                    variant="filled"
                    InputProps={{
                      inputProps: {
                        min: 1,
                      },
                      style: {
                        height: "50px",
                      },
                    }}
                    onChange={this.handelOnchange}
                    type="number"
                    style={{ width: "100%" }}
                  />
                  {priceError && (
                    <div className="flexFormErrorMessage">
                      * Price should be greater than 1.
                    </div>
                  )}
                </div>
              </div>
              <TextField
                required
                id="filled-basic"
                name="manufacturingCompany"
                label="Manufacturing company"
                InputProps={{
                  style: {
                    height: "50px",
                  },
                }}
                variant="filled"
                onChange={this.handelOnchange}
                type="text"
                value={manufacturingCompany}
                style={{ width: "100%" }}
              />
              {manufacturingCompanyError && (
                <div className="errorMessage">* this field is required.</div>
              )}
              <TextField
                required
                multiline
                rows={2}
                name="description"
                onChange={this.handelOnchange}
                variant="filled"
                value={description}
                label="Description"
              />
              {descriptionError && (
                <div className="errorMessage">* this field is required.</div>
              )}
              <TextField
                id="datetime-local"
                label="Date Added On"
                type="date"
                InputProps={{
                  style: {
                    height: "50px",
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                value={date}
                name="date"
                onChange={this.handelOnchange}
              />
              {dateError && (
                <div className="errorMessage">
                  * date should not be greater than than today
                </div>
              )}
              <div className="submitButtonContainer">
                <Button
                  disabled={
                    dateError ||
                    itemNameError ||
                    descriptionError ||
                    priceError ||
                    manufacturingCompanyError
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
      />
    );
  }
}
const mapStateToProps = (state) => {
  const { dataContainerGrid } = state.navBar;
  return {
    dataContainerGrid: dataContainerGrid,
  };
};
export default connect(mapStateToProps, { addItem })(NewItemForm);
