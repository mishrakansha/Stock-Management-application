import { editItem, getOneItem } from "../../actions/stocksActions";
import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./EditForm.css";
// import { Link } from "react-router-dom";
import moment from "moment";
import { connect } from "react-redux";
// import DataContainer from "../dataContainer/DataContainer";

import { editFormPopUp } from "../../actions/stocksActions";
class EditForm extends Component {
  constructor() {
    super();
    this.state = {
      itemName: "",
      quantity: "",
      price: "",
      description: "",
      date: "",
      manufacturingCompany: "",
      manufacturingCompanyError: false,
      itemNameError: false,
      quantityError: false,
      priceError: false,
      descriptionError: false,
      dateError: false,
      formSubmitted: false,
      modified: false,
    };
  }
  async componentDidMount() {
    const { editFormId: id } = this.props;
    try {
      await this.props.getOneItem(id);
      const { oneItem: data } = this.props;
      data.date = moment(this.props.date).format("yyyy-MM-DD");
      this.setState({
        itemName: data.itemName,
        quantity: data.quantity,
        price: data.price,
        description: data.description,
        date: data.date,
        manufacturingCompany: data.manufacturingCompany,
      });
    } catch (e) {
      console.log(e);
    }
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
    const { editFormId: id } = this.props;
    this.props
      .editItem(id, data)
      .then((data) => {
        this.setState({ formSubmitted: true, modified: false });
        setTimeout(() => {
          this.setState({ formSubmitted: false });
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
      });
    window.scrollTo(0, 0);
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
    this.setState({ modified: true });
  };
  handelClose = () => {
    this.props.editFormPopUp(false);
  };

  render() {
    console.log(this.props.id);
    return (
      // <DataContainer child=
      <div className="editFormContainer">
        <div className="innerFormContainer">
          <div>
            <h3 className="closeButton">
              <Button
                onClick={this.handelClose}
                variant="contained"
                sx={{
                  width: 35,
                  minHeight: 35,
                  minWidth: 35,
                  height: 35,
                  boxShadow: "0px 0px 0px  transparent",
                  backgroundColor: "inherit",
                  borderRadius: "50%",
                  border: "1px solid transparent",
                  borderColor: "none",
                  "& .MuiButton-startIcon": { margin: 0 },
                  ":hover": {
                    bgcolor: "#323765",
                    color: "white",
                  },
                }}
                size="small"
              >
                <span className="material-symbols-outlined">close</span>
              </Button>
            </h3>
            <h1>UPDATE ITEM</h1>
          </div>
          <form
            onSubmit={this.handleSubmit}
            method="post"
            action="localhost:5000/api/stock/additem"
            id="form"
          >
            {this.state.formSubmitted && <h3>Sucessfully Updated </h3>}

            <TextField
              required
              id="filled-basic"
              name="itemName"
              value={this.state.itemName || ""}
              label="Item Name"
              variant="filled"
              InputProps={{
                style: {
                  height: "50px",
                },
              }}
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
              min="1"
              label="Quantity"
              value={this.state.quantity || ""}
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
              value={this.state.price || ""}
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
              value={this.state.manufacturingCompany || ""}
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
              value={this.state.description || ""}
              label="Description"
              dv
              xz
            />
            {this.state.descriptionError && (
              <div className="errorMessage">* this field is required.</div>
            )}
            <TextField
              id="datetime-local"
              label="Date"
              type="date"
              variant="filled"
              value={this.state.date || ""}
              InputProps={{
                style: {
                  height: "50px",
                },
              }}
              name="date"
              onChange={this.handelOnchange}
              p
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
                  !this.state.modified ||
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
                sx={{
                  mt: 3,
                  mb: 2,
                  width: "50%",
                }}
              >
                Update
              </Button>
            </div>
          </form>
        </div>
      </div>
      // />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    editFormId: state.items.isPopperOpen.id,
    oneItem: state.items.singleStockDetails,
  };
};
export default connect(mapStateToProps, {
  editItem,
  editFormPopUp,
  getOneItem,
})(EditForm);
