import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./editForm.css";
import PropTypes from "prop-types";
import moment from "moment";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
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
      modified: false,
    };
  }
  async componentDidMount() {
    const { editFormId: id, getOneItem } = this.props;
    await getOneItem(id);
    const { oneItem: data } = this.props;
    const date = moment(data.date).format("yyyy-MM-DD");
    const { itemName, manufacturingCompany, price, quantity, description } =
      data;
    this.setState({
      itemName: itemName,
      quantity: quantity,
      price: price,
      description: description,
      date: date,
      manufacturingCompany: manufacturingCompany,
    });
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
    const { editFormId: id, editItem, editFormPopUp } = this.props;
    editItem(id, data);
    editFormPopUp(false);
  };
  handelOnchange = async (event) => {
    const data = event.target.value;
    if (event.target.name === "itemName") {
      if (data.length > 2 && data.length <= 100) {
        await this.setState({ itemNameError: false });
      } else {
        await this.setState({ itemNameError: true });
      }
      await this.setState({ itemName: data });
    } else if (event.target.name === "quantity") {
      if (data >= 0 && data !== "") {
        await this.setState({ quantityError: false, quantity: parseInt(data) });
      } else {
        await this.setState({ quantityError: true, quantity: "" });
      }
    } else if (event.target.name === "description") {
      if (data.length > 0) {
        await this.setState({ descriptionError: false });
      } else {
        await this.setState({ descriptionError: true });
      }
      await this.setState({ description: data });
    } else if (event.target.name === "manufacturingCompany") {
      if (data.length > 0) {
        await this.setState({
          manufacturingCompanyError: false,
        });
      } else {
        await this.setState({ manufacturingCompanyError: true });
      }
      await this.setState({
        manufacturingCompany: data,
      });
    } else if (event.target.name === "price") {
      if (data > 0) {
        await this.setState({
          price: parseInt(data),
          priceError: false,
        });
      } else {
        await this.setState({
          price: "",
          priceError: true,
        });
      }
    } else if (event.target.name === "manufacturingCompany") {
      await this.setState({ manufacturingCompany: event.target.value });
    } else if (event.target.name === "date") {
      const inputtedDate = event.target.value;
      const today = new Date();
      const datenew = new Date(inputtedDate);
      if (today < datenew) {
        await this.setState({ dateError: true });
      } else {
        await this.setState({ dateError: false });
      }
      await this.setState({ date: data });
    }
    const { oneItem: unmodifiedData } = this.props;
    const originalDate = moment(unmodifiedData.date).format("yyyy-MM-DD");
    const {
      itemName: originalItemName,
      manufacturingCompany: originalManufecturingCompany,
      price: originalPrice,
      quantity: originalQuantity,
      description: originalDescription,
    } = unmodifiedData;
    const {
      itemName,
      quantity,
      price,
      description,
      date,
      manufacturingCompanyError,
      itemNameError,
      quantityError,
      priceError,
      descriptionError,
      dateError,
      manufacturingCompany,
    } = this.state;
    if (
      (originalItemName !== itemName ||
        originalQuantity !== quantity ||
        originalPrice !== price ||
        description !== originalDescription ||
        originalDate !== date ||
        originalManufecturingCompany !== manufacturingCompany) &&
      manufacturingCompanyError === false &&
      itemNameError === false &&
      quantityError === false &&
      priceError === false &&
      descriptionError === false &&
      dateError === false
    ) {
      this.setState({ modified: true });
    } else {
      this.setState({ modified: false });
    }
  };
  handelClose = () => {
    const { editFormPopUp } = this.props;
    editFormPopUp(false);
  };
  render() {
    const { isEditPopperOpen: open } = this.props;
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
      modified,
    } = this.state;
    return (
      <Dialog open={open} onClose={this.handleClose} fullWidth={true}>
        <div className="innerEditFormContainer">
          <div>
            <h1>UPDATE ITEM</h1>
          </div>
        </div>
        <DialogContent>
          <form
            onSubmit={this.handleSubmit}
            method="post"
            action="localhost:5000/api/stock/additem"
            id="editForm"
          >
            <TextField
              required
              id="filled-basic itemName"
              name="itemName"
              value={itemName || ""}
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
            {itemNameError && (
              <div className="errorMessage">
                * Name of the item should contain atleast 3 character and atmost
                100 character
              </div>
            )}
            <div className="flexInputBoxEditForm">
              <div>
                <TextField
                  required
                  id="filled-basic"
                  name="quantity"
                  label="Quantity"
                  value={quantity || ""}
                  variant="filled"
                  InputProps={{
                    inputProps: {
                      min: 0,
                    },
                    style: {
                      height: "50px",
                    },
                  }}
                  onChange={this.handelOnchange}
                  type="number"
                />
                {quantityError && (
                  <div className="flexEditFormErrorMessage">
                    * Quantity should be greater than or equal to 0.
                  </div>
                )}
              </div>
              <div>
                <TextField
                  required
                  id="filled-basic"
                  name="price"
                  label="Price"
                  value={price || ""}
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
                />
                {priceError && (
                  <div className="flexEditFormErrorMessage">
                    * Price should be greater than 0.
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
              value={manufacturingCompany || ""}
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
              value={description || ""}
              label="Description"
            />
            {descriptionError && (
              <div className="errorMessage">* this field is required.</div>
            )}
            <TextField
              id="datetime-local"
              label="Date Added On"
              type="date"
              variant="filled"
              value={date || ""}
              InputProps={{
                style: {
                  height: "50px",
                },
              }}
              name="date"
              onChange={this.handelOnchange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {dateError && (
              <div className="errorMessage">
                * date should not be greater than than today
              </div>
            )}
          </form>
        </DialogContent>
        <DialogActions className="submitButtonContainer">
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, width: "50%" }}
            className="closeButton"
            onClick={this.handelClose}
          >
            Close
          </Button>{" "}
          <Button
            disabled={!modified}
            title={!modified ? "kindly make any modification" : "Update"}
            onClick={this.handleSubmit}
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
        </DialogActions>
      </Dialog>
    );
  }
}

EditForm.propTypes = {
  oneItem: PropTypes.object,
  isEditPopperOpen: PropTypes.bool,
  editFormId: PropTypes.string,
  editItem: PropTypes.func,
  getOneItem: PropTypes.func,
  editFormPopUp: PropTypes.func,
};
export default EditForm;
