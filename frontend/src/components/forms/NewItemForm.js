import React, { Component } from "react";
import { addItem } from "./../../actions/itemsFetching";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./FormCss.css";
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
      formSubmitted: false,
    };
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // for (const [key, value] of data) {
    //   console.log(`${key}: ${value}\n`);
    // }
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
    try {
      const res = await this.props.addItem(data);
      console.log("res ", res);
      this.setState({ formSubmitted: true });
      this.setState({
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
      });
      setTimeout(() => {
        this.setState({ formSubmitted: false });
      }, 5000);
    } catch (err) {
      console.log(err);
    }
    window.scrollTo(0, 0);
    // console.log(resData);
  };
  handelOnchange = (event) => {
    var data = event.target.value;
    if (event.target.name === "itemName") {
      if (data.length > 2 && data.length <= 100) {
        this.setState({ itemNameError: false });
      } else {
        this.setState({ itemNameError: true });
      }
      this.setState({ itemName: data });
    } else if (event.target.name === "quantity") {
      if (data > 0) {
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
      var inputtedDate = event.target.value;
      var today = new Date();
      let datenew = new Date(inputtedDate);
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
    return (
      <DataContainer
        child=<div className="formContainer">
          <div className="innerFormContainer">
            {" "}
            <div>
              <h3 className="backButton">
                <Link className="Link" to={-1}>
                  <i class="fa-solid fa-arrow-left"></i>
                </Link>
              </h3>
              <h1>Add New Item</h1>
            </div>
            <form onSubmit={this.handleSubmit} method="post" id="form">
              {this.state.formSubmitted && <h3>Form submitted sucessfully</h3>}

              <TextField
                required
                id="filled-basic"
                InputProps={{
                  style: {
                    height: "50px",
                  },
                }}
                name="itemName"
                value={this.state.itemName}
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
                value={this.state.quantity}
                InputProps={{
                  inputProps: {
                    min: 1,
                  },
                  //           style: {
                  // height:"1em",
                  // padding: '0 14px',

                  //           }
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
                value={this.state.price}
                variant="filled"
                InputProps={{
                  inputProps: {
                    min: 1,
                  },
                  //           style: {
                  // height:"1em",
                  // padding: '0 14px',

                  //           }
                  style: {
                    height: "50px",
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
                InputProps={{
                  style: {
                    height: "50px",
                  },
                }}
                variant="filled"
                onChange={this.handelOnchange}
                type="text"
                value={this.state.manufacturingCompany}
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
                value={this.state.description}
                label="Description"
              />
              {this.state.descriptionError && (
                <div className="errorMessage">* this field is required.</div>
              )}
              <TextField
                id="datetime-local"
                label="Date"
                type="date"
                InputProps={{
                  style: {
                    height: "50px",
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                  // style: {
                  //   background:
                  //     "linear-gradient(135deg,rgba(171, 160, 238, 1) 0%,rgba(242, 112, 156, 1) 42%,rgba(228, 194, 157, 1) 100%)",
                  //   webkitTextFillColor: "transparent",
                  //   webkitBackgroundClip: "text",
                  // },
                }}
                variant="filled"
                value={this.state.date}
                name="date"
                onChange={this.handelOnchange}
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
